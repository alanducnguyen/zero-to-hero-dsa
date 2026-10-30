import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight, Pointer } from '@/engine/types';

export function* trace(input: { prices: number[] }): Generator<Frame, number> {
  const prices = [...input.prices];
  const n = prices.length;
  let minIdx = -1;
  let buy = -1;
  let sell = -1;
  const viz = (i: number, extra: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < Math.min(i, n); k++) h[k] = 'visited';
    if (buy >= 0) { h[buy] = 'done'; h[sell] = 'done'; }
    if (minIdx >= 0) h[minIdx] = 'active';
    const pointers: Pointer[] = [];
    if (i < n) pointers.push({ name: 'i', index: i });
    if (minIdx >= 0) pointers.push({ name: 'min', index: minIdx });
    return arr(prices, {
      mode: 'bars',
      highlights: { ...h, ...extra },
      pointers,
      ranges: buy >= 0 ? [{ from: buy, to: sell, label: `mua ${prices[buy]} → bán ${prices[sell]}`, color: 'range' }] : [],
    });
  };
  const fmt = (x: number) => (x === Infinity ? '∞' : x);
  let minPrice = Infinity;
  let best = 0;
  yield frame(9, { minPrice: fmt(minPrice), best }, viz(0),
    'minPrice = ∞ (chưa thấy ngày nào), best = 0 (không giao dịch thì lời 0). Ý tưởng greedy: nếu bán ở ngày i thì tốt nhất là đã mua ở giá thấp nhất TRƯỚC ngày i.');
  for (let i = 0; i < n; i++) {
    yield frame(11, { i, 'prices[i]': prices[i], minPrice: fmt(minPrice), best }, viz(i, { [i]: 'compare' }),
      `Ngày ${i}, giá ${prices[i]}. So với đáy hiện tại ${fmt(minPrice)}: nếu thấp hơn thì đây là ngày mua tốt hơn cho mọi ngày bán phía sau.`);
    if (prices[i] < minPrice) {
      minPrice = prices[i];
      minIdx = i;
      yield frame(12, { i, minPrice, best }, viz(i),
        `Đáy mới minPrice = ${minPrice}. Bán ngay hôm nay lời 0 nên không cần thử cập nhật best. Giống Kadane: "bắt đầu lại" từ điểm tốt hơn thay vì giữ điểm mua cũ.`);
    } else {
      const profit = prices[i] - minPrice;
      if (profit > best) {
        best = profit;
        buy = minIdx;
        sell = i;
        yield frame(14, { i, minPrice, profit, best }, viz(i),
          `Bán hôm nay lời ${prices[i]} − ${minPrice} = ${profit} > kỷ lục cũ ⇒ best = ${best} (mua ngày ${buy}, bán ngày ${sell}).`);
      } else {
        yield frame(13, { i, minPrice, profit, best }, viz(i, { [i]: 'compare' }),
          `Bán hôm nay chỉ lời ${profit} ≤ best = ${best} ⇒ giữ nguyên. Không cần nhớ ngày này vì nó không phải đáy và không phá kỷ lục.`);
      }
    }
  }
  yield frame(17, { minPrice: fmt(minPrice), best, result: best }, viz(n),
    best > 0
      ? `Duyệt xong: lợi nhuận lớn nhất = ${best} (mua ngày ${buy}, bán ngày ${sell}). Một lượt O(n), bộ nhớ O(1).`
      : 'Duyệt xong: giá không bao giờ tăng sau một đáy ⇒ không giao dịch, lợi nhuận 0.');
  return best;
}
