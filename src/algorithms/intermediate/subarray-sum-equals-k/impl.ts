/**
 * Subarray Sum Equals K (LeetCode 560) – đếm số mảng con liên tiếp có tổng bằng k.
 * Prefix sum + HashMap đếm tần suất prefix: chạy đúng cả khi có số âm.
 * @param nums mảng số nguyên (có thể âm)
 * @param k tổng cần tìm
 * @returns số mảng con liên tiếp có tổng đúng bằng k
 */
export function subarraySum(nums: number[], k: number): number {
  const seen = new Map<number, number>();
  seen.set(0, 1); // prefix rỗng: cho phép mảng con bắt đầu từ index 0
  let prefix = 0;
  let count = 0;
  for (let j = 0; j < nums.length; j++) {
    prefix += nums[j];
    const need = prefix - k; // cần một prefix trước đó bằng need
    const times = seen.get(need) ?? 0;
    count += times;
    seen.set(prefix, (seen.get(prefix) ?? 0) + 1);
  }
  return count;
}
