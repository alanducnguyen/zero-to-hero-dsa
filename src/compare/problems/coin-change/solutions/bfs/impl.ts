/** BFS trên đồ thị số tiền: đỉnh = tổng đã gom, cạnh = thêm một đồng. Tầng đầu tiên chạm amount = số đồng ít nhất. */
export function coinChange(coins: number[], amount: number): number {
  if (amount === 0) return 0;
  const seen = new Set<number>([0]);
  let level = [0];
  for (let steps = 1; level.length > 0; steps++) {
    const next: number[] = [];
    for (const cur of level) {
      for (const c of coins) {
        const s = cur + c;
        if (s === amount) return steps; // tầng nhỏ nhất chạm đích
        if (s > amount || seen.has(s)) continue;
        seen.add(s);
        next.push(s);
      }
    }
    level = next;
  }
  return -1;
}
