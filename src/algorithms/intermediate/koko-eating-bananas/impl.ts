/**
 * Koko Eating Bananas – binary search trên đáp án.
 * Vị từ "ăn hết trong h giờ với tốc độ k" đơn điệu theo k (false…false true…true)
 * ⇒ tìm k nhỏ nhất làm vị từ đúng bằng binary search trên khoảng [1, max(piles)].
 * @param piles số chuối của từng đống
 * @param h số giờ tối đa (giả định h ≥ piles.length)
 * @returns tốc độ nhỏ nhất (chuối/giờ) để ăn hết trong h giờ
 */
export function minEatingSpeed(piles: number[], h: number): number {
  let lo = 1;
  let hi = Math.max(1, ...piles); // tốc độ max(piles) luôn đủ: mỗi đống mất đúng 1 giờ
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    let hours = 0;
    for (const p of piles) hours += Math.ceil(p / mid); // đống p cần ceil(p/mid) giờ
    if (hours <= h) {
      hi = mid; // mid đủ nhanh ⇒ đáp án ≤ mid, vẫn giữ mid làm ứng viên
    } else {
      lo = mid + 1; // mid quá chậm ⇒ mọi tốc độ ≤ mid đều hỏng
    }
  }
  return lo;
}
