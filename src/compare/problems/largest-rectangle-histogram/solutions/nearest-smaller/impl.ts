/** Tìm cột thấp hơn gần nhất bên trái/phải của mỗi cột bằng monotonic stack (2 lượt), rồi tính diện tích. O(n), O(n). */
export function largestRectangleArea(heights: number[]): number {
  const n = heights.length;
  const left = new Array<number>(n).fill(-1); // chỉ số cột thấp hơn gần nhất bên trái
  const right = new Array<number>(n).fill(n); // chỉ số cột thấp hơn gần nhất bên phải
  const st: number[] = [];
  for (let i = 0; i < n; i++) {
    while (st.length && heights[st[st.length - 1]] >= heights[i]) st.pop();
    if (st.length) left[i] = st[st.length - 1];
    st.push(i);
  }
  st.length = 0;
  for (let i = n - 1; i >= 0; i--) {
    while (st.length && heights[st[st.length - 1]] >= heights[i]) st.pop();
    if (st.length) right[i] = st[st.length - 1];
    st.push(i);
  }
  let best = 0;
  for (let i = 0; i < n; i++) best = Math.max(best, heights[i] * (right[i] - left[i] - 1));
  return best;
}
