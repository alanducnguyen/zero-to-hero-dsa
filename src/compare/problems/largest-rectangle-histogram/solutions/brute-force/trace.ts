import { arr, composite, frame, hlRange, mapViz } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { heights: number[] }): Generator<Frame, number> {
  const h = input.heights;
  let best = 0, bestRange = '–';
  for (let i = 0; i < h.length; i++) {
    let minH = Infinity;
    for (let j = i; j < h.length; j++) {
      minH = Math.min(minH, h[j]);
      const area = minH * (j - i + 1);
      const better = area > best;
      if (better) { best = area; bestRange = `[${i}..${j}]`; }
      yield frame(8, { i, j, minH, area, best }, composite([
        arr(h, { mode: 'bars', highlights: { ...hlRange(i, j, 'range'), [j]: 'compare' }, pointers: [{ name: 'i', index: i }, { name: 'j', index: j }] }),
        mapViz({ minH, 'rộng': j - i + 1, area, best, 'tốt nhất': bestRange }, better ? { best: 'done' } : {}, 'Mọi cặp (i, j) – O(n²)'),
      ]), `Đoạn [${i}..${j}] cao tối đa ${minH} (cột thấp nhất chặn trần) × rộng ${j - i + 1} = ${area}${better ? ' ⇒ kỷ lục mới.' : '.'} Mở rộng j chỉ làm minH giảm hoặc giữ nguyên, nên giữ minH chạy là đủ – không cần quét lại.`);
    }
  }
  yield frame(11, { best }, arr(h, { mode: 'bars' }), `Đã thử ${(h.length * (h.length + 1)) / 2} đoạn. Đáp án ${best}. Đây là baseline: đúng hiển nhiên nhưng O(n²).`);
  return best;
}
