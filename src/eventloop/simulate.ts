import { frame } from '@/engine/helpers';
import type { EventLoopPhase, EventLoopVisual, Frame } from '@/engine/types';
import { generate, type Op, type Scenario } from './scenario';

interface Task {
  label: string;
  body: Op[];
  enterLine: number;
  endLine: number;
}
interface Timer extends Task {
  due: number;
  seq: number;
}

const PHASE_VI: Record<EventLoopPhase, string> = {
  main: 'script chính',
  nextTick: 'nextTick queue',
  microtask: 'microtask queue',
  timers: 'timers',
  pending: 'pending callbacks',
  poll: 'poll',
  check: 'check',
  close: 'close callbacks',
  idle: 'chờ',
  exit: 'kết thúc',
};

/**
 * Mô phỏng event loop của Node (libuv) trên kịch bản DSL.
 * Đồng hồ ảo `now` tính bằng ms; script chính được coi là tốn 1ms (để setTimeout(0) kịp hết hạn
 * trước vòng lặp đầu – trường hợp thường gặp ngoài đời).
 */
export function* simulate(scenario: Scenario): Generator<Frame, string[]> {
  const { ops, lastLine } = generate(scenario);
  let now = 0;
  let seq = 0;
  let phase: EventLoopPhase = 'main';
  const callStack: string[] = [];
  const nextTickQ: Task[] = [];
  const microQ: Task[] = [];
  const timers: Timer[] = [];
  const io: Timer[] = [];
  const immediates: Task[] = [];
  const output: string[] = [];
  let loopIter = 0;

  const visual = (changed?: string): EventLoopVisual => ({
    kind: 'eventloop',
    phase,
    now,
    callStack: [...callStack],
    nextTick: nextTickQ.map((t) => t.label),
    microtasks: microQ.map((t) => t.label),
    timers: [...timers].sort((a, b) => a.due - b.due || a.seq - b.seq).map((t) => ({ label: t.label, due: t.due })),
    io: [...io].sort((a, b) => a.due - b.due).map((t) => ({ label: t.label, due: t.due })),
    immediates: immediates.map((t) => t.label),
    output: [...output],
    changed,
  });
  const vars = () => ({ phase: PHASE_VI[phase], now: `${now}ms`, vòng: loopIter });
  const f = (line: number, note: string, changed?: string): Frame => frame(line, vars(), visual(changed), note, { callStack: [...callStack] });

  function* runBody(body: Op[]): Generator<Frame, void> {
    for (const op of body) {
      switch (op.kind) {
        case 'log':
          output.push(op.msg);
          yield f(op.line, `console.log('${op.msg}') chạy đồng bộ ngay trên call stack.`, 'output');
          break;
        case 'block':
          now += op.ms;
          yield f(op.line, `Vòng lặp bận chặn thread chính ${op.ms}ms. Event loop KHÔNG thể làm gì khác: mọi timer/I/O đã sẵn sàng đều phải chờ. now = ${now}ms.`, 'stack');
          break;
        case 'timeout': {
          const due = now + Math.max(1, op.delay);
          timers.push({ label: op.label, body: op.body, enterLine: op.line, endLine: op.endLine, due, seq: seq++ });
          yield f(op.line, `setTimeout đăng ký timer "${op.label}" hết hạn lúc ${due}ms (delay ${op.delay}${op.delay < 1 ? ' → Node ép tối thiểu 1ms' : ''}). Callback KHÔNG chạy ngay – chỉ khi tới phase timers và đã hết hạn.`, 'timers');
          break;
        }
        case 'immediate':
          immediates.push({ label: op.label, body: op.body, enterLine: op.line, endLine: op.endLine });
          yield f(op.line, `setImmediate đưa "${op.label}" vào hàng đợi phase check – chạy sau phase poll của vòng lặp hiện tại.`, 'immediates');
          break;
        case 'nextTick':
          nextTickQ.push({ label: op.label, body: op.body, enterLine: op.line, endLine: op.endLine });
          yield f(op.line, `process.nextTick đưa "${op.label}" vào nextTick queue – sẽ chạy NGAY SAU khi callback hiện tại xong, trước mọi promise và trước khi quay lại event loop.`, 'nextTick');
          break;
        case 'then':
          microQ.push({ label: op.label, body: op.body, enterLine: op.line, endLine: op.endLine });
          yield f(op.line, `Promise đã resolve ⇒ .then đưa "${op.label}" vào microtask queue – chạy sau nextTick queue, trước khi quay lại event loop.`, 'microtasks');
          break;
        case 'io': {
          const due = now + op.delay;
          io.push({ label: op.label, body: op.body, enterLine: op.line, endLine: op.endLine, due, seq: seq++ });
          yield f(op.line, `fs.readFile giao việc cho libuv thread pool; callback "${op.label}" sẽ sẵn sàng ở phase poll sau khi I/O xong (~${due}ms). Thread chính không chờ.`, 'io');
          break;
        }
      }
    }
  }

  function* runTask(task: Task, p: EventLoopPhase, why: string): Generator<Frame, void> {
    phase = p;
    callStack.push(task.label);
    yield f(task.enterLine, `${why} Vào callback "${task.label}".`, 'stack');
    yield* runBody(task.body);
    callStack.pop();
    yield f(task.endLine, `Callback "${task.label}" xong, call stack rỗng.`, 'stack');
  }

  /** Sau mỗi macrotask (hoặc script chính): drain nextTick rồi microtask, lặp tới khi cả hai rỗng. */
  function* drain(): Generator<Frame, void> {
    if (nextTickQ.length === 0 && microQ.length === 0) return;
    do {
      while (nextTickQ.length) {
        const t = nextTickQ.shift()!;
        yield* runTask(t, 'nextTick', 'Call stack rỗng ⇒ Node drain nextTick queue TRƯỚC microtask.');
      }
      while (microQ.length) {
        const t = microQ.shift()!;
        yield* runTask(t, 'microtask', 'nextTick queue rỗng ⇒ chạy microtask (promise). Microtask sinh ra trong lúc này cũng chạy luôn trong lượt.');
      }
    } while (nextTickQ.length);
  }

  const hasPending = () => timers.length > 0 || io.length > 0 || immediates.length > 0;

  // ---- script chính
  callStack.push('main');
  yield f(ops[0]?.line ?? 1, 'Node chạy script chính từ trên xuống như một callback đầu tiên. Mọi API bất đồng bộ chỉ ĐĂNG KÝ, không chạy.', 'stack');
  yield* runBody(ops);
  callStack.pop();
  now += 1;
  yield f(lastLine, `Script chính xong (coi như tốn ~1ms, now = ${now}ms). Call stack rỗng ⇒ trước khi vào event loop, Node drain nextTick rồi microtask.`, 'stack');
  yield* drain();

  // ---- vòng lặp
  while (hasPending()) {
    loopIter++;
    // timers
    phase = 'timers';
    const dueTimers = timers.filter((t) => t.due <= now).sort((a, b) => a.due - b.due || a.seq - b.seq);
    yield f(lastLine, `Vòng ${loopIter} – phase TIMERS: ${dueTimers.length ? `có ${dueTimers.length} timer đã hết hạn (${dueTimers.map((t) => t.label).join(', ')}).` : 'chưa timer nào hết hạn.'}${scenario.nondeterministic && loopIter === 1 && dueTimers.length ? ' Lưu ý: setTimeout(0) vs setImmediate ở script chính có thể đảo thứ tự ngoài đời tuỳ máy nhanh hay chậm.' : ''}`);
    for (const t of dueTimers) {
      timers.splice(timers.indexOf(t), 1);
      yield* runTask(t, 'timers', `Timer "${t.label}" hết hạn (due ${t.due}ms ≤ now ${now}ms).`);
      yield* drain();
    }
    // pending callbacks
    phase = 'pending';
    yield f(lastLine, 'Phase PENDING CALLBACKS: chạy các I/O callback bị hoãn từ vòng trước (vd lỗi TCP). Kịch bản này không có.');
    // poll
    phase = 'poll';
    const readyIO = io.filter((t) => t.due <= now).sort((a, b) => a.due - b.due || a.seq - b.seq);
    yield f(lastLine, `Phase POLL: ${readyIO.length ? `có ${readyIO.length} I/O đã hoàn tất ⇒ chạy callback.` : 'không có I/O sẵn sàng.'}${!readyIO.length && immediates.length ? ' Có setImmediate đang chờ ⇒ không chờ I/O, sang phase check ngay.' : ''}`);
    for (const t of readyIO) {
      io.splice(io.indexOf(t), 1);
      yield* runTask(t, 'poll', `I/O "${t.label}" đã hoàn tất.`);
      yield* drain();
    }
    if (immediates.length === 0 && io.length + timers.length > 0 && readyIO.length === 0) {
      const next = Math.min(...[...timers, ...io].map((t) => t.due));
      if (next > now) {
        phase = 'idle';
        const waited = next - now;
        now = next;
        yield f(lastLine, `Không có việc sẵn sàng ⇒ event loop NGỦ ở poll (libuv epoll/kqueue) cho tới sự kiện sớm nhất lúc ${next}ms. Đây là lý do Node idle không tốn CPU. Tua đồng hồ +${waited}ms.`);
      }
    }
    // check
    phase = 'check';
    const imm = immediates.splice(0, immediates.length);
    yield f(lastLine, `Phase CHECK: ${imm.length ? `chạy ${imm.length} setImmediate (${imm.map((t) => t.label).join(', ')}). Immediate đăng ký TRONG phase này sẽ chạy ở vòng sau.` : 'không có setImmediate.'}`);
    for (const t of imm) {
      yield* runTask(t, 'check', `setImmediate "${t.label}" tới lượt.`);
      yield* drain();
    }
    // close
    phase = 'close';
    yield f(lastLine, `Phase CLOSE CALLBACKS: socket.on('close')… Kịch bản này không có. ${hasPending() ? 'Còn việc pending ⇒ quay lại phase timers.' : 'Không còn gì pending ⇒ thoát.'}`);
  }
  phase = 'exit';
  yield f(lastLine, `Không còn timer, I/O hay immediate ⇒ event loop thoát, process kết thúc. Output: ${output.join(' → ')}.`, 'output');
  return output;
}
