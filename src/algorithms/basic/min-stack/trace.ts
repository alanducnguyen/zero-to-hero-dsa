import { arr, composite, frame, stack as stackViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { parseOps, type MSInput } from './node';

export function* trace(input: MSInput): Generator<Frame, (number | null)[]> {
  const data: number[] = [], mins: number[] = [];
  const res: (number | null)[] = [];
  const log: string[] = [];
  const viz = (dHl?: Record<number, Highlight>, mHl?: Record<number, Highlight>) => composite([composite([stackViz(data, dHl, 'data'), stackViz(mins, mHl, 'mins (đỉnh = min hiện tại)')], 'row'), arr(log.length ? log : ['—'], { title: 'Kết quả' })]);
  const top = (a: number[]) => a.length - 1;
  yield frame(7, {}, viz(), 'Hai stack rỗng, luôn cùng chiều cao. mins[i] = min của data[0..i].');
  for (const o of parseOps(input.ops)) {
    if (o.op === 'push') {
      data.push(o.val);
      const m = mins.length ? Math.min(o.val, mins[top(mins)]) : o.val;
      yield frame(11, { x: o.val, 'min cũ': mins.length ? mins[top(mins)] : '—', 'min mới': m }, viz({ [top(data)]: 'swap' }, mins.length ? { [top(mins)]: 'compare' } : undefined), `push(${o.val}): min mới = min(${o.val}, ${mins.length ? mins[top(mins)] : '∅'}) = ${m}. Không cần quét lại stack.`);
      mins.push(m); res.push(null);
      yield frame(12, { x: o.val, mins: [...mins] }, viz({ [top(data)]: 'done' }, { [top(mins)]: 'swap' }), `mins.push(${m}).`);
    } else if (o.op === 'pop') {
      if (!data.length) { res.push(null); log.push('pop → ∅'); yield frame(17, { result: null }, viz(), 'Stack rỗng.'); continue; }
      const v = data[top(data)];
      yield frame(16, { pop: v, 'mins pop': mins[top(mins)] }, viz({ [top(data)]: 'swap' }, { [top(mins)]: 'swap' }), `pop(): bỏ đỉnh cả hai stack ⇒ min tự khôi phục về min của phần còn lại (đỉnh mins mới).`);
      mins.pop(); data.pop(); res.push(v); log.push(`pop → ${v}`);
      yield frame(17, { result: v, 'getMin sau pop': mins.length ? mins[top(mins)] : '—' }, viz(), `Trả về ${v}.`);
    } else if (o.op === 'top') {
      const v = data.length ? data[top(data)] : null; res.push(v); log.push(`top → ${v ?? '∅'}`);
      yield frame(21, { result: v }, viz(data.length ? { [top(data)]: 'compare' } : undefined), `top() = ${v ?? '∅'}.`);
    } else {
      const v = mins.length ? mins[top(mins)] : null; res.push(v); log.push(`getMin → ${v ?? '∅'}`);
      yield frame(25, { result: v }, viz(undefined, mins.length ? { [top(mins)]: 'done' } : undefined), `getMin() = đỉnh mins = ${v ?? '∅'}, O(1).`);
    }
  }
  yield frame(26, { results: res.map((r) => r ?? '–') }, viz(), 'Xong. Mọi thao tác O(1); đổi lấy O(n) bộ nhớ cho stack phụ.');
  return res;
}
