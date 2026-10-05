/**
 * Single Number – mọi số xuất hiện đúng 2 lần trừ một số. Tìm số đó.
 * XOR: a ^ a = 0, a ^ 0 = a, giao hoán & kết hợp ⇒ XOR tất cả còn lại đúng số lẻ.
 * O(n) thời gian, O(1) bộ nhớ – không cần HashMap.
 */
export function singleNumber(nums: number[]): number {
  let acc = 0;
  for (const x of nums) {
    acc ^= x; // cặp giống nhau triệt tiêu
  }
  return acc;
}

/** Đếm số bit 1 (Brian Kernighan): mỗi vòng xoá bit 1 thấp nhất. */
export function countBits(n: number): number {
  let count = 0;
  while (n !== 0) {
    n &= n - 1; // xoá bit 1 thấp nhất
    count++;
  }
  return count;
}

/** n có phải luỹ thừa của 2? Đúng khi có duy nhất 1 bit 1. */
export function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}
