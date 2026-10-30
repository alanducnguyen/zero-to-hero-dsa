/** Đệ quy thuần: xét ký tự cuối, khớp thì bỏ qua, không thì thử thay / xoá / chèn. Hàm mũ ~3^(m+n). */
export function minDistance(a: string, b: string): number {
  const d = (i: number, j: number): number => {
    if (i === 0) return j; // a hết ⇒ chèn j ký tự còn lại của b
    if (j === 0) return i; // b hết ⇒ xoá i ký tự còn lại của a
    if (a[i - 1] === b[j - 1]) return d(i - 1, j - 1); // khớp: miễn phí
    return 1 + Math.min(d(i - 1, j - 1), d(i - 1, j), d(i, j - 1)); // thay, xoá, chèn
  };
  return d(a.length, b.length);
}
