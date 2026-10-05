export interface Item {
  weight: number;
  value: number;
}

/**
 * 0/1 Knapsack – mỗi món chọn hoặc không, tổng trọng lượng ≤ capacity, tối đa giá trị.
 * dp[i][w] = giá trị lớn nhất dùng i món đầu với sức chứa w.
 */
export function knapsack(items: Item[], capacity: number): number {
  const n = items.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    const { weight, value } = items[i - 1];
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w]; // không lấy món i
      if (weight <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weight] + value); // lấy món i
      }
    }
  }
  return dp[n][capacity];
}
