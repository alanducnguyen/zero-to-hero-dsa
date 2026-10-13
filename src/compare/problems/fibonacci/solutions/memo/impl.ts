/** Đệ quy + memo (top-down DP): mỗi fib(i) tính đúng một lần. O(n) thời gian, O(n) bộ nhớ + stack. */
export function fib(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!; // đã tính ⇒ trả ngay
  const v = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, v);
  return v;
}
