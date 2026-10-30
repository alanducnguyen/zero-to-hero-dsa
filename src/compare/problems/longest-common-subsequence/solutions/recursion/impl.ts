/** Đệ quy thuần: so sánh ký tự cuối của hai tiền tố. Hàm mũ vì cùng (i, j) bị tính lại nhiều lần. */
export function longestCommonSubsequence(a: string, b: string): number {
  const lcs = (i: number, j: number): number => {
    if (i === 0 || j === 0) return 0; // một tiền tố rỗng ⇒ không có gì chung
    if (a[i - 1] === b[j - 1]) return lcs(i - 1, j - 1) + 1; // khớp: ăn cả hai ký tự
    return Math.max(lcs(i - 1, j), lcs(i, j - 1)); // không khớp: bỏ một bên
  };
  return lcs(a.length, b.length);
}
