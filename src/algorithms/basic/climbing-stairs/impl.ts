/**
 * Climbing Stairs – số cách leo n bậc khi mỗi bước lên 1 hoặc 2 bậc.
 * Bài DP 1D nhập môn: ways(i) = ways(i-1) + ways(i-2) (chính là Fibonacci).
 */
export function climbingStairs(n: number): number {
  if (n <= 1) return 1; // 0 bậc: 1 cách (đứng yên); 1 bậc: 1 cách
  const dp: number[] = new Array<number>(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // bước cuối là 1 bậc (từ i-1) hoặc 2 bậc (từ i-2)
  }
  return dp[n];
}
