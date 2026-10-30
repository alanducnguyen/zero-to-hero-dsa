/** Chia để trị: hình lớn nhất hoặc trải hết đoạn (cao = cột thấp nhất), hoặc nằm hẳn bên trái/phải cột đó. O(n log n) TB, O(n²) xấu nhất. */
export function largestRectangleArea(heights: number[]): number {
  const solve = (lo: number, hi: number): number => {
    if (lo > hi) return 0;
    let m = lo;
    for (let k = lo + 1; k <= hi; k++) if (heights[k] < heights[m]) m = k; // cột thấp nhất
    const across = heights[m] * (hi - lo + 1); // trải hết đoạn [lo..hi]
    return Math.max(across, solve(lo, m - 1), solve(m + 1, hi));
  };
  return solve(0, heights.length - 1);
}
