/** Hai con trỏ từ hai đầu, luôn dịch tường thấp hơn. O(n) thời gian, O(1) bộ nhớ. */
export function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let best = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    best = Math.max(best, area);
    if (height[left] < height[right]) left++; // tường thấp là nút cổ chai ⇒ loại nó
    else right--;
  }
  return best;
}
