/** Sắp xếp hai chuỗi rồi so sánh. O(n log n) thời gian, O(n) bộ nhớ cho chuỗi đã sắp xếp. */
export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const a = [...s].sort().join('');
  const b = [...t].sort().join('');
  return a === b;
}
