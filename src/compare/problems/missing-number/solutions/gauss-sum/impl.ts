/** Công thức Gauss: tổng 0..n trừ tổng mảng. O(n) thời gian, O(1) bộ nhớ (cẩn thận tràn số). */
export function missingNumber(nums: number[]): number {
  const n = nums.length;
  let sum = 0;
  for (const x of nums) sum += x;
  return (n * (n + 1)) / 2 - sum;
}
