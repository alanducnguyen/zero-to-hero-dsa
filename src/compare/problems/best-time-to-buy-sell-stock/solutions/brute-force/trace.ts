import { arr, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { prices: number[] }): Generator<Frame, number> {
  const prices = [...input.prices];
  const n = prices.length;
  let best = 0;
  let bi = -1;
  let bj = -1;
  let pairs = 0;
  const viz = (i: number, j: number) =>
    arr(prices, {
      mode: 'bars',
      highlights: i >= 0 ? { [i]: 'pointer', [j]: 'compare' } : {},
      pointers: i >= 0 ? [{ name: 'mua', index: i }, { name: 'bán', index: j }] : [],
      ranges: bi >= 0 ? [{ from: bi, to: bj, label: `tốt nhất: ${best}`, color: 'range' }] : [],
    });
  yield frame(3, { best }, viz(-1, -1), 'best = 0: không giao dịch thì lời 0, nên đáp án không bao giờ âm.');
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      pairs++;
      const p = prices[j] - prices[i];
      const better = p > best;
      if (better) { best = p; bi = i; bj = j; }
      yield frame(6, { i, j, 'prices[j]−prices[i]': p, best, 'số cặp đã thử': pairs }, viz(i, j),
        better
          ? `Mua ngày ${i} (${prices[i]}), bán ngày ${j} (${prices[j]}) lời ${p} > kỷ lục ⇒ best = ${best}.`
          : `Lời ${p} ≤ best = ${best}. Brute force vẫn phải thử hết n(n−1)/2 = ${(n * (n - 1)) / 2} cặp vì không biết trước cặp nào tốt.`);
    }
  }
  yield frame(9, { best, result: best }, viz(-1, -1), `Thử xong ${pairs} cặp ⇒ lợi nhuận lớn nhất = ${best}.`);
  return best;
}
