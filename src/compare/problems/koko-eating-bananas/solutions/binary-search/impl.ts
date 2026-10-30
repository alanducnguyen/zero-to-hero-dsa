/** Binary search trên đáp án trong [1, max]: "kịp với tốc độ k" đơn điệu theo k. O(n · log max). */
export function minEatingSpeed(piles: number[], h: number): number {
  const hoursAt = (k: number) => piles.reduce((s, p) => s + Math.ceil(p / k), 0);
  let lo = 1;
  let hi = Math.max(...piles); // tốc độ max chắc chắn kịp
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (hoursAt(mid) <= h) hi = mid; // mid kịp ⇒ đáp án ≤ mid
    else lo = mid + 1; // mid không kịp ⇒ đáp án > mid
  }
  return lo;
}
