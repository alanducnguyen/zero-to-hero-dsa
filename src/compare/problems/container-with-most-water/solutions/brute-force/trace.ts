import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { height: number[] }): Generator<Frame, number> {
  const height = input.height;
  const n = height.length;
  let best = 0;
  let bestPair: [number, number] | null = null;
  let pairs = 0;
  const viz = (i: number, j: number, hj: Highlight) =>
    arr(height, { mode: 'bars', highlights: { ...(bestPair ? { [bestPair[0]]: 'done', [bestPair[1]]: 'done' } : {}), [i]: 'pointer', [j]: hj }, pointers: [{ name: 'i', index: i }, { name: 'j', index: j }], ranges: [{ from: i, to: j, label: `rộng ${j - i}`, color: 'range' }] });
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      pairs++;
      const area = Math.min(height[i], height[j]) * (j - i);
      const better = area > best;
      if (better) { best = area; bestPair = [i, j]; }
      yield frame(6, { i, j, h: Math.min(height[i], height[j]), 'rộng': j - i, area, best, 'số cặp đã thử': pairs }, viz(i, j, better ? 'swap' : 'compare'),
        better ? `min(${height[i]}, ${height[j]}) × ${j - i} = ${area} > best cũ ⇒ best = ${area}.` : `Diện tích ${area} ≤ best = ${best}. Brute force vẫn phải thử – nó không rút ra được gì từ các cặp đã xem.`);
    }
  }
  yield frame(9, { best, 'số cặp đã thử': pairs, 'n(n−1)/2': (n * (n - 1)) / 2 }, n >= 2 && bestPair ? viz(bestPair[0], bestPair[1], 'done') : arr(height, { mode: 'bars' }), `best = ${best} sau đúng ${pairs} cặp = n(n−1)/2. n = 10⁵ ⇒ 5·10⁹ phép tính, quá chậm.`);
  return best;
}
