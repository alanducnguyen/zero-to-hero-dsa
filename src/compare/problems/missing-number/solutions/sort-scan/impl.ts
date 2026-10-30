/** Sort rồi quét: vị trí đầu tiên mà sorted[i] ≠ i chính là số thiếu. O(n log n) thời gian. */
export function missingNumber(nums: number[]): number {
  const sorted = [...nums].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] !== i) return i;
  }
  return sorted.length;
}
