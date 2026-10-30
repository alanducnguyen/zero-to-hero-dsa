/** DP O(n²): dp[i] = độ dài LIS kết thúc đúng tại nums[i]. */
export function lengthOfLIS(nums: number[]): number {
  const dp = new Array<number>(nums.length).fill(1); // mỗi phần tử tự nó là dãy dài 1
  let best = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) dp[i] = dp[j] + 1; // nối nums[i] sau dãy kết thúc tại j
    }
    best = Math.max(best, dp[i]);
  }
  return best;
}
