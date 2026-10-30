/** Với mỗi left, mở rộng right tới khi vừa đủ t (đếm missing O(1)) rồi dừng ngay. O(n²) thời gian. */
export function minWindow(s: string, t: string): string {
  if (t.length === 0) return '';
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let best = '';
  for (let left = 0; left < s.length; left++) {
    const rem = new Map(need); // còn thiếu bao nhiêu mỗi ký tự (âm = dư)
    let missing = t.length; // tổng số ký tự còn thiếu
    for (let right = left; right < s.length; right++) {
      const k = rem.get(s[right]);
      if (k !== undefined) {
        rem.set(s[right], k - 1);
        if (k > 0) missing--; // chỉ ký tự đang thiếu mới làm giảm missing
      }
      if (missing === 0) {
        if (best === '' || right - left + 1 < best.length) best = s.slice(left, right + 1);
        break; // right xa hơn chỉ làm cửa sổ dài thêm
      }
    }
  }
  return best;
}
