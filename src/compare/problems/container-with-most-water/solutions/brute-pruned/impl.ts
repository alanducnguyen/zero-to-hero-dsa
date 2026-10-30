/** Brute force + cắt tỉa: cố định i, duyệt j từ xa về gần; diện tích ≤ height[i]·(j − i) nên dừng sớm. Worst case vẫn O(n²). */
export function maxArea(height: number[]): number {
  let best = 0;
  for (let i = 0; i < height.length; i++) {
    for (let j = height.length - 1; j > i; j--) {
      if (height[i] * (j - i) <= best) break; // cận trên không vượt best ⇒ j gần hơn càng không
      best = Math.max(best, Math.min(height[i], height[j]) * (j - i));
    }
  }
  return best;
}
