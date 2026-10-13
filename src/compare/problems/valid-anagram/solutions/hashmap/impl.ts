/** HashMap đếm: cộng theo s, trừ theo t; mọi giá trị về 0 ⇒ anagram. O(n), O(k) với k = số ký tự khác nhau. */
export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count = new Map<string, number>();
  for (const c of s) count.set(c, (count.get(c) ?? 0) + 1);
  for (const c of t) {
    const v = (count.get(c) ?? 0) - 1;
    if (v < 0) return false; // t có ký tự nhiều hơn s
    count.set(c, v);
  }
  return true; // tổng độ dài bằng nhau và không âm ⇒ tất cả về 0
}
