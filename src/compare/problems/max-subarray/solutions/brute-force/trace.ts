import { arr, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  let best = -Infinity;
  let bi = 0, bj = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    yield frame(5, { i, best }, arr(nums, { mode: 'bars', highlights: { [i]: 'active' }, ranges: best > -Infinity ? [{ from: bi, to: bj, label: `best = ${best}`, color: 'done' }] : [] }), `Điểm bắt đầu i = ${i}: thử mọi điểm kết thúc j ≥ i. Tổng số đoạn là n(n+1)/2 = ${(nums.length * (nums.length + 1)) / 2}.`);
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      const improved = sum > best;
      if (improved) { best = sum; bi = i; bj = j; }
      yield frame(8, { i, j, sum, best }, arr(nums, { mode: 'bars', highlights: { [j]: improved ? 'done' : 'compare' }, ranges: [{ from: i, to: j, label: `sum = ${sum}`, color: 'range' }, { from: bi, to: bj, label: `best = ${best}`, color: 'done' }] }), improved ? `Đoạn [${i}, ${j}] tổng ${sum} > best ⇒ cập nhật.` : `Đoạn [${i}, ${j}] tổng ${sum} ≤ best = ${best}.`);
    }
  }
  yield frame(11, { best }, arr(nums, { mode: 'bars', ranges: [{ from: bi, to: bj, label: `best = ${best}`, color: 'done' }] }), `Kết quả ${best}. Đã xét mọi đoạn – chắc chắn đúng nhưng O(n²).`);
  return best;
}
