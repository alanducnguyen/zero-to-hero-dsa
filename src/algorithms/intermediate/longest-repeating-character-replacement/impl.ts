/**
 * Longest Repeating Character Replacement – Sliding Window + maxFreq.
 * Được thay tối đa k ký tự; tìm substring dài nhất gồm toàn một ký tự.
 * Cửa sổ hợp lệ khi (độ dài − maxFreq) ≤ k.
 * @param s chuỗi chữ in hoa
 * @param k số lần thay tối đa
 * @returns độ dài substring dài nhất
 */
export function characterReplacement(s: string, k: number): number {
  const count = new Map<string, number>(); // tần suất ký tự trong cửa sổ
  let maxFreq = 0; // tần suất lớn nhất TỪNG đạt – không cần giảm khi co
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    count.set(ch, (count.get(ch) ?? 0) + 1);
    maxFreq = Math.max(maxFreq, count.get(ch)!);
    if (right - left + 1 - maxFreq > k) {
      const out = s[left]; // cửa sổ quá k ⇒ trượt left lên 1
      count.set(out, count.get(out)! - 1);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
