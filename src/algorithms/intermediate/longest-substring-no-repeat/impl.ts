/**
 * Longest Substring Without Repeating Characters – Sliding Window.
 * Cửa sổ [left, right] luôn chứa các ký tự đôi một khác nhau.
 * @param s chuỗi đầu vào
 * @returns độ dài substring dài nhất không có ký tự lặp
 */
export function lengthOfLongestSubstring(s: string): number {
  const lastIndex = new Map<string, number>(); // ký tự → vị trí xuất hiện gần nhất
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    const prev = lastIndex.get(ch);
    if (prev !== undefined && prev >= left) {
      left = prev + 1; // nhảy left qua vị trí lặp, không lùi lại
    }
    lastIndex.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
