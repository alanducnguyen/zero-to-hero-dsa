import { frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { grid: number[][] }): Generator<Frame, number> {
  const grid = input.grid.map((row) => row.map((v) => (v ? 1 : 0)));
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  const owner: number[][] = grid.map((row) => row.map(() => 0)); // đảo # của ô đã chìm (chỉ để vẽ)
  let count = 0;
  const cs: string[] = ['numIslands'];
  const viz = (extra: Record<string, Highlight> = {}) => {
    const h: Record<string, Highlight> = {};
    for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) h[`${r},${c}`] = owner[r][c] ? 'done' : grid[r][c] ? 'range' : 'muted';
    const cells = owner.map((row, r) => row.map((o, c) => (o ? `#${o}` : grid[r][c] ? 1 : null)));
    return matrix(cells, { title: `Bản sao lưới: #k = đã chìm thuộc đảo k, 1 = đất chưa thăm · count = ${count}`, highlights: { ...h, ...extra } });
  };

  function* sink(r: number, c: number): Generator<Frame, void> {
    cs.push(`sink(${r},${c})`);
    const out = r < 0 || r >= m || c < 0 || c >= n;
    if (out || grid[r][c] === 0) {
      yield frame(7, { r, c, 'độ sâu đệ quy': cs.length - 1 }, viz(out ? {} : { [`${r},${c}`]: 'compare' }),
        out ? `(${r},${c}) ngoài lưới ⇒ return. Kiểm tra biên trước khi đọc grid để không truy cập undefined.` : owner[r][c] ? `(${r},${c}) đã chìm ⇒ return. Chính việc gán 0 khi chìm ngăn DFS đi vòng vô hạn.` : `(${r},${c}) là nước ⇒ return.`,
        { callStack: [...cs] });
      cs.pop();
      return;
    }
    grid[r][c] = 0;
    owner[r][c] = count;
    yield frame(8, { r, c, count, 'độ sâu đệ quy': cs.length - 1 }, viz({ [`${r},${c}`]: 'active' }),
      `Nhấn chìm (${r},${c}) vào đảo #${count} TRƯỚC khi gọi đệ quy – nếu gán sau, hàng xóm sẽ gọi ngược lại ô này. Độ sâu stack = ${cs.length - 1}: với lưới toàn đất có thể lên tới m·n.`,
      { callStack: [...cs] });
    yield* sink(r + 1, c);
    yield* sink(r - 1, c);
    yield* sink(r, c + 1);
    yield* sink(r, c - 1);
    cs.pop();
  }

  yield frame(3, { m, n }, viz(), 'Sao chép lưới vì thuật toán sẽ ghi 0 lên ô đã thăm – sửa input của caller là side effect phỏng vấn viên hay bắt lỗi.');
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        count++;
        yield frame(18, { r, c, count }, viz({ [`${r},${c}`]: 'swap' }), `(${r},${c}) là đất chưa chìm ⇒ chắc chắn thuộc một đảo chưa đếm (đảo cũ đã bị nhấn chìm hết). count = ${count}.`, { callStack: [...cs] });
        yield* sink(r, c);
        yield frame(19, { r, c, count }, viz(), `Đảo #${count} đã chìm hoàn toàn ⇒ quét tiếp sẽ không đếm trùng ô nào của nó.`, { callStack: [...cs] });
      }
    }
  }
  yield frame(23, { count }, viz(), `Kết quả: ${count} đảo. Mỗi ô bị chạm O(1) lần (1 lần quét + tối đa 4 lần từ hàng xóm) ⇒ O(m·n).`);
  return count;
}
