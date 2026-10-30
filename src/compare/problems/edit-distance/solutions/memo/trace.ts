import { frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { a: string; b: string }): Generator<Frame, number> {
  const { a, b } = input;
  const m = a.length;
  const n = b.length;
  const memo: (number | null)[][] = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 || j === 0 ? i + j : null)));
  const stack: string[] = [];
  let solved = 0;
  const viz = (hl: Record<string, Highlight> = {}) => matrix(memo, { title: 'memo[i][j] (trống = chưa giải; hàng/cột 0 là base case i + j)', rowLabels: ['""', ...a.split('')], colLabels: ['""', ...b.split('')], highlights: hl });
  function* d(i: number, j: number): Generator<Frame, number> {
    if (i === 0 || j === 0) return i + j;
    stack.push(`d(${i},${j})`);
    if (memo[i][j] !== null) {
      yield frame(8, { i, j, 'memo[i][j]': memo[i][j] }, viz({ [`${i},${j}`]: 'done' }), `d(${i},${j}) đã có = ${memo[i][j]} ⇒ trả O(1). Không có memo, chỗ này sẽ mở lại cả cây con phân nhánh 3.`, { callStack: [...stack] });
      stack.pop();
      return memo[i][j]!;
    }
    const match = a[i - 1] === b[j - 1];
    yield frame(9, { i, j, 'a[i-1]': a[i - 1], 'b[j-1]': b[j - 1] }, viz({ [`${i},${j}`]: 'active' }), match ? `Khớp '${a[i - 1]}' ⇒ d(${i},${j}) = d(${i - 1},${j - 1}), không tốn thao tác.` : `'${a[i - 1]}' ≠ '${b[j - 1]}' ⇒ 1 + min(thay, xoá, chèn); mỗi nhánh con chỉ tính ở lần gặp đầu.`, { callStack: [...stack] });
    const r = match ? yield* d(i - 1, j - 1) : 1 + Math.min(yield* d(i - 1, j - 1), yield* d(i - 1, j), yield* d(i, j - 1));
    memo[i][j] = r;
    solved++;
    yield frame(10, { i, j, r }, viz({ [`${i},${j}`]: 'swap' }), `Lưu memo[${i}][${j}] = ${r}. Tối đa m·n = ${m * n} ô ⇒ O(m·n).`, { callStack: [...stack] });
    stack.pop();
    return r;
  }
  const r = yield* d(m, n);
  yield frame(13, { 'kết quả': r, 'số bài con đã giải': solved }, viz(m && n ? { [`${m},${n}`]: 'done' } : {}), `Khoảng cách = ${r}, chỉ ${solved} bài con được giải. Vẫn O(m·n) bộ nhớ cộng stack đệ quy sâu m + n – với chuỗi 10⁴ ký tự sẽ tràn stack.`);
  return r;
}
