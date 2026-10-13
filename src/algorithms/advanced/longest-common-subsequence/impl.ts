/**
 * Longest Common Subsequence – dãy con chung dài nhất của hai chuỗi (DP 2D).
 * dp[i][j] = LCS của a[0..i) và b[0..j). Truy vết ngược để dựng lại chuỗi.
 */
export function longestCommonSubsequence(a: string, b: string): { length: number; lcs: string } {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1; // ký tự khớp: kéo dài LCS
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // bỏ a[i-1] hoặc bỏ b[j-1]
    }
  }
  // Truy vết: đi ngược từ (m, n) về (0, 0)
  let i = m;
  let j = n;
  const out: string[] = [];
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      out.push(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
    else j--;
  }
  return { length: dp[m][n], lcs: out.reverse().join('') };
}
