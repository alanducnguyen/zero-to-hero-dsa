/** Binary search với cận chặt: lo = ⌈sum/h⌉, hi = min(max, ⌈sum/(h−n)⌉). Cùng O(n · log max) ở worst case. */
export function minEatingSpeed(piles: number[], h: number): number {
  const n = piles.length;
  const sum = piles.reduce((a, b) => a + b, 0);
  const hoursAt = (k: number) => piles.reduce((s, p) => s + Math.ceil(p / k), 0);
  let lo = Math.max(1, Math.ceil(sum / h)); // ăn liên tục cũng cần ≥ sum/h mỗi giờ
  let hi = Math.max(...piles);
  if (h > n) hi = Math.min(hi, Math.ceil(sum / (h - n))); // giờ ≤ sum/k + n ≤ h
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (hoursAt(mid) <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
