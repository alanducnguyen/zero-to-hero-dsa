/**
 * Pacific Atlantic Water Flow (LeetCode 417) – tư duy ngược: BFS "lên dốc" từ bờ mỗi đại dương.
 * Nước chảy từ ô sang ô kề có độ cao ≤. Pacific ở mép trên + trái, Atlantic ở mép dưới + phải.
 * @param heights lưới độ cao m × n
 * @returns các ô [r, c] chảy được ra CẢ HAI đại dương, theo thứ tự hàng rồi cột
 */
export function pacificAtlantic(heights: number[][]): number[][] {
  const m = heights.length;
  const n = heights[0]?.length ?? 0;
  if (m === 0 || n === 0) return [];
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const bfs = (starts: [number, number][]): boolean[][] => {
    const seen = heights.map((row) => row.map(() => false));
    const queue: [number, number][] = [];
    for (const [r, c] of starts) {
      if (seen[r][c]) continue; // góc thuộc cả hai mép ⇒ chỉ đẩy một lần
      seen[r][c] = true;
      queue.push([r, c]);
    }
    let head = 0;
    while (head < queue.length) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc]) continue;
        if (heights[nr][nc] < heights[r][c]) continue; // chỉ đi ngược "lên dốc"
        seen[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }
    return seen;
  };
  const pacStarts: [number, number][] = [];
  const atlStarts: [number, number][] = [];
  for (let r = 0; r < m; r++) {
    pacStarts.push([r, 0]);
    atlStarts.push([r, n - 1]);
  }
  for (let c = 0; c < n; c++) {
    pacStarts.push([0, c]);
    atlStarts.push([m - 1, c]);
  }
  const pac = bfs(pacStarts);
  const atl = bfs(atlStarts);
  const result: number[][] = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r][c] && atl[r][c]) result.push([r, c]); // giao của hai tập
    }
  }
  return result;
}
