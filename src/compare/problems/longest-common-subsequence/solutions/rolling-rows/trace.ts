import { frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { a: string; b: string }): Generator<Frame, number> {
  const [s, t] = input.a.length >= input.b.length ? [input.a, input.b] : [input.b, input.a];
  let prev = new Array<number>(t.length + 1).fill(0);
  let cur: (number | null)[] = new Array<number | null>(t.length + 1).fill(null);
  const viz = (i: number, hl: Record<string, Highlight> = {}) =>
    matrix([prev, cur], { title: `chỉ 2 hàng × ${t.length + 1} cột (thay vì ${s.length + 1} hàng)`, rowLabels: [`prev (i=${i - 1})`, `cur (i=${i}${i >= 1 && i <= s.length ? ` '${s[i - 1]}'` : ''})`], colLabels: ['""', ...t.split('')], highlights: hl });
  yield frame(4, { s, t }, viz(1), input.a.length >= input.b.length ? `Cột theo chuỗi ngắn hơn "${t}" ⇒ mỗi hàng chỉ ${t.length + 1} ô. prev = hàng 0 toàn 0.` : `Đổi chỗ để chuỗi ngắn "${t}" làm cột ⇒ bộ nhớ O(min(m,n)). LCS đối xứng nên đổi chỗ không đổi kết quả.`);
  for (let i = 1; i <= s.length; i++) {
    const row = new Array<number>(t.length + 1).fill(0);
    cur = row;
    for (let j = 1; j <= t.length; j++) {
      const match = s[i - 1] === t[j - 1];
      row[j] = match ? prev[j - 1] + 1 : Math.max(prev[j], row[j - 1]);
      yield frame(8, { i, j, 's[i-1]': s[i - 1], 't[j-1]': t[j - 1], 'cur[j]': row[j] },
        viz(i, match ? { [`1,${j}`]: 'done', [`0,${j - 1}`]: 'range' } : { [`1,${j}`]: 'swap', [`0,${j}`]: 'compare', [`1,${j - 1}`]: 'compare' }),
        match ? `Khớp ⇒ ô chéo prev[${j - 1}] + 1 = ${row[j]}. Ô chéo nằm ở hàng prev nên vẫn còn nguyên.` : `Không khớp ⇒ max(prev[${j}]=${prev[j]}, cur[${j - 1}]=${row[j - 1]}) = ${row[j]}. Trên = prev, trái = cur: đủ dữ liệu chỉ với 2 hàng.`);
    }
    prev = row;
    cur = new Array<number | null>(t.length + 1).fill(null);
    yield frame(10, { i }, viz(i + 1), `Hàng ${i} xong ⇒ thành prev; hàng ${i - 1} bị bỏ đi vĩnh viễn – vì vậy không thể truy vết ngược để in chuỗi LCS.`);
  }
  yield frame(12, { 'kết quả': prev[t.length] }, viz(s.length + 1, { [`0,${t.length}`]: 'done' }), `LCS dài ${prev[t.length]} với O(min(m,n)) bộ nhớ. Muốn cả chuỗi mà vẫn bộ nhớ tuyến tính ⇒ Hirschberg (chia để trị).`);
  return prev[t.length];
}
