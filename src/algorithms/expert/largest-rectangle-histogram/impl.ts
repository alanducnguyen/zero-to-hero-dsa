/**
 * Largest Rectangle in Histogram – monotonic stack (stack tăng dần).
 * Với mỗi cột, tìm cột thấp hơn gần nhất bên trái và bên phải.
 * @param heights chiều cao các cột, rộng 1
 * @returns diện tích hình chữ nhật lớn nhất
 */
export function largestRectangleArea(heights: number[]): number {
  const n = heights.length;
  const stack: number[] = []; // chỉ số các cột, chiều cao tăng dần từ đáy lên đỉnh
  let best = 0;
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i]; // cột ảo cao 0 ở cuối để "xả" stack
    while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
      const top = stack.pop()!;
      const height = heights[top];
      const left = stack.length === 0 ? -1 : stack[stack.length - 1];
      const width = i - left - 1; // cột top mở rộng được từ left+1 tới i-1
      best = Math.max(best, height * width);
    }
    stack.push(i);
  }
  return best;
}
