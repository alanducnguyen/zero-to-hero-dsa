/** Brute force: thử mọi cặp (mua i, bán j) với i < j. O(n²) thời gian, O(1) bộ nhớ. */
export function maxProfit(prices: number[]): number {
  let best = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      best = Math.max(best, prices[j] - prices[i]);
    }
  }
  return best;
}
