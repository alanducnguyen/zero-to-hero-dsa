import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { height: number[] }): Generator<Frame, number> {
  const height = input.height;
  const n = height.length;
  let best = 0;
  let bestPair: [number, number] | null = null;
  let pairs = 0;
  let skipped = 0;
  const viz = (i: number, j: number, hj: Highlight) => {
    const h: Record<number, Highlight> = bestPair ? { [bestPair[0]]: 'done', [bestPair[1]]: 'done' } : {};
    for (let k = i + 1; k < j && hj === 'muted'; k++) h[k] = 'muted';
    h[i] = 'pointer';
    h[j] = hj;
    return arr(height, { mode: 'bars', highlights: h, pointers: [{ name: 'i', index: i }, { name: 'j', index: j }], ranges: [{ from: i, to: j, label: `cận trên ${height[i]}×${j - i}`, color: 'range' }] });
  };
  for (let i = 0; i < n; i++) {
    for (let j = n - 1; j > i; j--) {
      const bound = height[i] * (j - i);
      if (bound <= best) {
        skipped += j - i;
        yield frame(6, { i, j, 'cận trên': bound, best, 'cặp bị cắt': skipped }, viz(i, j, 'muted'),
          `height[${i}] × ${j - i} = ${bound} ≤ best = ${best}: dù tường j cao bao nhiêu, nước cũng không vượt height[${i}], và j càng gần thì càng hẹp ⇒ bỏ ${j - i} cặp còn lại của i.`);
        break;
      }
      pairs++;
      const area = Math.min(height[i], height[j]) * (j - i);
      const better = area > best;
      if (better) { best = area; bestPair = [i, j]; }
      yield frame(7, { i, j, 'cận trên': bound, area, best, 'số cặp đã tính': pairs }, viz(i, j, better ? 'swap' : 'compare'),
        better ? `Cận trên ${bound} > best ⇒ đáng tính: ${area} ⇒ best = ${area}.` : `Cận trên ${bound} > best nên phải tính, nhưng ${area} không hơn (tường j thấp hơn ${height[i]}).`);
    }
  }
  yield frame(10, { best, 'số cặp đã tính': pairs, 'cặp bị cắt': skipped, 'n(n−1)/2': (n * (n - 1)) / 2 }, n >= 2 && bestPair ? viz(bestPair[0], bestPair[1], 'done') : arr(height, { mode: 'bars' }),
    `best = ${best}, chỉ tính ${pairs}/${(n * (n - 1)) / 2} cặp. Cắt tỉa phụ thuộc dữ liệu: mảng giảm dần (tường trái cao, tường phải thấp) cắt rất ít ⇒ worst case vẫn Θ(n²).`);
  return best;
}
