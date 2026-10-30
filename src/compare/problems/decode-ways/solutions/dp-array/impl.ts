/** Bottom-up: dp[i] = số cách giải mã i ký tự đầu. O(n) thời gian, O(n) bộ nhớ, không đệ quy. */
export function numDecodings(s: string): number {
  const n = s.length;
  const dp = new Array<number>(n + 1).fill(0);
  dp[0] = 1; // tiền tố rỗng: 1 cách (để phép cộng phía sau đúng)
  for (let i = 1; i <= n; i++) {
    if (s[i - 1] !== '0') dp[i] += dp[i - 1]; // ký tự cuối đứng một mình
    const two = i >= 2 ? Number(s.slice(i - 2, i)) : 0;
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2]; // hai ký tự cuối ghép thành 10..26
  }
  return dp[n];
}
