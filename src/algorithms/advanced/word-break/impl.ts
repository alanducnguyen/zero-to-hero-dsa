/**
 * Word Break – kiểm tra chuỗi s có thể cắt thành các từ trong từ điển hay không (DP 1D).
 * dp[i] = true nếu s[0..i) cắt được. dp[i] đúng khi tồn tại j < i: dp[j] và s[j..i) ∈ dict.
 */
export function wordBreak(s: string, wordDict: string[]): boolean {
  const dict = new Set(wordDict);
  const maxLen = Math.max(0, ...wordDict.map((w) => w.length));
  const n = s.length;
  const dp: boolean[] = new Array<boolean>(n + 1).fill(false);
  dp[0] = true; // chuỗi rỗng luôn cắt được
  for (let i = 1; i <= n; i++) {
    for (let j = i - 1; j >= Math.max(0, i - maxLen); j--) {
      if (dp[j] && dict.has(s.slice(j, i))) {
        dp[i] = true; // s[0..j) cắt được và s[j..i) là một từ
        break;
      }
    }
  }
  return dp[n];
}
