import { frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { a: string; b: string }): Generator<Frame, number> {
  const { a, b } = input;
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  const viz = (hl: Record<string, Highlight> = {}) => matrix(dp, { title: 'dp[i][j] = LCS(a[0..i), b[0..j))', rowLabels: ['""', ...a.split('')], colLabels: ['""', ...b.split('')], highlights: hl });
  yield frame(5, { m, n }, viz(), `Cấp phát (${m + 1})×(${n + 1}) ô, hàng/cột 0 = 0 (LCS với chuỗi rỗng). Thứ tự duyệt hàng-rồi-cột đảm bảo ô trên, trái, chéo luôn có trước.`);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        yield frame(8, { i, j, 'a[i-1]': a[i - 1], 'b[j-1]': b[j - 1], 'dp[i][j]': dp[i][j] }, viz({ [`${i},${j}`]: 'done', [`${i - 1},${j - 1}`]: 'range' }), `'${a[i - 1]}' = '${b[j - 1]}' ⇒ lấy ô chéo + 1 = ${dp[i][j]}.`);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        yield frame(9, { i, j, 'dp[i-1][j]': dp[i - 1][j], 'dp[i][j-1]': dp[i][j - 1], 'dp[i][j]': dp[i][j] }, viz({ [`${i},${j}`]: 'swap', [`${i - 1},${j}`]: 'compare', [`${i},${j - 1}`]: 'compare' }), `'${a[i - 1]}' ≠ '${b[j - 1]}' ⇒ max(trên=${dp[i - 1][j]}, trái=${dp[i][j - 1]}) = ${dp[i][j]}. Ô này chỉ cần hàng trên và chính hàng hiện tại – gợi ý tối ưu bộ nhớ.`);
      }
    }
  }
  yield frame(12, { 'dp[m][n]': dp[m][n] }, viz({ [`${m},${n}`]: 'done' }), `LCS dài ${dp[m][n]}. Tốn O(m·n) bộ nhớ, đổi lại bảng còn nguyên nên đi ngược từ (${m},${n}) theo hướng chéo/trên/trái là in ra được chuỗi LCS – hai hàng lăn không làm được điều này.`);
  return dp[m][n];
}
