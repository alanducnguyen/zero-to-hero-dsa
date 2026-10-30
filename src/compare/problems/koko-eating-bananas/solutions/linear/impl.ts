/** Quét tuyến tính: thử k = 1, 2, … và trả về tốc độ đầu tiên ăn kịp. O(n · max) thời gian, O(1) bộ nhớ. */
export function minEatingSpeed(piles: number[], h: number): number {
  const max = Math.max(...piles);
  for (let k = 1; k < max; k++) {
    let hours = 0;
    for (const p of piles) hours += Math.ceil(p / k); // giờ lẻ vẫn tính trọn
    if (hours <= h) return k; // k đầu tiên kịp chính là nhỏ nhất
  }
  return max; // với k = max mỗi đống mất 1 giờ, n ≤ h nên luôn kịp
}
