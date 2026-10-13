/** Bottom-up hai biến: lăn từ fib(0), fib(1) lên. O(n) thời gian, O(1) bộ nhớ. */
export function fib(n: number): number {
  if (n <= 1) return n;
  let prev = 0; // fib(i-2)
  let cur = 1; // fib(i-1)
  for (let i = 2; i <= n; i++) {
    [prev, cur] = [cur, prev + cur]; // trượt cửa sổ 2 giá trị
  }
  return cur;
}
