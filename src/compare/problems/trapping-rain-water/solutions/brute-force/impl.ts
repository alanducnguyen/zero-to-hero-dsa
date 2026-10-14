/** Brute force: với mỗi cột, quét trái và phải tìm tường cao nhất. O(n²), O(1). */
export function trap(height: number[]): number {
  let water = 0;
  for (let i = 0; i < height.length; i++) {
    let maxL = 0, maxR = 0;
    for (let j = 0; j <= i; j++) maxL = Math.max(maxL, height[j]); // tường cao nhất bên trái (gồm i)
    for (let j = i; j < height.length; j++) maxR = Math.max(maxR, height[j]); // bên phải
    water += Math.min(maxL, maxR) - height[i];
  }
  return water;
}
