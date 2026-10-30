/** BFS bằng hàng đợi: lan từng lớp, không đệ quy nên không lo tràn call stack. O(m·n) thời gian. */
export function numIslands(input: number[][]): number {
  const grid = input.map((row) => row.map((v) => (v ? 1 : 0))); // bản sao: không sửa lưới của caller
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let count = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 0) continue;
      count++;
      grid[r][c] = 0; // đánh dấu NGAY khi vào queue, tránh một ô bị đưa vào nhiều lần
      const queue: [number, number][] = [[r, c]];
      for (let head = 0; head < queue.length; head++) {
        const [cr, cc] = queue[head]; // dequeue bằng con trỏ head: O(1), không dùng shift()
        for (const [dr, dc] of dirs) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] === 0) continue;
          grid[nr][nc] = 0;
          queue.push([nr, nc]);
        }
      }
    }
  }
  return count;
}
