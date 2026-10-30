import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = [...input.nums];
  const n = nums.length;
  const w = Math.max(1, Math.max(n, ...nums, 0).toString(2).length);
  const b = (x: number) => (x >>> 0).toString(2).padStart(w, '0');
  const viz = (i: number) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < i && k < n; k++) h[k] = 'done';
    if (i < n) h[i] = 'active';
    return arr(nums, { mode: 'cells', title: 'nums (xanh lá = đã XOR cả chỉ số lẫn giá trị)', highlights: h, pointers: i < n && i >= 0 ? [{ name: 'i', index: i }] : [] });
  };
  let xor = n;
  yield frame(3, { n, xor, 'xor (bin)': b(xor) }, viz(-1),
    `xor = n = ${n}. Chỉ số chỉ chạy 0..${n - 1}, nên đưa n vào trước để tập "đáng lẽ có" đủ 0..${n}.`);
  for (let i = 0; i < n; i++) {
    const before = xor;
    xor ^= i ^ nums[i];
    yield frame(5, { i, 'nums[i]': nums[i], xor, 'xor (bin)': b(xor) }, viz(i),
      `${b(before)} ^ ${b(i)} ^ ${b(nums[i])} = ${b(xor)}. Chỉ số ${i} và giá trị ${nums[i]} mỗi số sẽ gặp "bạn đôi" của nó ở đâu đó (x ^ x = 0); thứ tự không quan trọng.`);
  }
  yield frame(7, { xor, result: xor }, viz(n),
    `Mọi số có mặt xuất hiện đúng 2 lần nên về 0; chỉ ${xor} xuất hiện 1 lần ⇒ là số thiếu. Không tràn số như Gauss vì XOR không bao giờ vượt quá số bit của n.`);
  return xor;
}
