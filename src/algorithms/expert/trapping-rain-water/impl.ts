/**
 * Trapping Rain Water – lượng nước đọng giữa các cột độ cao height[].
 * Nước tại cột i = min(maxTrái, maxPhải) − height[i]. Hai con trỏ từ hai đầu:
 * bên nào có max nhỏ hơn thì bên đó đã biết chắc mức nước ⇒ tính và tiến vào trong. O(n), O(1).
 */
export function trap(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0; // cột cao nhất đã thấy từ trái tới left
  let rightMax = 0; // cột cao nhất đã thấy từ phải tới right
  let water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      // leftMax ≤ rightMax (bất biến) ⇒ mức nước tại left do leftMax quyết định
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}
