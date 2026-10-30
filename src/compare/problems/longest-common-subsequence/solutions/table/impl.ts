/** Bảng 2-D đầy đủ (bottom-up). Giữ cả bảng ⇒ truy vết ngược dựng lại được chính chuỗi LCS. */
export function longestCommonSubsequence(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1; // khớp: kéo dài LCS chéo
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // bỏ a[i-1] hoặc b[j-1]
    }
  }
  return dp[m][n]; // bảng còn nguyên ⇒ có thể lần ngược từ (m, n) để in LCS
}
