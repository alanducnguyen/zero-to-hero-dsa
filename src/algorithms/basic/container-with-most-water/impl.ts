/**
 * Container With Most Water – hai con trỏ ngược chiều.
 * Luôn dịch bức tường thấp hơn vào trong vì nó không thể tạo ra container tốt hơn.
 * @param height chiều cao các bức tường
 * @returns diện tích nước lớn nhất có thể chứa
 */
export function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let best = 0;
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    const area = h * (right - left);
    if (area > best) best = area;
    if (height[left] < height[right]) {
      left++; // tường trái thấp hơn ⇒ nó đã đạt container tốt nhất có thể
    } else {
      right--; // tường phải thấp hơn (hoặc bằng) ⇒ loại tường phải
    }
  }
  return best;
}
