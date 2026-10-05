import { composite, frame, matrix, queue as queueViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { grid: number[][] }): Generator<Frame, number> {
  const grid = input.grid;
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  const dist: number[][] = grid.map((row) => row.map(() => -1));
  const queue: [number, number][] = [];
  let head = 0;
  const viz = (extra: Record<string, Highlight> = {}) => {
    const cells = grid.map((row, r) => row.map((v, c) => (v === 1 ? '#' : dist[r][c] === -1 ? null : dist[r][c])));
    const h: Record<string, Highlight> = {};
    for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (grid[r][c] === 0 && dist[r][c] !== -1) h[`${r},${c}`] = 'visited';
    for (let k = head; k < queue.length; k++) h[`${queue[k][0]},${queue[k][1]}`] = 'range';
    return composite([
      matrix(cells, { title: 'Lưới: số = khoảng cách từ (0,0), # = tường', highlights: { ...h, ...extra } }),
      queueViz(queue.slice(head).map(([r, c]) => `(${r},${c})`), undefined, 'Queue (BFS frontier)'),
    ]);
  };
  if (m === 0 || n === 0 || grid[0][0] === 1 || grid[m - 1][n - 1] === 1) {
    yield frame(9, { m, n }, viz(), 'Lưới rỗng hoặc ô xuất phát/đích là tường ⇒ không có đường đi.');
    return -1;
  }
  queue.push([0, 0]);
  dist[0][0] = 0;
  yield frame(12, { m, n, queue: ['(0,0)'] }, viz({ '0,0': 'active' }), 'Khởi tạo: dist[0][0] = 0, đưa ô xuất phát vào queue. Bất biến BFS: queue chứa các ô theo thứ tự khoảng cách không giảm.');
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (head < queue.length) {
    const [r, c] = queue[head++];
    yield frame(16, { r, c, 'dist[r][c]': dist[r][c], queueSize: queue.length - head }, viz({ [`${r},${c}`]: 'active' }), `Lấy ô (${r},${c}) ra khỏi queue, khoảng cách ${dist[r][c]}. Mọi ô còn lại trong queue có khoảng cách ≥ ${dist[r][c]}.`);
    if (r === m - 1 && c === n - 1) {
      yield frame(17, { r, c, result: dist[r][c] }, viz({ [`${r},${c}`]: 'done' }), `Đây là ô đích! Vì BFS lấy ra theo thứ tự khoảng cách tăng dần, ${dist[r][c]} chính là đường đi ngắn nhất. Dừng ngay.`);
      return dist[r][c];
    }
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      const key = `${nr},${nc}`;
      if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
        yield frame(21, { r, c, nr, nc }, viz({ [`${r},${c}`]: 'active' }), `Hàng xóm (${nr},${nc}) nằm ngoài lưới ⇒ bỏ qua.`);
        continue;
      }
      if (grid[nr][nc] === 1 || dist[nr][nc] !== -1) {
        yield frame(22, { r, c, nr, nc, 'dist[nr][nc]': dist[nr][nc] }, viz({ [`${r},${c}`]: 'active', [key]: grid[nr][nc] === 1 ? 'muted' : 'compare' }), grid[nr][nc] === 1 ? `(${nr},${nc}) là tường ⇒ bỏ qua.` : `(${nr},${nc}) đã thăm với khoảng cách ${dist[nr][nc]} ≤ ${dist[r][c] + 1} ⇒ không cần cập nhật (BFS tìm thấy lần đầu đã là ngắn nhất).`);
        continue;
      }
      dist[nr][nc] = dist[r][c] + 1;
      queue.push([nr, nc]);
      yield frame(24, { r, c, nr, nc, 'dist[nr][nc]': dist[nr][nc] }, viz({ [`${r},${c}`]: 'active', [key]: 'swap' }), `Ô (${nr},${nc}) chưa thăm ⇒ dist = ${dist[r][c]} + 1 = ${dist[nr][nc]}, đưa vào cuối queue.`);
    }
  }
  yield frame(27, { result: -1 }, viz(), 'Queue rỗng mà chưa gặp đích ⇒ đích bị tường chặn hoàn toàn. Trả về -1.');
  return -1;
}
