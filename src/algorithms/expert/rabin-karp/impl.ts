/**
 * Rabin-Karp – tìm mọi vị trí pattern xuất hiện trong text bằng rolling hash.
 * hash(s) = Σ s[i]·B^(m-1-i) mod M. Trượt cửa sổ: bỏ ký tự đầu, thêm ký tự cuối trong O(1).
 * Hash trùng ⇒ so sánh trực tiếp để loại va chạm giả (spurious hit).
 */
export function rabinKarp(text: string, pattern: string, base = 31, mod = 101): number[] {
  const n = text.length;
  const m = pattern.length;
  const matches: number[] = [];
  if (m === 0 || m > n) return matches;
  let high = 1; // B^(m-1) mod M – trọng số của ký tự đầu cửa sổ
  for (let i = 1; i < m; i++) high = (high * base) % mod;
  let hp = 0; // hash của pattern
  let ht = 0; // hash cửa sổ text hiện tại
  for (let i = 0; i < m; i++) {
    hp = (hp * base + pattern.charCodeAt(i)) % mod;
    ht = (ht * base + text.charCodeAt(i)) % mod;
  }
  for (let i = 0; i + m <= n; i++) {
    if (ht === hp && text.slice(i, i + m) === pattern) matches.push(i); // xác minh khi hash trùng
    if (i + m < n) {
      ht = (ht - text.charCodeAt(i) * high) % mod; // bỏ ký tự đầu
      ht = (ht * base + text.charCodeAt(i + m)) % mod; // thêm ký tự mới
      if (ht < 0) ht += mod;
    }
  }
  return matches;
}
