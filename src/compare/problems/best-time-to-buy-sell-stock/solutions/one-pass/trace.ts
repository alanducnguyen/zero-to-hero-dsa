import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight, Pointer } from '@/engine/types';

export function* trace(input: { prices: number[] }): Generator<Frame, number> {
  const prices = [...input.prices];
  const n = prices.length;
  let minIdx = -1;
  let buy = -1;
  let sell = -1;
  const viz = (i: number) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < Math.min(i, n); k++) h[k] = 'visited';
    if (buy >= 0) { h[buy] = 'done'; h[sell] = 'done'; }
    if (minIdx >= 0) h[minIdx] = 'active';
    if (i < n) h[i] = 'compare';
    const pointers: Pointer[] = [];
    if (i < n) pointers.push({ name: 'p', index: i });
    if (minIdx >= 0) pointers.push({ name: 'min', index: minIdx });
    return arr(prices, { mode: 'bars', highlights: h, pointers, ranges: buy >= 0 ? [{ from: buy, to: sell, label: `mua ${prices[buy]} → bán ${prices[sell]}`, color: 'range' }] : [] });
  };
  const fmt = (x: number) => (x === Infinity ? '∞' : x);
  let minPrice = Infinity;
  let best = 0;
  yield frame(4, { minPrice: '∞', best }, viz(0),
    'minPrice = ∞, best = 0. Greedy: nếu bán ở ngày i thì tốt nhất là đã mua ở giá thấp nhất TRƯỚC (hoặc tại) ngày i – chỉ cần nhớ đúng một số.');
  for (let i = 0; i < n; i++) {
    const p = prices[i];
    if (p < minPrice) minIdx = i;
    minPrice = Math.min(minPrice, p);
    yield frame(6, { p, minPrice, best }, viz(i),
      minIdx === i
        ? `Giá ${p} là đáy mới ⇒ minPrice = ${p}. Mọi ngày bán phía sau mua ở đây đều lời hơn mua ở đáy cũ.`
        : `Giá ${p} ≥ đáy ${minPrice} ⇒ giữ đáy cũ.`);
    const profit = p - minPrice;
    if (profit > best) { best = profit; buy = minIdx; sell = i; }
    yield frame(7, { p, minPrice, profit, best }, viz(i),
      profit === best && profit > 0 && sell === i
        ? `Bán hôm nay lời ${p} − ${minPrice} = ${profit} ⇒ kỷ lục mới best = ${best}.`
        : `Bán hôm nay lời ${profit} ≤ best = ${best} ⇒ giữ nguyên. Cập nhật min TRƯỚC rồi mới tính lời nên không bao giờ "bán trước khi mua".`);
  }
  yield frame(9, { minPrice: fmt(minPrice), best, result: best }, viz(n),
    `Duyệt xong một lượt: lợi nhuận lớn nhất = ${best}. O(n) thời gian, O(1) bộ nhớ – không cần mảng phụ như sufMax.`);
  return best;
}
