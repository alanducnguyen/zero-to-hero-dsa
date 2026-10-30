/**
 * Unique Paths II (LeetCode 63) – DP trên lưới có vật cản.
 * Robot đi từ góc trên-trái tới góc dưới-phải, mỗi bước chỉ sang PHẢI hoặc XUỐNG.
 * @param grid lưới m×n, 0 = ô trống, 1 = vật cản
 * @returns số đường đi khác nhau (0 nếu không có đường)
 */
export function uniquePathsWithObstacles(grid: number[][]): number {
  const m = grid.length;
  const n = m > 0 ? grid[0].length : 0;
  if (m === 0 || n === 0) return 0;
  const dp: number[][] = Array.from({ length: m }, () => new Array<number>(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) dp[r][c] = 0; // vật cản: không đường nào đi qua
      else if (r === 0 && c === 0) dp[r][c] = 1; // ô xuất phát
      else {
        const top = r > 0 ? dp[r - 1][c] : 0; // tới từ ô phía trên
        const left = c > 0 ? dp[r][c - 1] : 0; // tới từ ô bên trái
        dp[r][c] = top + left;
      }
    }
  }
  return dp[m - 1][n - 1];
}
