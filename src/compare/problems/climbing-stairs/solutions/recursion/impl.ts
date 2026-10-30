/** Đệ quy thuần: bước cuối là 1 bậc (từ n-1) hoặc 2 bậc (từ n-2). O(φⁿ) vì bài con bị tính lại. */
export function climbStairs(n: number): number {
  if (n <= 2) return n; // 1 bậc: 1 cách; 2 bậc: 2 cách (1+1, 2)
  return climbStairs(n - 1) + climbStairs(n - 2);
}
