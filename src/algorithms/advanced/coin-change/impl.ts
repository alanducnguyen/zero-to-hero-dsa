/**
 * Coin Change – số đồng xu ít nhất để đủ amount (mỗi loại dùng không giới hạn).
 * dp[a] = số xu ít nhất tạo ra a; dp[a] = 1 + min(dp[a - coin]).
 * @returns số xu ít nhất, hoặc -1 nếu không thể
 */
export function coinChange(coins: number[], amount: number): number {
  const INF = Number.POSITIVE_INFINITY;
  const dp: number[] = new Array(amount + 1).fill(INF);
  dp[0] = 0; // 0 đồng cần 0 xu
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a && dp[a - coin] + 1 < dp[a]) {
        dp[a] = dp[a - coin] + 1; // dùng thêm 1 xu loại này
      }
    }
  }
  return dp[amount] === INF ? -1 : dp[amount];
}
