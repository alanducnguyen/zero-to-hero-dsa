/**
 * Maximum Subarray – thuật toán Kadane.
 * current = tổng subarray lớn nhất KẾT THÚC tại i; best = max toàn cục.
 * @param nums mảng số (có thể âm)
 * @returns tổng subarray liên tiếp lớn nhất
 */
export function maxSubArray(nums: number[]): number {
  let current = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]); // nối tiếp hay bắt đầu lại?
    best = Math.max(best, current);
  }
  return best;
}
