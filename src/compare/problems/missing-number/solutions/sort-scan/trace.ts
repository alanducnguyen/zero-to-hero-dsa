import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const sorted = [...input.nums].sort((a, b) => a - b);
  const n = sorted.length;
  const viz = (i: number | null, extra: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < (i ?? n); k++) h[k] = 'done';
    return arr(sorted, { mode: 'cells', title: 'sorted (bản sao đã sắp xếp)', highlights: { ...h, ...extra }, pointers: i !== null && i < n ? [{ name: 'i', index: i }] : [] });
  };
  yield frame(3, { n, sorted: `[${sorted.join(', ')}]` }, viz(0),
    `Sắp xếp bản sao (không phá input) – tốn O(n log n). Sau khi sort, nếu không thiếu gì thì sorted[i] phải đúng bằng i.`);
  for (let i = 0; i < n; i++) {
    const ok = sorted[i] === i;
    yield frame(5, { i, 'sorted[i]': sorted[i] }, viz(i, { [i]: ok ? 'compare' : 'swap' }),
      ok
        ? `sorted[${i}] = ${i} khớp chỉ số ⇒ số ${i} có mặt, đi tiếp.`
        : `sorted[${i}] = ${sorted[i]} ≠ ${i} ⇒ mọi số trước đều khớp, số ${i} bị "nhảy cóc" ⇒ ${i} là số thiếu.`);
    if (!ok) return i;
  }
  yield frame(7, { n, result: n }, viz(null),
    `Mọi ô đều khớp 0..${n - 1} ⇒ số thiếu là n = ${n}. Đây là case biên hay bị quên khi chỉ quét trong vòng lặp.`);
  return n;
}
