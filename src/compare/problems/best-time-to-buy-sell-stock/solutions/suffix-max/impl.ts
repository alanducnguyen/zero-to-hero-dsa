/** Mảng max hậu tố: sufMax[i] = giá cao nhất từ ngày i trở đi. O(n) thời gian, O(n) bộ nhớ. */
export function maxProfit(prices: number[]): number {
  const n = prices.length;
  const sufMax = new Array<number>(n + 1).fill(-Infinity);
  for (let i = n - 1; i >= 0; i--) sufMax[i] = Math.max(sufMax[i + 1], prices[i]);
  let best = 0;
  for (let i = 0; i < n; i++) best = Math.max(best, sufMax[i] - prices[i]);
  return best;
}
