/** Mảng 1 chiều duyệt j NGƯỢC (0/1 knapsack). O(n·S) thời gian, O(S) bộ nhớ, dừng sớm. */
export function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;
  const dp = new Array<boolean>(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      if (dp[j - num]) dp[j] = true; // j giảm ⇒ dp[j − num] vẫn là giá trị của hàng trước
    }
    if (dp[target]) return true;
  }
  return dp[target];
}
