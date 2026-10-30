/** Brute force: xét MỌI substring s[i..j], đếm tần suất tăng dần theo j rồi so cả bảng với t. O(n²·σ) thời gian. */
export function minWindow(s: string, t: string): string {
  if (t.length === 0) return '';
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let best = '';
  for (let i = 0; i < s.length; i++) {
    const cnt = new Map<string, number>(); // tần suất của s[i..j], dựng lại từ đầu cho mỗi i
    for (let j = i; j < s.length; j++) {
      cnt.set(s[j], (cnt.get(s[j]) ?? 0) + 1);
      const ok = [...need].every(([c, k]) => (cnt.get(c) ?? 0) >= k); // so cả bảng: O(σ)
      if (ok && (best === '' || j - i + 1 < best.length)) best = s.slice(i, j + 1); // chỉ thay khi NGẮN HƠN ⇒ giữ cửa sổ trái nhất
    }
  }
  return best;
}
