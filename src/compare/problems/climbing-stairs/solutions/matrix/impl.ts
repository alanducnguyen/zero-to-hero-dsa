/** ways(n) = F(n+1) = phần tử [0][0] của Qⁿ với Q = [[1,1],[1,0]]. Bình phương liên tiếp ⇒ O(log n). */
type M = [number, number, number, number]; // ma trận 2×2 trải phẳng [a, b, c, d]
export function climbStairs(n: number): number {
  let result: M = [1, 0, 0, 1]; // ma trận đơn vị
  let base: M = [1, 1, 1, 0]; // Q
  for (let e = n; e > 0; e >>= 1) {
    if (e & 1) result = mul(result, base); // bit 1 ⇒ nhân vào kết quả
    base = mul(base, base); // Q^(2^k) → Q^(2^(k+1))
  }
  return result[0]; // [0][0] = F(n+1)
}
function mul(a: M, b: M): M {
  return [a[0] * b[0] + a[1] * b[2], a[0] * b[1] + a[1] * b[3], a[2] * b[0] + a[3] * b[2], a[2] * b[1] + a[3] * b[3]];
}
