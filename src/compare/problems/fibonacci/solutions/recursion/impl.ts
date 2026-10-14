/** Đệ quy thuần theo định nghĩa. O(φⁿ) ≈ O(1.618ⁿ) vì tính lại bài con rất nhiều lần. */
export function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
