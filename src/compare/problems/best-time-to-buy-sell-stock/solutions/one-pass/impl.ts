/** Một lượt: nhớ giá thấp nhất đã thấy, thử bán ở mỗi ngày. O(n) thời gian, O(1) bộ nhớ. */
export function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let best = 0;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p);
    best = Math.max(best, p - minPrice);
  }
  return best;
}
