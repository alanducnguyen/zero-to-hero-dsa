/** Kadane: cur = max(x, cur + x) – "kéo dài đoạn hay bắt đầu lại?". O(n), O(1). */
export function maxSubArray(nums: number[]): number {
  let cur = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]); // đoạn tốt nhất kết thúc tại i
    best = Math.max(best, cur);
  }
  return best;
}
