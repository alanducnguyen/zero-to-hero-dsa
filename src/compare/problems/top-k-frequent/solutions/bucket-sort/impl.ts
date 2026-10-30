/** Đếm tần suất, rồi bucket theo count (count ≤ n): quét bucket từ count lớn xuống tới khi đủ k. O(n). */
export function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []); // buckets[c] = các giá trị xuất hiện đúng c lần
  for (const [value, count] of freq) buckets[count].push(value);
  const result: number[] = [];
  for (let c = nums.length; c >= 1 && result.length < k; c--) {
    for (const value of buckets[c]) {
      if (result.length === k) break;
      result.push(value);
    }
  }
  return result;
}
