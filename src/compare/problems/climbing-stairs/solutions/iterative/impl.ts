/** Bottom-up hai biến: ways(i) = ways(i-1) + ways(i-2), chỉ giữ 2 giá trị cuối. O(n)/O(1). */
export function climbStairs(n: number): number {
  if (n <= 2) return n;
  let a = 1; // ways(i-2)
  let b = 2; // ways(i-1)
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b]; // trượt cửa sổ 2 giá trị
  }
  return b;
}
