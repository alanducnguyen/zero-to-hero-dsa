/** Union-Find: mỗi ô đất là một tập; hợp với hàng xóm phải/dưới, mỗi lần hợp thành công bớt 1 đảo. Không sửa lưới. */
export function numIslands(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  const parent = Array.from({ length: m * n }, (_, i) => i); // ô (r, c) ↔ id r·n + c
  const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x]))); // nén đường đi
  let count = 0;
  for (const row of grid) for (const v of row) if (v) count++; // ban đầu mỗi ô đất là một đảo riêng
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (!grid[r][c]) continue;
      for (const [nr, nc] of [[r + 1, c], [r, c + 1]]) { // chỉ nhìn dưới/phải: mỗi cạnh xét đúng 1 lần
        if (nr >= m || nc >= n || !grid[nr][nc]) continue;
        const a = find(r * n + c);
        const b = find(nr * n + nc);
        if (a !== b) {
          parent[a] = b; // nối hai đảo thành một
          count--;
        }
      }
    }
  }
  return count;
}
