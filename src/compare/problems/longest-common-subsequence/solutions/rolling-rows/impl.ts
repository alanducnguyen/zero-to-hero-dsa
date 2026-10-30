/** Hai hàng lăn: hàng i chỉ cần hàng i−1 ⇒ O(min(m,n)) bộ nhớ. Chỉ cho độ dài, không dựng lại được chuỗi. */
export function longestCommonSubsequence(a: string, b: string): number {
  const [s, t] = a.length >= b.length ? [a, b] : [b, a]; // t ngắn hơn ⇒ hàng dài min(m,n)+1
  let prev = new Array<number>(t.length + 1).fill(0);
  for (let i = 1; i <= s.length; i++) {
    const cur = new Array<number>(t.length + 1).fill(0);
    for (let j = 1; j <= t.length; j++) {
      cur[j] = s[i - 1] === t[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
    }
    prev = cur; // hàng i thành "hàng trên" của hàng i+1
  }
  return prev[t.length];
}
