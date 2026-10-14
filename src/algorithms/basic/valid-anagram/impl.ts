/**
 * Valid Anagram – hai chuỗi có cùng tập ký tự (kể cả số lần) không?
 * Đếm tần suất: cộng cho s, trừ cho t; mọi bộ đếm phải về 0.
 */
export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false; // độ dài khác ⇒ chắc chắn không
  const count = new Map<string, number>();
  for (const ch of s) count.set(ch, (count.get(ch) ?? 0) + 1); // cộng
  for (const ch of t) {
    const c = (count.get(ch) ?? 0) - 1; // trừ
    if (c < 0) return false; // t có ký tự nhiều hơn s
    count.set(ch, c);
  }
  return true; // tổng cộng = tổng trừ và không âm ⇒ tất cả bằng 0
}
