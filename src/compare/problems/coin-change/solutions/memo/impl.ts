/** Đệ quy + memo (top-down DP): mỗi số tiền rem được giải đúng một lần. O(amount·k) thời gian. */
export function coinChange(coins: number[], amount: number): number {
  const memo = new Map<number, number>();
  const best = (rem: number): number => {
    if (rem === 0) return 0;
    if (memo.has(rem)) return memo.get(rem)!; // đã giải ⇒ trả ngay
    let min = Infinity;
    for (const c of coins) {
      if (c <= rem) min = Math.min(min, best(rem - c) + 1);
    }
    memo.set(rem, min);
    return min;
  };
  const r = best(amount);
  return r === Infinity ? -1 : r;
}
