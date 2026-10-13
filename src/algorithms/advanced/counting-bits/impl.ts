/**
 * Counting Bits – với mọi i trong [0, n], đếm số bit 1 của i.
 * DP trên bit: bits[i] = bits[i >> 1] + (i & 1) – bỏ bit thấp nhất là bài con đã tính.
 * O(n) thay vì O(n log n) khi đếm từng số riêng lẻ.
 */
export function countingBits(n: number): number[] {
  const bits: number[] = new Array<number>(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    bits[i] = bits[i >> 1] + (i & 1); // i >> 1 là i bỏ bit cuối; i & 1 là bit cuối
  }
  return bits;
}
