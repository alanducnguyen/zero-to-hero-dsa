/** DFS đệ quy (flood fill): gặp ô đất ⇒ đảo mới, rồi "nhấn chìm" cả đảo. O(m·n) thời gian, O(m·n) call stack worst case. */
export function numIslands(input: number[][]): number {
  const grid = input.map((row) => row.map((v) => (v ? 1 : 0))); // bản sao: không sửa lưới của caller
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  const sink = (r: number, c: number): void => {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) return; // ngoài lưới / nước / đã chìm
    grid[r][c] = 0; // nhấn chìm = đánh dấu đã thăm
    sink(r + 1, c);
    sink(r - 1, c);
    sink(r, c + 1);
    sink(r, c - 1);
  };
  let count = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        count++; // ô đất chưa chìm ⇒ khởi đầu một đảo mới
        sink(r, c);
      }
    }
  }
  return count;
}
