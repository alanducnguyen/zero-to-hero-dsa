/**
 * Best Time to Buy and Sell Stock (LC 121) – một lượt duyệt, greedy kiểu Kadane.
 * Nếu bán vào ngày i thì nên mua ở giá thấp nhất trước đó ⇒ chỉ cần nhớ minPrice.
 * @param prices giá cổ phiếu theo từng ngày
 * @returns lợi nhuận lớn nhất với một lần mua và một lần bán (0 nếu không có lời)
 */
export function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let best = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i]; // đáy mới ⇒ mọi ngày bán sau này nên mua ở đây
    } else if (prices[i] - minPrice > best) {
      best = prices[i] - minPrice; // bán hôm nay lời hơn kỷ lục
    }
  }
  return best;
}
