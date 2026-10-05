import { arr, composite, frame, stack as stackViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { parseOps, type QInput } from './node';

export function* trace(input: QInput): Generator<Frame, (number | undefined)[]> {
  const inbox: number[] = [];
  const outbox: number[] = [];
  const results: (number | undefined)[] = [];
  const log: string[] = [];
  const ops = parseOps(input.ops);
  const viz = (inHl?: Record<number, Highlight>, outHl?: Record<number, Highlight>) =>
    composite([
      composite([stackViz(inbox, inHl, 'inbox (push vào đây)'), stackViz(outbox, outHl, 'outbox (pop/peek từ đây)')], 'row'),
      arr(log.length ? log : ['—'], { title: 'Thứ tự FIFO quan sát được' }),
    ]);
  const cs: string[] = [];
  function* shift(): Generator<Frame, void> {
    cs.push('shift()');
    yield frame(15, { 'outbox.length': outbox.length }, viz(), outbox.length === 0 ? 'outbox rỗng ⇒ phải chuyển toàn bộ inbox sang. Việc này đảo thứ tự: phần tử CŨ NHẤT (đáy inbox) sẽ lên ĐỈNH outbox.' : `outbox còn ${outbox.length} phần tử ⇒ không chuyển gì (giữ nguyên thứ tự đã đảo).`, { callStack: [...cs] });
    if (outbox.length === 0) {
      while (inbox.length > 0) {
        const x = inbox.pop()!;
        outbox.push(x);
        yield frame(17, { moved: x, inbox: [...inbox], outbox: [...outbox] }, viz(undefined, { [outbox.length - 1]: 'swap' }), `Chuyển ${x}: pop khỏi inbox, push vào outbox. Mỗi phần tử chỉ được chuyển TỐI ĐA 1 LẦN trong đời ⇒ amortized O(1).`, { callStack: [...cs] });
      }
    }
    cs.pop();
  }
  yield frame(7, { ops: ops.map((o) => (o.op === 'push' ? `push ${o.val}` : o.op)) }, viz(), 'Hai stack rỗng. inbox nhận phần tử mới; outbox giữ phần tử đã đảo thứ tự, sẵn sàng pop theo FIFO.');
  for (const { op, val } of ops) {
    if (op === 'push') {
      cs.push(`push(${val})`);
      inbox.push(val!);
      results.push(undefined);
      yield frame(10, { x: val, inbox: [...inbox] }, viz({ [inbox.length - 1]: 'swap' }), `push(${val}): đẩy vào inbox, O(1). Không động tới outbox.`, { callStack: [...cs] });
      cs.pop();
    } else if (op === 'pop') {
      cs.push('pop()');
      yield* shift();
      const x = outbox.pop();
      results.push(x);
      if (x !== undefined) log.push(String(x));
      yield frame(24, { result: x ?? 'undefined', outbox: [...outbox] }, viz(undefined, outbox.length ? { [outbox.length - 1]: 'compare' } : undefined), x === undefined ? 'Cả hai stack rỗng ⇒ queue rỗng, trả undefined.' : `pop(): lấy đỉnh outbox = ${x} – đúng phần tử vào sớm nhất (FIFO).`, { callStack: [...cs] });
      cs.pop();
    } else {
      cs.push('peek()');
      yield* shift();
      const x = outbox[outbox.length - 1];
      results.push(x);
      yield frame(29, { result: x ?? 'undefined' }, viz(undefined, outbox.length ? { [outbox.length - 1]: 'compare' } : undefined), x === undefined ? 'Queue rỗng ⇒ undefined.' : `peek(): nhìn đỉnh outbox = ${x}, không lấy ra.`, { callStack: [...cs] });
      cs.pop();
    }
  }
  yield frame(33, { size: inbox.length + outbox.length, results: results.map((r) => r ?? '–') }, viz(), `Xong. size = inbox + outbox = ${inbox.length + outbox.length}. Tổng chi phí n thao tác ≤ 3n phép push/pop stack.`);
  return results;
}
