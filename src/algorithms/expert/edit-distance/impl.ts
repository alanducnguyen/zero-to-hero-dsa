/**
 * Edit Distance (Levenshtein) – số thao tác ít nhất (chèn / xoá / thay)
 * để biến chuỗi a thành chuỗi b. Quy hoạch động 2 chiều.
 * dp[i][j] = khoảng cách giữa a[0..i) và b[0..j).
 */
export function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i; // xoá i ký tự của a
  for (let j = 0; j <= n; j++) dp[0][j] = j; // chèn j ký tự của b
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // ký tự khớp, không tốn thao tác
      } else {
        const replace = dp[i - 1][j - 1];
        const del = dp[i - 1][j];
        const insert = dp[i][j - 1];
        dp[i][j] = 1 + Math.min(replace, del, insert);
      }
    }
  }
  return dp[m][n];
}
