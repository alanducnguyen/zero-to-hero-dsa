import { frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { a: string; b: string }): Generator<Frame, number> {
  const { a, b } = input;
  const m = a.length;
  const n = b.length;
  const memo: (number | null)[][] = Array.from({ length: m + 1 }, (_, i) => new Array<number | null>(n + 1).fill(i === 0 ? 0 : null).map((v, j) => (j === 0 ? 0 : v)));
  const stack: string[] = [];
  let solved = 0;
  const viz = (hl: Record<string, Highlight> = {}) => matrix(memo, { title: 'memo[i][j] (trống = chưa giải; hàng/cột 0 là base case)', rowLabels: ['""', ...a.split('')], colLabels: ['""', ...b.split('')], highlights: hl });
  function* lcs(i: number, j: number): Generator<Frame, number> {
    if (i === 0 || j === 0) return 0;
    stack.push(`lcs(${i},${j})`);
    if (memo[i][j] !== null) {
      yield frame(8, { i, j, 'memo[i][j]': memo[i][j] }, viz({ [`${i},${j}`]: 'done' }), `lcs(${i},${j}) đã có trong memo = ${memo[i][j]} ⇒ trả O(1), cắt cả cây con mà bản đệ quy thuần phải tính lại.`, { callStack: [...stack] });
      stack.pop();
      return memo[i][j]!;
    }
    const match = a[i - 1] === b[j - 1];
    yield frame(9, { i, j, 'a[i-1]': a[i - 1], 'b[j-1]': b[j - 1] }, viz({ [`${i},${j}`]: 'active' }), match ? `Khớp '${a[i - 1]}' ⇒ chỉ cần lcs(${i - 1},${j - 1}) + 1.` : `'${a[i - 1]}' ≠ '${b[j - 1]}' ⇒ max của hai nhánh; nhưng giờ mỗi nhánh chỉ tính lần đầu.`, { callStack: [...stack] });
    const r = match ? (yield* lcs(i - 1, j - 1)) + 1 : Math.max(yield* lcs(i - 1, j), yield* lcs(i, j - 1));
    memo[i][j] = r;
    solved++;
    yield frame(10, { i, j, r }, viz({ [`${i},${j}`]: 'swap' }), `Lưu memo[${i}][${j}] = ${r}. Tối đa m·n = ${m * n} ô được giải ⇒ O(m·n).`, { callStack: [...stack] });
    stack.pop();
    return r;
  }
  const r = yield* lcs(m, n);
  yield frame(13, { 'kết quả': r, 'số bài con đã giải': solved }, viz(m && n ? { [`${m},${n}`]: 'done' } : {}), `LCS dài ${r}. Chỉ ${solved} bài con được giải – chỉ những ô thực sự cần (top-down có thể bỏ qua ô thừa), nhưng stack đệ quy sâu tới m + n.`);
  return r;
}
