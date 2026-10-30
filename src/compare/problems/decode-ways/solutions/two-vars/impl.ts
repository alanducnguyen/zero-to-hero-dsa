/** Hai biến lăn: dp[i] chỉ phụ thuộc dp[i-1], dp[i-2]. O(n) thời gian, O(1) bộ nhớ. */
export function numDecodings(s: string): number {
  let prev2 = 0; // dp[i-2]
  let prev1 = 1; // dp[i-1], ban đầu là dp[0] = 1
  for (let i = 1; i <= s.length; i++) {
    let cur = s[i - 1] !== '0' ? prev1 : 0; // ký tự cuối đứng một mình
    const two = i >= 2 ? Number(s.slice(i - 2, i)) : 0;
    if (two >= 10 && two <= 26) cur += prev2; // ghép hai ký tự cuối
    [prev2, prev1] = [prev1, cur]; // trượt cửa sổ
  }
  return prev1;
}
