/** Đệ quy + memo (top-down DP): mỗi ways(i) tính đúng một lần. O(n) thời gian, O(n) bộ nhớ + stack. */
export function climbStairs(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 2) return n;
  if (memo.has(n)) return memo.get(n)!; // đã tính ⇒ trả ngay
  const v = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  memo.set(n, v);
  return v;
}
