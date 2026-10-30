import { frame, matrix } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { a: string; b: string }): Generator<Frame, number> {
  const { a, b } = input;
  const m = a.length;
  const n = b.length;
  const calls: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  const stack: string[] = [];
  let total = 0;
  const viz = (i?: number, j?: number) =>
    matrix(calls, { title: 'số lần gọi d(i, j) – ô > 1 là bài con bị tính lại', rowLabels: ['""', ...a.split('')], colLabels: ['""', ...b.split('')], highlights: i !== undefined ? { [`${i},${j}`]: calls[i][j!] > 1 ? 'swap' : 'active' } : {} });
  function* d(i: number, j: number): Generator<Frame, number> {
    stack.push(`d(${i},${j})`);
    calls[i][j]++;
    total++;
    const again = calls[i][j] > 1 ? ` Lần thứ ${calls[i][j]} gọi d(${i},${j}) – tính lại y hệt.` : '';
    let r: number;
    if (i === 0) {
      yield frame(4, { i, j, 'kết quả': j }, viz(i, j), `a đã hết ⇒ chỉ còn cách chèn ${j} ký tự của b.${again}`, { callStack: [...stack] });
      r = j;
    } else if (j === 0) {
      yield frame(5, { i, j, 'kết quả': i }, viz(i, j), `b đã hết ⇒ phải xoá ${i} ký tự còn lại của a.${again}`, { callStack: [...stack] });
      r = i;
    } else if (a[i - 1] === b[j - 1]) {
      yield frame(6, { i, j, 'a[i-1]': a[i - 1], 'b[j-1]': b[j - 1] }, viz(i, j), `'${a[i - 1]}' = '${b[j - 1]}' ⇒ giữ nguyên miễn phí; chỉ một nhánh d(${i - 1},${j - 1}).${again}`, { callStack: [...stack] });
      r = yield* d(i - 1, j - 1);
    } else {
      yield frame(7, { i, j, 'a[i-1]': a[i - 1], 'b[j-1]': b[j - 1] }, viz(i, j), `'${a[i - 1]}' ≠ '${b[j - 1]}' ⇒ không biết thao tác nào tốt nên thử cả 3 nhánh (thay, xoá, chèn) – phân nhánh 3 là lý do bùng nổ.${again}`, { callStack: [...stack] });
      r = 1 + Math.min(yield* d(i - 1, j - 1), yield* d(i - 1, j), yield* d(i, j - 1));
    }
    stack.pop();
    return r;
  }
  const r = yield* d(m, n);
  yield frame(9, { 'kết quả': r, 'tổng số lần gọi': total, 'số trạng thái khác nhau': (m + 1) * (n + 1) }, viz(), `Khoảng cách = ${r} nhưng tốn ${total} lời gọi cho chỉ ${(m + 1) * (n + 1)} trạng thái ⇒ thêm memo.`);
  return r;
}
