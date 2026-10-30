/** Một lượt monotonic stack tăng dần: khi cột i không cao hơn đỉnh, đỉnh đã biết cả hai biên ⇒ chốt diện tích. O(n), O(n). */
export function largestRectangleArea(heights: number[]): number {
  const st: number[] = []; // chỉ số, chiều cao tăng dần
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i]; // cột ảo cao 0 ở cuối để xả stack
    while (st.length && heights[st[st.length - 1]] >= h) {
      const top = st.pop()!;
      const left = st.length ? st[st.length - 1] : -1; // biên trái = phần tử ngay dưới trong stack
      best = Math.max(best, heights[top] * (i - left - 1));
    }
    st.push(i);
  }
  return best;
}
