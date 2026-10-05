import { composite, frame, matrix, arr } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { n: number }): Generator<Frame, { count: number; first: number[] | null }> {
  const n = Math.max(1, Math.min(6, Math.floor(input.n)));
  const solutions: number[][] = [];
  const cols = new Set<number>();
  const diag1 = new Set<number>();
  const diag2 = new Set<number>();
  const placement: number[] = [];
  const stack: string[] = [];
  const cs = () => [...stack];
  const labels = Array.from({ length: n }, (_, i) => String(i));
  const board = (hl: Record<string, Highlight> = {}) => {
    const cells: (string | null)[][] = Array.from({ length: n }, () => new Array<string | null>(n).fill(null));
    const h: Record<string, Highlight> = {};
    placement.forEach((c, r) => {
      cells[r][c] = 'Q';
      h[`${r},${c}`] = 'done';
    });
    return composite([
      matrix(cells, { title: `Bàn cờ ${n}×${n}`, rowLabels: labels, colLabels: labels, highlights: { ...h, ...hl } }),
      arr(solutions.length ? solutions.map((s) => s.join('')) : ['—'], { title: `Nghiệm tìm được: ${solutions.length} (mỗi nghiệm = cột của hậu theo hàng)` }),
    ]);
  };
  const attacked = (row: number) => {
    const h: Record<string, Highlight> = {};
    for (let c = 0; c < n; c++) if (cols.has(c) || diag1.has(row - c) || diag2.has(row + c)) h[`${row},${c}`] = 'muted';
    return h;
  };

  function* backtrack(row: number): Generator<Frame, void> {
    stack.push(`backtrack(row=${row})`);
    if (row === n) {
      solutions.push([...placement]);
      yield frame(15, { row, placement: [...placement], count: solutions.length }, board(), `row = n: đã đặt đủ ${n} hậu không ăn nhau ⇒ ghi nhận nghiệm #${solutions.length}: [${placement.join(', ')}]. Quay lui để tìm nghiệm khác.`, { callStack: cs() });
      stack.pop();
      return;
    }
    yield frame(14, { row, placement: [...placement] }, board(attacked(row)), `Hàng ${row}: các ô xám bị hậu phía trên khống chế (cùng cột hoặc đường chéo). Thử từng cột còn lại.`, { callStack: cs() });
    for (let col = 0; col < n; col++) {
      const blocked = cols.has(col) || diag1.has(row - col) || diag2.has(row + col);
      yield frame(19, { row, col, cols: [...cols], 'row-col': row - col, 'row+col': row + col, blocked }, board({ ...attacked(row), [`${row},${col}`]: blocked ? 'swap' : 'compare' }), blocked ? `Ô (${row},${col}) bị ăn: ${cols.has(col) ? `cột ${col} đã có hậu` : diag1.has(row - col) ? `đường chéo \\ (row−col=${row - col}) đã có hậu` : `đường chéo / (row+col=${row + col}) đã có hậu`} ⇒ bỏ qua.` : `Ô (${row},${col}) an toàn ⇒ đặt hậu.`, { callStack: cs() });
      if (blocked) continue;
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      placement.push(col);
      yield frame(24, { row, col, placement: [...placement] }, board({ [`${row},${col}`]: 'active' }), `Đặt hậu tại (${row},${col}), đánh dấu cột và 2 đường chéo. Đệ quy sang hàng ${row + 1}.`, { callStack: cs() });
      yield* backtrack(row + 1);
      placement.pop();
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
      yield frame(25, { row, col, placement: [...placement] }, board({ [`${row},${col}`]: 'swap' }), `Quay lui: gỡ hậu khỏi (${row},${col}), trả lại cột và đường chéo, thử cột tiếp theo.`, { callStack: cs() });
    }
    stack.pop();
  }

  yield frame(32, { n }, board(), `Bắt đầu backtrack từ hàng 0. Mỗi hàng đúng 1 hậu nên chỉ cần chọn cột cho từng hàng.`);
  yield* backtrack(0);
  yield frame(33, { count: solutions.length, first: solutions[0] ?? null }, board(), `Duyệt hết cây tìm kiếm: ${solutions.length} nghiệm cho n = ${n}.`);
  return { count: solutions.length, first: solutions[0] ?? null };
}
