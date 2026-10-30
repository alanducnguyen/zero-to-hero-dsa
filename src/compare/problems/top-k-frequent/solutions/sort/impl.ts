/** Đếm tần suất rồi sắp xếp TOÀN BỘ (giá trị, count) giảm dần theo count, lấy k phần tử đầu. O(n + m log m). */
export function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);
  const entries = [...freq].sort((a, b) => b[1] - a[1]); // sắp cả m giá trị dù chỉ cần k
  return entries.slice(0, k).map(([value]) => value);
}
