/** Brute force: với mỗi điểm bắt đầu i, cộng dồn tới j và cập nhật max. O(n²), O(1). */
export function maxSubArray(nums: number[]): number {
  let best = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j]; // tổng đoạn [i, j]
      best = Math.max(best, sum);
    }
  }
  return best;
}
