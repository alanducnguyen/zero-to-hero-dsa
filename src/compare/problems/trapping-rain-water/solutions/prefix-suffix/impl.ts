/** Tiền tính maxLeft[i], maxRight[i] bằng hai lượt, rồi cộng. O(n) thời gian, O(n) bộ nhớ. */
export function trap(height: number[]): number {
  const n = height.length;
  if (n === 0) return 0;
  const maxLeft = new Array<number>(n);
  const maxRight = new Array<number>(n);
  maxLeft[0] = height[0];
  for (let i = 1; i < n; i++) maxLeft[i] = Math.max(maxLeft[i - 1], height[i]);
  maxRight[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) maxRight[i] = Math.max(maxRight[i + 1], height[i]);
  let water = 0;
  for (let i = 0; i < n; i++) water += Math.min(maxLeft[i], maxRight[i]) - height[i];
  return water;
}
