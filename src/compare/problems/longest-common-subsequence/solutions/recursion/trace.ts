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
    matrix(calls, { title: 'số lần gọi lcs(i, j) – ô > 1 là bài con bị tính lại', rowLabels: ['""', ...a.split('')], colLabels: ['""', ...b.split('')], highlights: i !== undefined ? { [`${i},${j}`]: calls[i][j!] > 1 ? 'swap' : 'active' } : {} });
  function* lcs(i: number, j: number): Generator<Frame, number> {
    stack.push(`lcs(${i},${j})`);
    calls[i][j]++;
    total++;
    const again = calls[i][j] > 1 ? ` Đây là lần thứ ${calls[i][j]} gọi lcs(${i},${j}) – kết quả y hệt nhưng vẫn tính lại.` : '';
    let r: number;
    if (i === 0 || j === 0) {
      yield frame(4, { i, j, 'kết quả': 0 }, viz(i, j), `Tiền tố rỗng ⇒ LCS = 0. Đây là đáy của cây đệ quy.${again}`, { callStack: [...stack] });
      r = 0;
    } else if (a[i - 1] === b[j - 1]) {
      yield frame(5, { i, j, 'a[i-1]': a[i - 1], 'b[j-1]': b[j - 1] }, viz(i, j), `'${a[i - 1]}' = '${b[j - 1]}' ⇒ ghép cặp này luôn an toàn (đổi chỗ lập luận), chỉ cần một nhánh lcs(${i - 1},${j - 1}).${again}`, { callStack: [...stack] });
      r = (yield* lcs(i - 1, j - 1)) + 1;
    } else {
      yield frame(6, { i, j, 'a[i-1]': a[i - 1], 'b[j-1]': b[j - 1] }, viz(i, j), `'${a[i - 1]}' ≠ '${b[j - 1]}' ⇒ ít nhất một ký tự không nằm trong LCS; không biết bên nào nên phải thử CẢ HAI nhánh – nguồn gốc hàm mũ.${again}`, { callStack: [...stack] });
      r = Math.max(yield* lcs(i - 1, j), yield* lcs(i, j - 1));
    }
    stack.pop();
    return r;
  }
  const r = yield* lcs(m, n);
  yield frame(8, { 'kết quả': r, 'tổng số lần gọi': total, 'số trạng thái khác nhau': (m + 1) * (n + 1) }, viz(), `LCS dài ${r} nhưng tốn ${total} lời gọi cho chỉ ${(m + 1) * (n + 1)} trạng thái (i, j) ⇒ cần memo.`);
  return r;
}
