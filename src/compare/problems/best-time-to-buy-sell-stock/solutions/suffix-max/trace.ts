import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { prices: number[] }): Generator<Frame, number> {
  const prices = [...input.prices];
  const n = prices.length;
  const sufMax = new Array<number>(n + 1).fill(-Infinity);
  const show = (x: number) => (x === -Infinity ? '−∞' : x);
  const view = (i: number, hl: Highlight) =>
    composite([
      arr(prices, { mode: 'bars', title: 'prices', highlights: i >= 0 && i < n ? { [i]: hl } : {}, pointers: i >= 0 && i < n ? [{ name: 'i', index: i }] : [] }),
      arr(sufMax.map(show), { mode: 'cells', title: 'sufMax (ô cuối = −∞ làm lính canh)', highlights: i >= 0 && i < n ? { [i]: hl, [i + 1]: 'visited' } : {} }),
    ]);
  yield frame(4, { n }, view(-1, 'active'),
    `Cấp mảng sufMax dài n + 1 = ${n + 1}, ô cuối −∞ làm lính canh để công thức sufMax[i] = max(sufMax[i+1], prices[i]) không cần if ở biên.`);
  for (let i = n - 1; i >= 0; i--) {
    sufMax[i] = Math.max(sufMax[i + 1], prices[i]);
    yield frame(5, { i, 'prices[i]': prices[i], 'sufMax[i]': sufMax[i] }, view(i, 'active'),
      `Duyệt NGƯỢC: sufMax[${i}] = max(${show(sufMax[i + 1])}, ${prices[i]}) = ${sufMax[i]} – giá bán cao nhất nếu đã mua ở ngày ${i} hoặc trước đó.`);
  }
  let best = 0;
  yield frame(6, { best }, view(-1, 'active'), 'Lượt 2: với mỗi ngày mua i, bán ở giá cao nhất phía sau là tối ưu cho ngày mua đó.');
  for (let i = 0; i < n; i++) {
    const p = sufMax[i] - prices[i];
    const better = p > best;
    best = Math.max(best, p);
    yield frame(7, { i, 'prices[i]': prices[i], 'sufMax[i]': sufMax[i], profit: p, best }, view(i, better ? 'done' : 'compare'),
      better
        ? `Mua ở ${prices[i]}, bán ở ${sufMax[i]} lời ${p} ⇒ kỷ lục mới best = ${best}.`
        : `Mua ở ${prices[i]} lời tối đa ${p} ≤ best = ${best}. sufMax[i] gồm cả prices[i] nên lời không bao giờ âm.`);
  }
  yield frame(8, { best, result: best }, view(-1, 'active'),
    `Kết quả ${best}. Hai lượt O(n) nhưng tốn thêm O(n) bộ nhớ – bước tiếp theo là nhận ra chỉ cần nhớ MIN phía trước thay vì MAX phía sau.`);
  return best;
}
