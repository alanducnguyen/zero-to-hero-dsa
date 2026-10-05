import { frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { grid: number[][] }): Generator<Frame, number> {
  const grid = input.grid.map((row) => row.map((v) => (v ? 1 : 0)));
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  const visited: boolean[][] = grid.map((row) => row.map(() => false));
  const island: number[][] = grid.map((row) => row.map(() => 0));
  let count = 0;
  const cs: string[] = [];
  const viz = (extra: Record<string, Highlight> = {}) => {
    const cells = grid.map((row, r) => row.map((v, c) => (v === 0 ? null : island[r][c] ? String(island[r][c]) : '1')));
    const h: Record<string, Highlight> = {};
    for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) {
      if (grid[r][c] === 0) h[`${r},${c}`] = 'muted';
      else if (visited[r][c]) h[`${r},${c}`] = 'done';
      else h[`${r},${c}`] = 'range';
    }
    return matrix(cells, { title: `Lưới: số = đảo thứ mấy, xám = nước · count = ${count}`, highlights: { ...h, ...extra } });
  };

  function* sink(r: number, c: number): Generator<Frame, void> {
    cs.push(`sink(${r},${c})`);
    if (r < 0 || r >= m || c < 0 || c >= n) {
      yield frame(12, { r, c }, viz(), `(${r},${c}) ngoài lưới ⇒ dừng.`, { callStack: [...cs] });
      cs.pop();
      return;
    }
    if (grid[r][c] === 0 || visited[r][c]) {
      yield frame(13, { r, c, water: grid[r][c] === 0, visited: visited[r][c] }, viz({ [`${r},${c}`]: grid[r][c] === 0 ? 'muted' : 'compare' }), grid[r][c] === 0 ? `(${r},${c}) là nước ⇒ dừng.` : `(${r},${c}) đã thăm ⇒ dừng (tránh lặp vô hạn).`, { callStack: [...cs] });
      cs.pop();
      return;
    }
    visited[r][c] = true;
    island[r][c] = count;
    yield frame(14, { r, c, island: count }, viz({ [`${r},${c}`]: 'active' }), `Đất chưa thăm tại (${r},${c}) ⇒ đánh dấu thuộc đảo #${count}, rồi lan sang 4 hướng.`, { callStack: [...cs] });
    yield* sink(r + 1, c);
    yield* sink(r - 1, c);
    yield* sink(r, c + 1);
    yield* sink(r, c - 1);
    cs.pop();
  }

  yield frame(9, { m, n, count }, viz(), 'count = 0. Duyệt từng ô; mỗi ô đất CHƯA THĂM là khởi đầu của một đảo mới.');
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1 && !visited[r][c]) {
        count++;
        yield frame(24, { r, c, count }, viz({ [`${r},${c}`]: 'swap' }), `(${r},${c}) là đất chưa thăm ⇒ đảo mới #${count}. Gọi sink để nhấn chìm (đánh dấu) toàn bộ đảo.`, { callStack: ['numIslands'] });
        cs.push('numIslands');
        yield* sink(r, c);
        cs.pop();
        yield frame(25, { r, c, count }, viz(), `Đảo #${count} đã được đánh dấu hết ⇒ các ô của nó sẽ không bị đếm lại.`);
      }
    }
  }
  yield frame(29, { count }, viz(), `Kết quả: ${count} đảo. Mỗi ô được thăm tối đa 1 lần ⇒ O(m·n).`);
  return count;
}
