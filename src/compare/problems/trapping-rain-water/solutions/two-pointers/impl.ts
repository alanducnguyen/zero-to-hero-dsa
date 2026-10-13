/** Hai con trỏ: bên nào tường thấp hơn thì mức nước bên đó đã xác định bởi max của chính bên đó. O(n), O(1). */
export function trap(height: number[]): number {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left]; // bên phải chắc chắn có tường ≥ height[right] > height[left]
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}
