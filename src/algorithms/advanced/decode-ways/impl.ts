/**
 * Decode Ways – quy hoạch động 1 chiều trên tiền tố chuỗi.
 * Mã hoá 'A' → "1", ..., 'Z' → "26". Đếm số cách giải mã chuỗi chữ số s.
 * dp[i] = số cách giải mã tiền tố độ dài i (i ký tự đầu).
 * @param s chuỗi chữ số
 * @returns số cách giải mã
 */
export function numDecodings(s: string): number {
  const n = s.length;
  if (n === 0) return 0;
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1; // chuỗi rỗng: đúng 1 cách (không làm gì)
  for (let i = 1; i <= n; i++) {
    const one = s[i - 1]; // ký tự cuối đứng một mình
    if (one !== '0') dp[i] += dp[i - 1];
    if (i >= 2) {
      const two = Number(s.slice(i - 2, i)); // hai ký tự cuối ghép lại
      if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
    }
  }
  return dp[n];
}
