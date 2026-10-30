/** Bảng 2 chiều: dp[i][j] = dùng i số đầu có đạt tổng j? O(n·S) thời gian và bộ nhớ. */
export function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;
  const n = nums.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<boolean>(target + 1).fill(false));
  dp[0][0] = true; // tập rỗng có tổng 0
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    for (let j = 0; j <= target; j++) {
      dp[i][j] = dp[i - 1][j] || (j >= num && dp[i - 1][j - num]); // bỏ num || lấy num
    }
  }
  return dp[n][target];
}
