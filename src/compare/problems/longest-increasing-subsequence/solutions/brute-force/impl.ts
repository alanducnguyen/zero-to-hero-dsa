/** Brute force: với mỗi phần tử chọn lấy hoặc bỏ, chỉ lấy khi lớn hơn phần tử lấy trước. O(2ⁿ) thời gian. */
export function lengthOfLIS(nums: number[]): number {
  // go(i, prev): LIS dài nhất trong nums[i..] khi phần tử lấy gần nhất ở chỉ số prev (−1 = chưa lấy)
  const go = (i: number, prev: number): number => {
    if (i === nums.length) return 0;
    let best = go(i + 1, prev); // bỏ nums[i]
    if (prev < 0 || nums[i] > nums[prev]) best = Math.max(best, 1 + go(i + 1, i)); // lấy nums[i]
    return best;
  };
  return go(0, -1);
}
