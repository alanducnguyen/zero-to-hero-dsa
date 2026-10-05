/**
 * BFS trên lưới – đường đi ngắn nhất từ (0,0) tới (m-1,n-1).
 * Ô 0 là đường đi, ô 1 là tường. Di chuyển 4 hướng.
 * @returns số bước ít nhất, hoặc -1 nếu không tới được
 */
export function shortestPathGrid(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  if (m === 0 || n === 0 || grid[0][0] === 1 || grid[m - 1][n - 1] === 1) return -1;
  const dist: number[][] = grid.map((row) => row.map(() => -1)); // -1 = chưa thăm
  const queue: [number, number][] = [[0, 0]];
  dist[0][0] = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let head = 0;
  while (head < queue.length) {
    const [r, c] = queue[head++]; // dequeue O(1) bằng con trỏ head
    if (r === m - 1 && c === n - 1) return dist[r][c];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue; // ra ngoài lưới
      if (grid[nr][nc] === 1 || dist[nr][nc] !== -1) continue; // tường hoặc đã thăm
      dist[nr][nc] = dist[r][c] + 1;
      queue.push([nr, nc]);
    }
  }
  return -1;
}
