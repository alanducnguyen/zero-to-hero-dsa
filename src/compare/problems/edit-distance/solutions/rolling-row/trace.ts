import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { a: string; b: string }): Generator<Frame, number> {
  const [s, t] = input.a.length >= input.b.length ? [input.a, input.b] : [input.b, input.a];
  const row = Array.from({ length: t.length + 1 }, (_, j) => j);
  const viz = (i: number, prev: number | string, hl: Record<number, Highlight> = {}, j?: number) =>
    composite([
      arr(row, { title: `row (nhãn = j; t = "${t}") – ô < j đã là hàng ${i}, ô ≥ j vẫn là hàng ${i - 1}`, highlights: hl, pointers: j !== undefined ? [{ name: 'j', index: j }] : [] }),
      arr([prev], { title: 'prev = ô chéo dp[i-1][j-1]', highlights: { 0: 'pointer' } }),
    ]);
  yield frame(4, { s, t }, viz(1, '—'), `${input.a.length >= input.b.length ? '' : 'Đổi chỗ (edit distance đối xứng) để '}chuỗi ngắn "${t}" làm cột ⇒ chỉ ${t.length + 1} ô. Hàng 0: dp[0][j] = j phép chèn.`);
  for (let i = 1; i <= s.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= t.length; j++) {
      const up = row[j];
      const match = s[i - 1] === t[j - 1];
      const diag = prev;
      row[j] = match ? prev : 1 + Math.min(prev, up, row[j - 1]);
      prev = up;
      yield frame(10, { i, j, 's[i-1]': s[i - 1], 't[j-1]': t[j - 1], chéo: diag, trên: up, trái: row[j - 1], 'row[j]': row[j] }, viz(i, prev, { [j]: match ? 'done' : 'swap', [j - 1]: 'compare' }, j),
        match
          ? `Khớp '${t[j - 1]}' ⇒ row[${j}] = ô chéo = ${diag}. Ô chéo đã bị ghi đè trong row nên phải giữ riêng trong prev.`
          : `Không khớp ⇒ 1 + min(chéo=${diag}, trên=${up} (row[${j}] cũ), trái=${row[j - 1]} (row[${j - 1}] mới)) = ${row[j]}. prev ← ${up} để làm ô chéo cho j = ${j + 1}.`);
    }
  }
  yield frame(14, { 'kết quả': row[t.length] }, viz(s.length + 1, '—', { [t.length]: 'done' }), `Khoảng cách = ${row[t.length]} chỉ với ${t.length + 1} ô + 1 biến. Mất bảng nên không in được dãy thao tác – cần Hirschberg nếu muốn cả hai.`);
  return row[t.length];
}
