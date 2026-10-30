import { arr, composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { parseOps, type MSInput } from '../../ops';

export function* trace(input: MSInput): Generator<Frame, (number | null)[]> {
  const data: number[] = [], mins: number[] = [];
  const out: (number | null)[] = [];
  const log: string[] = [];
  const top = (a: number[]) => a.length - 1;
  const viz = (dHl?: Record<number, Highlight>, mHl?: Record<number, Highlight>) =>
    composite([composite([stack(data, dHl, 'data'), stack(mins, mHl, 'mins (chỉ các kỷ lục min)')], 'row'), arr(log.length ? log : ['—'], { title: 'Kết quả' })]);
  yield frame(6, {}, viz(), 'mins chỉ lưu những giá trị từng là min lúc được push. Đỉnh mins = min hiện tại; mins thường ngắn hơn data nhiều.');
  for (const o of parseOps(input.ops)) {
    if (o.op === 'push') {
      data.push(o.val);
      const add = !mins.length || o.val <= mins[top(mins)];
      const old = mins.length ? mins[top(mins)] : '∅';
      if (add) mins.push(o.val);
      out.push(null);
      yield frame(11, { x: o.val, 'min cũ': old, 'push vào mins': add }, viz({ [top(data)]: 'done' }, add ? { [top(mins)]: 'swap' } : mins.length ? { [top(mins)]: 'compare' } : undefined),
        add ? `push(${o.val}): ${o.val} ≤ ${old} ⇒ là kỷ lục min mới, đẩy vào mins. Dùng ≤ (không phải <) để min trùng lặp được lưu đủ số lần.` : `push(${o.val}): ${o.val} > min ${old} ⇒ không bao giờ là min khi còn ${old} bên dưới, nên KHÔNG cần lưu vào mins – tiết kiệm bộ nhớ.`);
      continue;
    }
    if (!data.length) { out.push(null); log.push(`${o.op} → ∅`); yield frame(13, {}, viz(), `${o.op}() trên stack rỗng ⇒ null.`); continue; }
    if (o.op === 'pop') {
      const x = data[top(data)];
      const hit = x === mins[top(mins)];
      yield frame(16, { x, 'đỉnh mins': mins[top(mins)], 'pop mins': hit }, viz({ [top(data)]: 'swap' }, { [top(mins)]: hit ? 'swap' : 'compare' }),
        hit ? `pop() = ${x} đúng bằng min hiện tại ⇒ bỏ luôn đỉnh mins, min cũ bên dưới tự lộ ra.` : `pop() = ${x} lớn hơn min ⇒ mins giữ nguyên.`);
      data.pop(); if (hit) mins.pop();
      out.push(x); log.push(`pop → ${x}`);
    } else if (o.op === 'top') {
      const v = data[top(data)]; out.push(v); log.push(`top → ${v}`);
      yield frame(18, { result: v }, viz({ [top(data)]: 'compare' }), `top() = ${v}.`);
    } else {
      const v = mins[top(mins)]; out.push(v); log.push(`getMin → ${v}`);
      yield frame(19, { result: v }, viz(undefined, { [top(mins)]: 'done' }), `getMin() = đỉnh mins = ${v}, O(1).`);
    }
  }
  yield frame(21, { results: out.map((r) => r ?? '–'), 'data.length': data.length, 'mins.length': mins.length }, viz(), `Xong. data có ${data.length} phần tử nhưng mins chỉ ${mins.length}: worst case (dãy giảm) vẫn 2n, trung bình ít hơn nhiều.`);
  return out;
}
