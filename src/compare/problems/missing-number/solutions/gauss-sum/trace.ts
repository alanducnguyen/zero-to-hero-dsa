import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = [...input.nums];
  const n = nums.length;
  const viz = (i: number) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < i && k < n; k++) h[k] = 'done';
    if (i < n) h[i] = 'active';
    return arr(nums, { mode: 'cells', title: 'nums (xanh lá = đã cộng vào sum)', highlights: h, pointers: i < n ? [{ name: 'x', index: i }] : [] });
  };
  const expected = (n * (n + 1)) / 2;
  yield frame(3, { n, 'n(n+1)/2': expected }, viz(-1),
    `n = ${n} ⇒ nếu đủ 0..${n} thì tổng phải là n(n+1)/2 = ${expected}. Số thiếu = phần tổng "hụt" đi.`);
  let sum = 0;
  yield frame(4, { sum }, viz(-1), 'sum = 0 – chỉ cần một biến tích lũy, không cần Set ⇒ O(1) bộ nhớ.');
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    yield frame(5, { x: nums[i], sum }, viz(i),
      `sum += ${nums[i]} ⇒ ${sum}. Thứ tự không quan trọng vì phép cộng giao hoán.`);
  }
  const res = expected - sum;
  yield frame(6, { 'n(n+1)/2': expected, sum, result: res }, viz(n),
    `${expected} − ${sum} = ${res}. Lưu ý: với int 32-bit (Java/C++), n(n+1)/2 tràn khi n ≳ 65 535 – phải dùng long hoặc trừ dần (sum += i − nums[i]). JS dùng double nên an toàn tới 2⁵³.`);
  return res;
}
