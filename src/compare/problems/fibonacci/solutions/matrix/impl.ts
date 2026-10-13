/** Luỹ thừa ma trận: [[1,1],[1,0]]^n = [[F(n+1),F(n)],[F(n),F(n-1)]]. O(log n) nhờ bình phương liên tiếp. */
export function fib(n: number): number {
  let result: [number, number, number, number] = [1, 0, 0, 1]; // ma trận đơn vị
  let base: [number, number, number, number] = [1, 1, 1, 0];
  let e = n;
  while (e > 0) {
    if (e & 1) result = mul(result, base); // bit 1 ⇒ nhân vào kết quả
    base = mul(base, base); // bình phương
    e >>= 1;
  }
  return result[1]; // phần tử [0][1] = F(n)
}
function mul(a: [number, number, number, number], b: [number, number, number, number]): [number, number, number, number] {
  return [a[0] * b[0] + a[1] * b[2], a[0] * b[1] + a[1] * b[3], a[2] * b[0] + a[3] * b[2], a[2] * b[1] + a[3] * b[3]];
}
