/** Brute force: với mỗi cửa sổ quét lại cả k phần tử để tìm max. O(n·k) thời gian, O(1) bộ nhớ phụ. */
export function maxSlidingWindow(nums: number[], k: number): number[] {
  const res: number[] = [];
  for (let i = 0; i + k <= nums.length; i++) {
    let best = nums[i];
    for (let j = i + 1; j < i + k; j++) {
      if (nums[j] > best) best = nums[j];
    }
    res.push(best);
  }
  return res;
}
