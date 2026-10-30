/**
 * Rotting Oranges (LeetCode 994) – multi-source BFS theo tầng.
 * Ô 0 trống, 1 cam tươi, 2 cam thối. Mỗi phút, cam thối làm thối cam tươi kề 4 hướng.
 * @returns số phút ít nhất để không còn cam tươi, hoặc -1 nếu không thể
 */
export function orangesRotting(grid: number[][]): number {
  const g = grid.map((row) => [...row]); // không sửa input
  const m = g.length;
  const n = g[0]?.length ?? 0;
  const queue: [number, number][] = [];
  let fresh = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (g[r][c] === 2) queue.push([r, c]); // mọi nguồn vào queue cùng lúc (phút 0)
      else if (g[r][c] === 1) fresh++;
    }
  }
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let minutes = 0;
  let head = 0;
  while (head < queue.length && fresh > 0) {
    const size = queue.length - head; // số cam thối của tầng (phút) hiện tại
    for (let i = 0; i < size; i++) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || g[nr][nc] !== 1) continue;
        g[nr][nc] = 2; // đánh dấu ngay khi đẩy vào ⇒ không bị đẩy 2 lần
        fresh--;
        queue.push([nr, nc]);
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}
