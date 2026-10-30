/**
 * Word Search (LeetCode 79) – DFS quay lui (backtracking) trên lưới ký tự.
 * board: mỗi phần tử là một hàng, vd ["ABCE", "SFCS", "ADEE"].
 * Ô đang nằm trên đường đi được đánh dấu '#' ngay trên lưới (thay cho visited),
 * và được khôi phục khi quay lui để các đường đi khác còn dùng được.
 */
export function exist(board: string[], word: string): boolean {
  const grid = board.map((row) => row.split(''));
  const m = grid.length;
  if (word.length === 0) return true;

  function dfs(r: number, c: number, i: number): boolean {
    if (i === word.length) return true; // đã khớp đủ mọi ký tự
    if (r < 0 || r >= m || c < 0 || c >= grid[r].length) return false; // ngoài lưới
    if (grid[r][c] !== word[i]) return false; // sai ký tự, hoặc ô đã trên đường đi ('#')
    const saved = grid[r][c];
    grid[r][c] = '#'; // đánh dấu: không dùng lại ô này trong đường đi hiện tại
    const found =
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1);
    grid[r][c] = saved; // quay lui: trả ô lại cho các đường đi khác
    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (dfs(r, c, 0)) return true; // thử mọi ô làm điểm xuất phát
    }
  }
  return false;
}
