/**
 * Minimum Window Substring – Sliding Window với bộ đếm need/have.
 * Tìm substring ngắn nhất của s chứa mọi ký tự của t (tính cả số lần lặp).
 * @param s chuỗi nguồn
 * @param t chuỗi cần phủ
 * @returns cửa sổ ngắn nhất, hoặc "" nếu không tồn tại
 */
export function minWindow(s: string, t: string): string {
  if (t.length === 0 || s.length < t.length) return '';
  const need = new Map<string, number>(); // ký tự → số lần còn thiếu (âm = dư)
  for (const ch of t) need.set(ch, (need.get(ch) ?? 0) + 1);
  const required = need.size; // số ký tự khác nhau phải đủ
  let have = 0; // số ký tự khác nhau đã đủ trong cửa sổ
  let left = 0;
  let bestStart = 0;
  let bestLen = Infinity;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (need.has(ch)) {
      need.set(ch, need.get(ch)! - 1);
      if (need.get(ch) === 0) have++; // ch vừa đủ số lượng
    }
    while (have === required) {
      if (right - left + 1 < bestLen) {
        bestLen = right - left + 1;
        bestStart = left;
      }
      const out = s[left];
      if (need.has(out)) {
        need.set(out, need.get(out)! + 1);
        if (need.get(out)! > 0) have--; // bỏ out làm thiếu ⇒ cửa sổ hết hợp lệ
      }
      left++;
    }
  }
  return bestLen === Infinity ? '' : s.slice(bestStart, bestStart + bestLen);
}
