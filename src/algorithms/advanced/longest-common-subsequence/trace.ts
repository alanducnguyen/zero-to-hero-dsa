import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { a: string; b: string }): Generator<Frame, { length: number; lcs: string }> {
  const a = input.a;
  const b = input.b;
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  const rowLabels = ['""', ...a.split('')];
  const colLabels = ['""', ...b.split('')];
  const viz = (hl: Record<string, Highlight> = {}, i?: number, j?: number, out: string[] = []) =>
    composite([
      matrix(dp, { title: 'dp[i][j] = LCS(a[0..i), b[0..j))', rowLabels, colLabels, highlights: hl }),
      composite([
        arr(a.split(''), { title: 'a', highlights: i !== undefined && i > 0 ? { [i - 1]: 'active' } : {} }),
        arr(b.split(''), { title: 'b', highlights: j !== undefined && j > 0 ? { [j - 1]: 'active' } : {} }),
      ], 'row'),
      ...(out.length ? [arr([...out].reverse(), { title: 'LCS đang dựng (truy vết ngược)', highlights: Object.fromEntries(out.map((_, k) => [k, 'done' as Highlight])) })] : []),
    ]);

  yield frame(8, { m, n }, viz(), `Bảng (${m + 1})×(${n + 1}) khởi tạo 0: LCS với chuỗi rỗng luôn bằng 0 – đó là cơ sở của DP.`);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cur = `${i},${j}`;
      const diag = `${i - 1},${j - 1}`;
      const up = `${i - 1},${j}`;
      const left = `${i},${j - 1}`;
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        yield frame(11, { i, j, 'a[i-1]': a[i - 1], 'b[j-1]': b[j - 1], 'dp[i][j]': dp[i][j] }, viz({ [cur]: 'done', [diag]: 'range' }, i, j),
          `'${a[i - 1]}' = '${b[j - 1]}' ⇒ ký tự này chắc chắn thuộc một LCS tối ưu: dp = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}.`);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        const pickUp = dp[i - 1][j] >= dp[i][j - 1];
        yield frame(12, { i, j, 'a[i-1]': a[i - 1], 'b[j-1]': b[j - 1], 'dp[i-1][j]': dp[i - 1][j], 'dp[i][j-1]': dp[i][j - 1], 'dp[i][j]': dp[i][j] },
          viz({ [cur]: 'swap', [up]: pickUp ? 'range' : 'compare', [left]: pickUp ? 'compare' : 'range' }, i, j),
          `'${a[i - 1]}' ≠ '${b[j - 1]}' ⇒ hai ký tự cuối không thể cùng kết thúc LCS: bỏ một trong hai, lấy max(trên=${dp[i - 1][j]}, trái=${dp[i][j - 1]}) = ${dp[i][j]}.`);
      }
    }
  }
  let i = m;
  let j = n;
  const out: string[] = [];
  yield frame(19, { 'dp[m][n]': dp[m][n], i, j }, viz({ [`${m},${n}`]: 'active' }, i, j), `Độ dài LCS = dp[${m}][${n}] = ${dp[m][n]}. Giờ truy vết ngược từ góc dưới phải để dựng chuỗi.`);
  while (i > 0 && j > 0) {
    const cur = `${i},${j}`;
    if (a[i - 1] === b[j - 1]) {
      out.push(a[i - 1]);
      i--;
      j--;
      yield frame(21, { i, j, out: [...out].reverse().join('') }, viz({ [cur]: 'done', [`${i},${j}`]: 'active' }, i + 1, j + 1, out), `Khớp ⇒ ký tự '${out[out.length - 1]}' thuộc LCS, lùi chéo về (${i}, ${j}).`);
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
      yield frame(24, { i, j, 'dp[i][j]': dp[i][j] }, viz({ [cur]: 'muted', [`${i},${j}`]: 'active' }, i + 1, j), `Không khớp, giá trị đến từ ô trên ⇒ bỏ a[${i}]='${a[i]}', đi lên.`);
    } else {
      j--;
      yield frame(25, { i, j, 'dp[i][j]': dp[i][j] }, viz({ [cur]: 'muted', [`${i},${j}`]: 'active' }, i, j + 1), `Không khớp, giá trị đến từ ô trái ⇒ bỏ b[${j}]='${b[j]}', đi sang trái.`);
    }
  }
  const result = { length: dp[m][n], lcs: [...out].reverse().join('') };
  yield frame(27, result, viz({}, undefined, undefined, out), `Kết quả: LCS = "${result.lcs}" dài ${result.length}. Lưu ý LCS có thể không duy nhất, nhưng độ dài thì duy nhất.`);
  return result;
}
