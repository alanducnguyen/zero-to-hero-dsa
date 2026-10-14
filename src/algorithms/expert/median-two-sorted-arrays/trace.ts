import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { sortedPair, type MedianInput } from './node';

export function* trace(input: MedianInput): Generator<Frame, number | null> {
  let [A, B] = sortedPair(input);
  if (A.length + B.length === 0) {
    yield frame(6, {}, arr(['∅'], { title: 'Cả hai mảng rỗng' }), 'Không có phần tử nào ⇒ không có trung vị.');
    return null;
  }
  const swapped = A.length > B.length;
  if (swapped) [A, B] = [B, A];
  const m = A.length;
  const n = B.length;
  const half = Math.floor((m + n + 1) / 2);
  const fmt = (x: number) => (x === Infinity ? '+∞' : x === -Infinity ? '−∞' : String(x));
  const viz = (i?: number, j?: number, hl: { a?: Record<number, Highlight>; b?: Record<number, Highlight> } = {}) =>
    composite([
      arr(A.length ? A : ['∅'], { title: `A (ngắn hơn, m = ${m})${swapped ? ' – đã đổi chỗ với B' : ''}`, highlights: hl.a ?? {}, ranges: i !== undefined && i > 0 ? [{ from: 0, to: i - 1, label: `nửa trái: ${i} phần tử`, color: 'range' }] : [] }),
      arr(B.length ? B : ['∅'], { title: `B (n = ${n})`, highlights: hl.b ?? {}, ranges: j !== undefined && j > 0 ? [{ from: 0, to: j - 1, label: `nửa trái: ${j} phần tử`, color: 'range' }] : [] }),
    ]);
  yield frame(12, { m, n, half, 'tổng': m + n }, viz(), `Nhị phân trên mảng ngắn A (m = ${m}). Nửa trái của hợp hai mảng cần ${half} phần tử: lấy i từ A và j = ${half} − i từ B.`);
  let lo = 0;
  let hi = m;
  while (lo <= hi) {
    const i = Math.floor((lo + hi) / 2);
    const j = half - i;
    const Aleft = i > 0 ? A[i - 1] : -Infinity;
    const Aright = i < m ? A[i] : Infinity;
    const Bleft = j > 0 ? B[j - 1] : -Infinity;
    const Bright = j < n ? B[j] : Infinity;
    const hlA: Record<number, Highlight> = {};
    const hlB: Record<number, Highlight> = {};
    if (i > 0) hlA[i - 1] = 'compare';
    if (i < m) hlA[i] = 'pointer';
    if (j > 0) hlB[j - 1] = 'compare';
    if (j < n) hlB[j] = 'pointer';
    yield frame(21, { lo, hi, i, j, Aleft: fmt(Aleft), Aright: fmt(Aright), Bleft: fmt(Bleft), Bright: fmt(Bright) },
      composite([viz(i, j, { a: hlA, b: hlB }), mapViz({ 'A[i-1]': fmt(Aleft), 'A[i]': fmt(Aright), 'B[j-1]': fmt(Bleft), 'B[j]': fmt(Bright) }, {}, 'Bốn phần tử quanh điểm cắt (vàng = cuối nửa trái, xanh = đầu nửa phải)')]),
      `Thử cắt A tại i = ${i}, B tại j = ${j}. Cắt đúng khi mọi phần tử nửa trái ≤ nửa phải: A[i−1] ≤ B[j] và B[j−1] ≤ A[i].`);
    if (Aleft <= Bright && Bleft <= Aright) {
      const result = (m + n) % 2 === 1 ? Math.max(Aleft, Bleft) : (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
      yield frame((m + n) % 2 === 1 ? 24 : 25, { i, j, 'max trái': fmt(Math.max(Aleft, Bleft)), 'min phải': fmt(Math.min(Aright, Bright)), median: result },
        viz(i, j, { a: hlA, b: hlB }),
        (m + n) % 2 === 1 ? `Cắt đúng! Tổng ${m + n} lẻ ⇒ trung vị = max nửa trái = ${result}.` : `Cắt đúng! Tổng ${m + n} chẵn ⇒ trung vị = (max trái + min phải) / 2 = ${result}.`);
      return result;
    } else if (Aleft > Bright) {
      hi = i - 1;
      yield frame(26, { i, j, Aleft: fmt(Aleft), Bright: fmt(Bright), lo, hi }, viz(i, j, { a: { [i - 1]: 'swap' }, b: { [j]: 'swap' } }), `A[i−1] = ${fmt(Aleft)} > B[j] = ${fmt(Bright)} ⇒ lấy quá nhiều từ A, giảm i: hi = ${hi}.`);
    } else {
      lo = i + 1;
      yield frame(27, { i, j, Bleft: fmt(Bleft), Aright: fmt(Aright), lo, hi }, viz(i, j, { a: { [i]: 'swap' }, b: { [j - 1]: 'swap' } }), `B[j−1] = ${fmt(Bleft)} > A[i] = ${fmt(Aright)} ⇒ lấy quá ít từ A, tăng i: lo = ${lo}.`);
    }
  }
  return null;
}
