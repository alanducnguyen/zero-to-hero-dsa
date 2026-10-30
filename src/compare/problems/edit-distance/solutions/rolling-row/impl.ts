/** Một hàng lăn + biến prev giữ ô chéo dp[i-1][j-1]. O(min(m,n)) bộ nhớ, chỉ cho con số. */
export function minDistance(a: string, b: string): number {
  const [s, t] = a.length >= b.length ? [a, b] : [b, a]; // t ngắn hơn ⇒ hàng dài min(m,n)+1
  const row = Array.from({ length: t.length + 1 }, (_, j) => j); // hàng 0: dp[0][j] = j
  for (let i = 1; i <= s.length; i++) {
    let prev = row[0]; // dp[i-1][0] = ô chéo cho j = 1
    row[0] = i;
    for (let j = 1; j <= t.length; j++) {
      const up = row[j]; // dp[i-1][j], sắp bị ghi đè ⇒ lưu làm ô chéo cho j+1
      row[j] = s[i - 1] === t[j - 1] ? prev : 1 + Math.min(prev, up, row[j - 1]);
      prev = up;
    }
  }
  return row[t.length];
}
