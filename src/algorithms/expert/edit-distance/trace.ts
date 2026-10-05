import { composite, frame, matrix, arr } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { a: string; b: string }): Generator<Frame, number> {
  const a = input.a;
  const b = input.b;
  const m = a.length;
  const n = b.length;
  const dp: (number | null)[][] = Array.from({ length: m + 1 }, () => new Array<number | null>(n + 1).fill(null));
  const rowLabels = ['""', ...a.split('')];
  const colLabels = ['""', ...b.split('')];
  const viz = (hl: Record<string, Highlight> = {}, i?: number, j?: number) =>
    composite([
      matrix(dp, { title: 'dp[i][j] = edit distance(a[0..i), b[0..j))', rowLabels, colLabels, highlights: hl }),
      ...(i !== undefined && j !== undefined && i > 0 && j > 0
        ? [composite([
            arr(a.split(''), { title: 'a', highlights: { [i - 1]: 'active' }, pointers: [{ name: 'i-1', index: i - 1 }] }),
            arr(b.split(''), { title: 'b', highlights: { [j - 1]: 'active' }, pointers: [{ name: 'j-1', index: j - 1 }] }),
          ], 'row')]
        : []),
    ]);
  yield frame(9, { m, n }, viz(), `Bảng dp kích thước (${m + 1})×(${n + 1}). Hàng i ứng với i ký tự đầu của a, cột j ứng với j ký tự đầu của b.`);
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  yield frame(10, { 'dp[i][0]': 'i' }, viz(Object.fromEntries(Array.from({ length: m + 1 }, (_, i) => [`${i},0`, 'swap']))), 'Cột 0: biến a[0..i) thành chuỗi rỗng cần đúng i phép xoá.');
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  yield frame(11, { 'dp[0][j]': 'j' }, viz(Object.fromEntries(Array.from({ length: n + 1 }, (_, j) => [`0,${j}`, 'swap']))), 'Hàng 0: biến chuỗi rỗng thành b[0..j) cần đúng j phép chèn.');
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cur = `${i},${j}`;
      const diag = `${i - 1},${j - 1}`, up = `${i - 1},${j}`, leftK = `${i},${j - 1}`;
      yield frame(14, { i, j, 'a[i-1]': a[i - 1], 'b[j-1]': b[j - 1] }, viz({ [cur]: 'active', [diag]: 'compare', [up]: 'compare', [leftK]: 'compare' }, i, j), `Tính dp[${i}][${j}]: so sánh a[${i - 1}]='${a[i - 1]}' với b[${j - 1}]='${b[j - 1]}'. Ba ô phụ thuộc: chéo (thay), trên (xoá), trái (chèn).`);
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]!;
        yield frame(15, { i, j, 'dp[i][j]': dp[i][j] }, viz({ [cur]: 'done', [diag]: 'range' }, i, j), `Khớp ⇒ không tốn thao tác: dp[${i}][${j}] = dp[${i - 1}][${j - 1}] = ${dp[i][j]}.`);
      } else {
        const replace = dp[i - 1][j - 1]!;
        const del = dp[i - 1][j]!;
        const insert = dp[i][j - 1]!;
        dp[i][j] = 1 + Math.min(replace, del, insert);
        const minV = Math.min(replace, del, insert);
        const pick = replace === minV ? 'thay' : del === minV ? 'xoá' : 'chèn';
        yield frame(20, { i, j, replace, del, insert, 'dp[i][j]': dp[i][j] }, viz({ [cur]: 'swap', [diag]: replace === minV ? 'range' : 'muted', [up]: del === minV ? 'range' : 'muted', [leftK]: insert === minV ? 'range' : 'muted' }, i, j), `Không khớp ⇒ 1 + min(thay=${replace}, xoá=${del}, chèn=${insert}) = ${dp[i][j]} (chọn ${pick}).`);
      }
    }
  }
  const result = dp[m][n]!;
  yield frame(24, { result }, viz({ [`${m},${n}`]: 'done' }), `Kết quả ở góc dưới phải: dp[${m}][${n}] = ${result}. Biến "${a}" thành "${b}" cần tối thiểu ${result} thao tác.`);
  return result;
}
