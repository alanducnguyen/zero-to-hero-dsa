/**
 * House Robber – quy hoạch động 1 chiều.
 * Không được lấy hai nhà kề nhau; tìm tổng lớn nhất.
 * dp[i] = max tiền lấy được từ i nhà đầu tiên.
 * @param nums tiền ở mỗi nhà
 * @returns tổng lớn nhất
 */
export function rob(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  const dp: number[] = new Array(n + 1).fill(0);
  dp[1] = nums[0]; // chỉ có 1 nhà ⇒ lấy nó
  for (let i = 2; i <= n; i++) {
    const skip = dp[i - 1]; // bỏ qua nhà i-1
    const take = dp[i - 2] + nums[i - 1]; // lấy nhà i-1, nên nhà i-2 phải bỏ
    dp[i] = Math.max(skip, take);
  }
  return dp[n];
}
