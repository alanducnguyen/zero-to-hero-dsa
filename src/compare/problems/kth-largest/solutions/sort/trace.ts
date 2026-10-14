import { arr, composite, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number> {
  const { nums } = input;
  const k = Math.max(1, Math.min(input.k, nums.length));
  const sorted = [...nums].sort((a, b) => b - a);
  yield frame(3, { k, n: nums.length }, composite([arr(nums, { title: 'nums' }), arr(sorted, { title: 'sorted giảm dần (O(n log n))' })]), `Sắp xếp toàn bộ ${nums.length} phần tử dù chỉ cần một vị trí – đó là chỗ lãng phí của cách này.`);
  yield frame(4, { k, 'sorted[k-1]': sorted[k - 1] }, composite([arr(nums, { title: 'nums' }), arr(sorted, { title: 'sorted giảm dần', highlights: { [k - 1]: 'done' }, pointers: [{ name: 'k-1', index: k - 1 }] })]), `Phần tử lớn thứ ${k} là sorted[${k - 1}] = ${sorted[k - 1]}. Đơn giản, nhưng đã trả giá O(n log n).`);
  return sorted[k - 1];
}
