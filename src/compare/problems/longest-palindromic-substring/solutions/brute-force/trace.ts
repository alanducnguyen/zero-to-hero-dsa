import { arr, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { s: string }): Generator<Frame, string> {
  const s = input.s;
  const ch = [...s];
  let best = '', bi = 0, bj = -1;
  let checks = 0;
  const isPal = (i: number, j: number) => { while (i < j) if (s[i++] !== s[j--]) return false; return true; };
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (j - i + 1 <= best.length) continue; // trace bỏ qua đoạn không thể tốt hơn cho gọn
      checks++;
      const ok = isPal(i, j);
      if (ok) { best = s.slice(i, j + 1); bi = i; bj = j; }
      yield frame(6, { i, j, 'đoạn': s.slice(i, j + 1), palindrome: ok, best, 'số đoạn đã kiểm tra': checks }, arr(ch, { highlights: ok ? {} : { [i]: 'swap', [j]: 'swap' }, ranges: [{ from: i, to: j, label: `[${i}, ${j}]`, color: ok ? 'done' : 'compare' }, ...(bj >= bi ? [{ from: bi, to: bj, label: `best = "${best}"`, color: 'range' as const }] : [])] }), ok ? `"${s.slice(i, j + 1)}" là palindrome dài ${j - i + 1} ⇒ best mới.` : `"${s.slice(i, j + 1)}" không phải palindrome (kiểm tra O(n) từ hai đầu).`);
    }
  }
  yield frame(9, { best }, arr(ch, { ranges: bj >= bi ? [{ from: bi, to: bj, label: `best = "${best}"`, color: 'done' }] : [] }), `Kết quả "${best}". O(n²) đoạn × O(n) kiểm tra = O(n³).`);
  return best;
}
