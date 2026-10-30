/** Prefix sum + HashMap đếm tần suất: mảng con kết thúc tại j có tổng k ⇔ có tiền tố trước đó bằng sum − k. O(n)/O(n). */
export function subarraySum(nums: number[], k: number): number {
  const freq = new Map<number, number>([[0, 1]]); // tiền tố rỗng có tổng 0
  let sum = 0;
  let count = 0;
  for (const x of nums) {
    sum += x;
    count += freq.get(sum - k) ?? 0; // mỗi tiền tố trước có tổng sum − k cho một mảng con
    freq.set(sum, (freq.get(sum) ?? 0) + 1); // ghi SAU khi tra để không đếm mảng con rỗng
  }
  return count;
}
