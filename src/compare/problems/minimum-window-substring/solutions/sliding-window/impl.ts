/** Sliding window need/missing: right mở rộng tới khi đủ t, left co tới khi sắp thiếu. Mỗi ký tự vào/ra một lần ⇒ O(n). */
export function minWindow(s: string, t: string): string {
  if (t.length === 0) return '';
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let missing = t.length;
  let left = 0;
  let bestL = 0;
  let bestLen = Infinity;
  for (let right = 0; right < s.length; right++) {
    const k = need.get(s[right]);
    if (k !== undefined) {
      need.set(s[right], k - 1);
      if (k > 0) missing--; // ký tự đang thiếu vừa được bù
    }
    while (missing === 0) { // [left, right] hợp lệ ⇒ thử co trái
      if (right - left + 1 < bestLen) [bestL, bestLen] = [left, right - left + 1];
      const out = need.get(s[left]);
      if (out !== undefined) {
        need.set(s[left], out + 1);
        if (out + 1 > 0) missing++; // bỏ đi ký tự cần thiết ⇒ lại thiếu
      }
      left++;
    }
  }
  return bestLen === Infinity ? '' : s.slice(bestL, bestL + bestLen);
}
