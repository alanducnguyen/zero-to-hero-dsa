import { arr, composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { parseOps, type MSInput } from '../../ops';

export function* trace(input: MSInput): Generator<Frame, (number | null)[]> {
  const diffs: number[] = [];
  let min = 0;
  const out: (number | null)[] = [];
  const log: string[] = [];
  const t = () => diffs.length - 1;
  const viz = (hl?: Record<number, Highlight>) =>
    composite([stack(diffs, hl, `diffs (d = x − min lúc push) · min = ${diffs.length ? min : '∅'}`), arr(log.length ? log : ['—'], { title: 'Kết quả' })]);
  yield frame(6, {}, viz(), 'Chỉ một stack số và MỘT biến min. Mẹo: lưu độ lệch so với min, dấu của độ lệch mã hoá luôn "min có đổi ở bước này không".');
  for (const o of parseOps(input.ops)) {
    if (o.op === 'push') {
      if (!diffs.length) {
        diffs.push(0); min = o.val; out.push(null);
        yield frame(10, { x: o.val, d: 0, min }, viz({ [t()]: 'done' }), `push(${o.val}) vào stack rỗng: lưu d = 0, min = ${o.val}.`);
      } else {
        const d = o.val - min, old = min;
        diffs.push(d); if (o.val < min) min = o.val; out.push(null);
        yield frame(11, { x: o.val, 'min cũ': old, d, min }, viz({ [t()]: d < 0 ? 'swap' : 'done' }),
          d < 0 ? `push(${o.val}): d = ${o.val} − ${old} = ${d} < 0 ⇒ ${o.val} là min mới. Min cũ không mất: tính lại được bằng min − d = ${min - d}.` : `push(${o.val}): d = ${d} ≥ 0 ⇒ min giữ nguyên ${min}. (Ở Java/C++ phép trừ này có thể tràn int.)`);
      }
      continue;
    }
    if (!diffs.length) { out.push(null); log.push(`${o.op} → ∅`); yield frame(13, {}, viz(), `${o.op}() trên stack rỗng ⇒ null.`); continue; }
    const d = diffs[t()];
    const val = d < 0 ? min : min + d;
    if (o.op === 'pop') {
      yield frame(16, { d, x: val, min }, viz({ [t()]: 'swap' }), d < 0 ? `pop(): d = ${d} < 0 ⇒ phần tử này CHÍNH LÀ min = ${min}.` : `pop(): d = ${d} ≥ 0 ⇒ x = min + d = ${val}.`);
      diffs.pop(); out.push(val); log.push(`pop → ${val}`);
      if (d < 0) {
        min = min - d;
        yield frame(17, { 'min khôi phục': min }, viz(), `Min vừa rời stack ⇒ khôi phục min cũ = x − d = ${val} − (${d}) = ${min}. Không cần lưu riêng lịch sử min.`);
      }
    } else if (o.op === 'top') {
      out.push(val); log.push(`top → ${val}`);
      yield frame(20, { d, result: val }, viz({ [t()]: 'compare' }), `top(): ${d < 0 ? `d < 0 ⇒ đỉnh là min = ${val}` : `min + d = ${val}`}.`);
    } else {
      out.push(min); log.push(`getMin → ${min}`);
      yield frame(21, { result: min }, viz(), `getMin() = biến min = ${min}, O(1).`);
    }
  }
  yield frame(23, { results: out.map((r) => r ?? '–') }, viz(), 'Xong. Chỉ n số + 1 biến, nhưng khó đọc và phải dùng kiểu số rộng hơn (long) để tránh tràn.');
  return out;
}
