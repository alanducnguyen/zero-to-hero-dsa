/**
 * Prefix Sum – tiền xử lý O(n) để trả lời "tổng đoạn [l, r]" trong O(1).
 * prefix[i] = nums[0] + ... + nums[i-1]; sum(l, r) = prefix[r+1] - prefix[l].
 */
export function buildPrefix(nums: number[]): number[] {
  const prefix = new Array<number>(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i]; // cộng dồn
  }
  return prefix;
}

/** Tổng nums[l..r] (inclusive) từ mảng prefix. */
export function rangeSum(prefix: number[], l: number, r: number): number {
  return prefix[r + 1] - prefix[l];
}

/** Đếm số subarray có tổng bằng k bằng prefix sum + HashMap (LeetCode 560). */
export function subarraySumEqualsK(nums: number[], k: number): number {
  const seen = new Map<number, number>([[0, 1]]); // prefix 0 xuất hiện 1 lần (đoạn rỗng)
  let prefix = 0;
  let count = 0;
  for (const x of nums) {
    prefix += x;
    count += seen.get(prefix - k) ?? 0; // mỗi prefix cũ = prefix - k cho một subarray tổng k
    seen.set(prefix, (seen.get(prefix) ?? 0) + 1);
  }
  return count;
}
