/** Bottom-up: dp[i] = tiền lớn nhất khi chỉ xét i nhà đầu tiên. O(n) thời gian, O(n) bộ nhớ. */
export function rob(nums: number[]): number {
  const n = nums.length;
  const dp = new Array<number>(n + 1).fill(0); // dp[0] = 0: chưa có nhà nào
  if (n > 0) dp[1] = nums[0];
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]); // bỏ nhà i-1 hoặc cướp nó
  }
  return dp[n];
}
