/** Brute force: cố định cột trái i, mở rộng j sang phải, giữ chiều cao nhỏ nhất. O(n²), O(1). */
export function largestRectangleArea(heights: number[]): number {
  let best = 0;
  for (let i = 0; i < heights.length; i++) {
    let minH = Infinity;
    for (let j = i; j < heights.length; j++) {
      minH = Math.min(minH, heights[j]); // chiều cao bị chặn bởi cột thấp nhất trong [i..j]
      best = Math.max(best, minH * (j - i + 1));
    }
  }
  return best;
}
