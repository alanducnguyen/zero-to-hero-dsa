/** DP 2D: dp[i][j] = s[i..j] là palindrome ⟺ s[i] === s[j] và dp[i+1][j-1]. O(n²) thời gian, O(n²) bộ nhớ. */
export function longestPalindrome(s: string): string {
  const n = s.length;
  if (n === 0) return '';
  const dp: boolean[][] = Array.from({ length: n }, () => new Array<boolean>(n).fill(false));
  let start = 0, maxLen = 1;
  for (let len = 1; len <= n; len++) { // điền theo độ dài tăng dần
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      if (s[i] !== s[j]) continue;
      dp[i][j] = len <= 2 || dp[i + 1][j - 1]; // hai đầu bằng nhau và phần trong là palindrome
      if (dp[i][j] && len > maxLen) { start = i; maxLen = len; }
    }
  }
  return s.slice(start, start + maxLen);
}
