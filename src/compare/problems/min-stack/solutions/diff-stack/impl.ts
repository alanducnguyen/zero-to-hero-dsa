import type { Op } from '../../ops';

/** Một stack lưu d = x − min (min trước khi push) + một biến min. d < 0 ⇒ x là min mới. O(1) bộ nhớ phụ. */
export function minStackDiff(ops: Op[]): (number | null)[] {
  const diffs: number[] = [];
  let min = 0;
  const out: (number | null)[] = [];
  for (const o of ops) {
    if (o.op === 'push') {
      if (!diffs.length) { diffs.push(0); min = o.val; } // phần tử đầu chính là min
      else { diffs.push(o.val - min); if (o.val < min) min = o.val; } // có thể tràn số ở int32/int64
      out.push(null);
    } else if (!diffs.length) out.push(null); // stack rỗng
    else if (o.op === 'pop') {
      const d = diffs.pop()!;
      out.push(d < 0 ? min : min + d); // d < 0: phần tử bị pop chính là min hiện tại
      if (d < 0) min = min - d; // khôi phục min cũ: x − d với x = min
    } else if (o.op === 'top') {
      const d = diffs[diffs.length - 1];
      out.push(d < 0 ? min : min + d);
    } else out.push(min);
  }
  return out;
}
