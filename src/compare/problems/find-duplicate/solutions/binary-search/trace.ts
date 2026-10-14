import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  const n = nums.length - 1;
  let lo = 1, hi = n;
  const range = Array.from({ length: n }, (_, i) => i + 1);
  const viz = (mid?: number, hl: Record<number, Highlight> = {}) => composite([arr(nums, { title: 'nums (không sửa)', highlights: hl }), arr(range, { title: 'không gian giá trị [1, n] – nhị phân ở đây, không phải trên chỉ số', highlights: Object.fromEntries(range.map((v) => [v - 1, (v < lo || v > hi ? 'muted' : v === mid ? 'active' : 'range') as Highlight])), pointers: mid ? [{ name: 'mid', index: mid - 1 }] : [] })]);
  yield frame(3, { lo, hi }, viz(), `Giá trị nằm trong [1, ${n}] nhưng có ${n + 1} phần tử ⇒ theo Dirichlet phải có trùng. Nhị phân trên giá trị.`);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    let count = 0;
    for (const x of nums) if (x <= mid) count++;
    const hl: Record<number, Highlight> = Object.fromEntries(nums.map((x, k) => [k, (x <= mid ? 'compare' : 'muted') as Highlight]));
    yield frame(7, { lo, hi, mid, 'count(≤ mid)': count }, viz(mid, hl), `Đếm phần tử ≤ ${mid}: ${count}. Nếu không trùng trong [1, ${mid}] thì count ≤ ${mid}.`);
    if (count > mid) {
      hi = mid;
      yield frame(8, { count, mid, lo, hi }, viz(mid, hl), `${count} > ${mid} ⇒ có nhiều hơn ${mid} số trong [1, ${mid}] ⇒ số trùng ở nửa dưới. hi = ${mid}.`);
    } else {
      lo = mid + 1;
      yield frame(9, { count, mid, lo, hi }, viz(mid, hl), `${count} ≤ ${mid} ⇒ nửa dưới "vừa đủ", số trùng ở nửa trên. lo = ${lo}.`);
    }
  }
  yield frame(11, { result: lo }, viz(lo, Object.fromEntries(nums.map((x, k) => [k, (x === lo ? 'done' : 'muted') as Highlight]))), `lo = hi = ${lo} ⇒ số trùng là ${lo}. log n vòng × O(n) đếm = O(n log n), O(1) bộ nhớ, không sửa mảng.`);
  return lo;
}
