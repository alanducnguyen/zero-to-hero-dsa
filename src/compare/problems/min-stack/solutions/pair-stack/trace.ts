import { arr, composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { parseOps, type MSInput } from '../../ops';

export function* trace(input: MSInput): Generator<Frame, (number | null)[]> {
  const st: [number, number][] = [];
  const out: (number | null)[] = [];
  const log: string[] = [];
  const t = () => st.length - 1;
  const viz = (hl?: Record<number, Highlight>) =>
    composite([stack(st.map(([v, m]) => `${v} | min ${m}`), hl, 'stack [giá trị | min đáy→đây]'), arr(log.length ? log : ['—'], { title: 'Kết quả' })]);
  yield frame(5, {}, viz(), 'Mỗi phần tử mang theo min của phần stack bên dưới nó (tính cả nó). Vì stack chỉ thay đổi ở đỉnh, min của các mức dưới không bao giờ đổi.');
  for (const o of parseOps(input.ops)) {
    if (o.op === 'push') {
      const old = st.length ? st[t()][1] : null;
      const m = old === null ? o.val : Math.min(o.val, old);
      st.push([o.val, m]); out.push(null);
      yield frame(10, { x: o.val, 'min cũ': old ?? '∅', 'min mới': m }, viz({ [t()]: 'done', ...(t() > 0 ? { [t() - 1]: 'compare' } : {}) }), `push(${o.val}): min mới = min(${o.val}, ${old ?? '∅'}) = ${m}, chỉ cần nhìn đỉnh cũ.`);
      continue;
    }
    if (!st.length) { out.push(null); log.push(`${o.op} → ∅`); yield frame(12, {}, viz(), `${o.op}() trên stack rỗng ⇒ null.`); continue; }
    if (o.op === 'pop') {
      const [v] = st[t()];
      yield frame(13, { result: v, 'min sau pop': st.length > 1 ? st[t() - 1][1] : '∅' }, viz({ [t()]: 'swap' }), `pop() = ${v}. Bỏ cả cặp ⇒ min của mức mới lộ ra là đáp án đúng, không cần tính lại.`);
      st.pop(); out.push(v); log.push(`pop → ${v}`);
    } else if (o.op === 'top') {
      const v = st[t()][0]; out.push(v); log.push(`top → ${v}`);
      yield frame(14, { result: v }, viz({ [t()]: 'compare' }), `top() = ${v}.`);
    } else {
      const v = st[t()][1]; out.push(v); log.push(`getMin → ${v}`);
      yield frame(15, { result: v }, viz({ [t()]: 'done' }), `getMin() = min lưu ở đỉnh = ${v}, O(1).`);
    }
  }
  yield frame(17, { results: out.map((r) => r ?? '–') }, viz(), 'Xong. Luôn 2n số – kể cả khi min hiếm khi đổi – nhưng code ngắn nhất và khó sai nhất.');
  return out;
}
