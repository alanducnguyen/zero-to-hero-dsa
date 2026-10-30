import { frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { a: string; b: string }): Generator<Frame, number> {
  const { a, b } = input;
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  const viz = (hl: Record<string, Highlight> = {}) => matrix(dp, { title: 'dp[i][j] = edit distance(a[0..i), b[0..j))', rowLabels: ['""', ...a.split('')], colLabels: ['""', ...b.split('')], highlights: hl });
  yield frame(5, { m, n }, viz(), `Bảng (${m + 1})×(${n + 1}): hàng 0 = j (chèn), cột 0 = i (xoá). Duyệt hàng-rồi-cột để chéo, trên, trái luôn có sẵn.`);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const diag = `${i - 1},${j - 1}`, up = `${i - 1},${j}`, left = `${i},${j - 1}`;
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
        yield frame(8, { i, j, 'a[i-1]': a[i - 1], 'b[j-1]': b[j - 1], 'dp[i][j]': dp[i][j] }, viz({ [`${i},${j}`]: 'done', [diag]: 'range' }), `Khớp '${a[i - 1]}' ⇒ chép ô chéo = ${dp[i][j]}, không tốn thao tác.`);
      } else {
        const [rep, del, ins] = [dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]];
        dp[i][j] = 1 + Math.min(rep, del, ins);
        const mn = dp[i][j] - 1;
        yield frame(9, { i, j, thay: rep, xoá: del, chèn: ins, 'dp[i][j]': dp[i][j] }, viz({ [`${i},${j}`]: 'swap', [diag]: rep === mn ? 'range' : 'compare', [up]: del === mn ? 'range' : 'compare', [left]: ins === mn ? 'range' : 'compare' }),
          `'${a[i - 1]}' ≠ '${b[j - 1]}' ⇒ 1 + min(thay=${rep}, xoá=${del}, chèn=${ins}) = ${dp[i][j]}. Ô chéo là thứ duy nhất ngoài hàng hiện tại và hàng trên cần tới.`);
      }
    }
  }
  yield frame(12, { 'dp[m][n]': dp[m][n] }, viz({ [`${m},${n}`]: 'done' }), `Khoảng cách = ${dp[m][n]}. Bảng O(m·n) còn nguyên nên lần ngược được dãy thao tác cụ thể (diff/alignment) – bản một hàng không làm được.`);
  return dp[m][n];
}
