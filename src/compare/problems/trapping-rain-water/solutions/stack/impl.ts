/** Monotonic stack: tính nước theo LỚP NGANG. Gặp cột cao hơn đỉnh ⇒ pop đáy hố, cộng (min(tường) − đáy) × khoảng cách. O(n), O(n). */
export function trap(height: number[]): number {
  const stack: number[] = []; // chỉ số, chiều cao giảm dần
  let water = 0;
  for (let i = 0; i < height.length; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const bottom = stack.pop()!; // đáy hố
      if (stack.length === 0) break; // không có tường trái ⇒ không đọng
      const left = stack[stack.length - 1];
      const width = i - left - 1;
      const level = Math.min(height[left], height[i]) - height[bottom];
      water += width * level; // một lớp nước nằm ngang
    }
    stack.push(i);
  }
  return water;
}
