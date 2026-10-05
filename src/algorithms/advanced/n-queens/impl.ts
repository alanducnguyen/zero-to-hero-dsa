/**
 * N-Queens – backtracking: đặt n quân hậu lên bàn n×n sao cho không quân nào ăn nhau.
 * Đặt từng hàng; ba Set theo dõi cột và hai đường chéo đang bị chiếm.
 * @returns tất cả nghiệm, mỗi nghiệm là mảng cols[row] = cột của hậu ở hàng row
 */
export function solveNQueens(n: number): number[][] {
  const solutions: number[][] = [];
  const cols = new Set<number>();
  const diag1 = new Set<number>(); // row - col: đường chéo "\"
  const diag2 = new Set<number>(); // row + col: đường chéo "/"
  const placement: number[] = [];

  function backtrack(row: number): void {
    if (row === n) {
      solutions.push([...placement]); // đặt đủ n hàng ⇒ một nghiệm
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue; // bị ăn
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      placement.push(col);
      backtrack(row + 1); // thử hàng tiếp theo
      placement.pop(); // quay lui: gỡ hậu
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  backtrack(0);
  return solutions;
}
