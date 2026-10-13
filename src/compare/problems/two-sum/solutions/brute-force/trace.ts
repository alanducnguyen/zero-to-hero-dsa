import { arr, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[]; target: number }): Generator<Frame, [number, number] | null> {
  const { nums, target } = input;
  let checks = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      checks++;
      const ok = nums[i] + nums[j] === target;
      yield frame(5, { i, j, 'nums[i]+nums[j]': nums[i] + nums[j], target, 'số cặp đã thử': checks }, arr(nums, { highlights: { [i]: 'pointer', [j]: ok ? 'done' : 'compare' }, pointers: [{ name: 'i', index: i }, { name: 'j', index: j }] }),
        ok ? `${nums[i]} + ${nums[j]} = ${target} ⇒ tìm thấy sau ${checks} lần thử.` : `${nums[i]} + ${nums[j]} ≠ ${target}. Thử cặp kế tiếp – tổng số cặp có thể tới n(n−1)/2 = ${(nums.length * (nums.length - 1)) / 2}.`);
      if (ok) return [i, j];
    }
  }
  yield frame(8, { 'số cặp đã thử': checks }, arr(nums), 'Đã thử hết mọi cặp, không có đáp án.');
  return null;
}
