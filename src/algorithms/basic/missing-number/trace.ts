import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

const bits = (x: number, w: number) => (x >>> 0).toString(2).padStart(w, '0');

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = [...(input.nums ?? [])];
  const n = nums.length;
  const w = Math.max(1, (Math.max(n, ...nums, 0) >>> 0).toString(2).length);
  const b = (x: number) => bits(x, w);
  const status: Record<number, Highlight> = {};
  const viz = (i: number | null, extra: Record<number, Highlight> = {}) =>
    arr(nums, {
      mode: 'cells',
      title: 'nums (xanh lá = đã XOR cả chỉ số lẫn giá trị)',
      highlights: { ...status, ...extra },
      pointers: i !== null && i < n ? [{ name: 'i', index: i }] : [],
    });

  yield frame(10, { n }, viz(null),
    `n = ${n} ⇒ đáp án nằm trong [0, ${n}]. Có ${n + 1} số "đáng lẽ phải có" nhưng mảng chỉ có ${n} ô, nên đúng một số vắng mặt.`);
  let xor = n;
  yield frame(11, { n, xor, 'xor (bin)': b(xor) }, viz(null),
    `Khởi tạo xor = n = ${n} (${b(n)}₂). Chỉ số chạy 0..${n - 1} nên thiếu mất ${n}; đưa nó vào trước để tập "đáng lẽ có" đủ 0..${n}.`);
  for (let i = 0; i < n; i++) {
    yield frame(12, { i, n, xor, 'xor (bin)': b(xor) }, viz(i, { [i]: 'active' }),
      `i = ${i} < n ⇒ xử lý ô ${i}. Thứ tự XOR không quan trọng vì XOR giao hoán và kết hợp.`);
    const before = xor;
    xor ^= i;
    yield frame(13, { i, xor, 'xor (bin)': b(xor) }, viz(i, { [i]: 'pointer' }),
      `xor ^= i: ${b(before)} ^ ${b(i)} = ${b(xor)} (= ${xor}). Chỉ số ${i} đại diện cho số ${i} "đáng lẽ phải có"; nếu ${i} có mặt đâu đó trong mảng, nó sẽ bị triệt tiêu (x ^ x = 0).`);
    const before2 = xor;
    xor ^= nums[i];
    status[i] = 'done';
    yield frame(14, { i, 'nums[i]': nums[i], xor, 'xor (bin)': b(xor) }, viz(i, { [i]: 'compare' }),
      `xor ^= nums[${i}]: ${b(before2)} ^ ${b(nums[i])} = ${b(xor)} (= ${xor}). Giá trị ${nums[i]} có mặt ⇒ nó triệt tiêu cặp với chỉ số ${nums[i]} (dù chỉ số đó đã hay sẽ được XOR). Bit nào xuất hiện chẵn lần sẽ về 0.`);
  }
  yield frame(16, { n, xor, 'xor (bin)': b(xor), result: xor }, viz(null),
    `Hết vòng lặp: mọi số có mặt xuất hiện đúng 2 lần (một lần là chỉ số, một lần là giá trị) nên tự hủy; số ${xor} (${b(xor)}₂) chỉ xuất hiện 1 lần (dạng chỉ số) ⇒ đó là số bị thiếu.`);
  return xor;
}
