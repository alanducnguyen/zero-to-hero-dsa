/**
 * Number of Islands – đếm thành phần liên thông trên lưới bằng DFS (flood fill).
 * '1' là đất, '0' là nước. Mỗi lần gặp đất chưa thăm ⇒ một đảo mới, nhấn chìm cả đảo.
 */
export function numIslands(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  const visited: boolean[][] = grid.map((row) => row.map(() => false));
  let count = 0;

  function sink(r: number, c: number): void {
    if (r < 0 || r >= m || c < 0 || c >= n) return; // ngoài lưới
    if (grid[r][c] === 0 || visited[r][c]) return; // nước hoặc đã thăm
    visited[r][c] = true;
    sink(r + 1, c);
    sink(r - 1, c);
    sink(r, c + 1);
    sink(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1 && !visited[r][c]) {
        count++; // đất chưa thăm ⇒ đảo mới
        sink(r, c); // đánh dấu toàn bộ đảo
      }
    }
  }
  return count;
}
