/** Đệ quy thuần: best(rem) = 1 + min best(rem − c) với mọi đồng c ≤ rem. Hàm mũ vì bài con bị tính lại. */
export function coinChange(coins: number[], amount: number): number {
  const best = (rem: number): number => {
    if (rem === 0) return 0; // đủ tiền, không cần thêm đồng nào
    let min = Infinity;
    for (const c of coins) {
      if (c <= rem) min = Math.min(min, best(rem - c) + 1); // thử c làm đồng cuối
    }
    return min; // Infinity = không thể đổi
  };
  const r = best(amount);
  return r === Infinity ? -1 : r;
}
