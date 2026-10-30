import { composite, frame, matrix, queue } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { grid: number[][] }): Generator<Frame, number> {
  const grid = input.grid.map((row) => row.map((v) => (v ? 1 : 0)));
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  const owner: number[][] = grid.map((row) => row.map(() => 0));
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let count = 0;
  let q: [number, number][] = [];
  let head = 0;
  let maxQ = 0;
  const viz = (extra: Record<string, Highlight> = {}) => {
    const h: Record<string, Highlight> = {};
    for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) h[`${r},${c}`] = owner[r][c] ? 'visited' : grid[r][c] ? 'range' : 'muted';
    for (let k = head; k < q.length; k++) h[`${q[k][0]},${q[k][1]}`] = 'pointer';
    const cells = owner.map((row, r) => row.map((o, c) => (o ? `#${o}` : grid[r][c] ? 1 : null)));
    return composite([
      matrix(cells, { title: `Bản sao lưới: xanh dương = đang trong queue · count = ${count}`, highlights: { ...h, ...extra } }),
      queue(q.slice(head).map(([r, c]) => `${r},${c}`), {}, `queue (đã lấy ra ${head}, kích thước lớn nhất ${maxQ})`),
    ]);
  };

  yield frame(3, { m, n }, viz(), 'Sao chép lưới: BFS ghi 0 lên ô đã thăm, không được làm hỏng input của caller.');
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 0) continue;
      count++;
      grid[r][c] = 0;
      owner[r][c] = count;
      q = [[r, c]];
      head = 0;
      maxQ = Math.max(maxQ, 1);
      yield frame(13, { r, c, count }, viz({ [`${r},${c}`]: 'swap' }), `(${r},${c}) là đất chưa thăm ⇒ đảo #${count}. Đánh dấu ngay khi enqueue: nếu đợi tới lúc dequeue, một ô có thể bị nhiều hàng xóm đưa vào queue.`);
      for (; head < q.length; ) {
        const [cr, cc] = q[head++];
        yield frame(15, { cr, cc, head, 'queue.length': q.length }, viz({ [`${cr},${cc}`]: 'active' }), `Lấy (${cr},${cc}) ra bằng con trỏ head – O(1); Array.shift() là O(n) và biến BFS thành O((m·n)²) trên lưới lớn.`);
        for (const [dr, dc] of dirs) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] === 0) continue;
          grid[nr][nc] = 0;
          owner[nr][nc] = count;
          q.push([nr, nc]);
          maxQ = Math.max(maxQ, q.length - head);
          yield frame(21, { cr, cc, nr, nc, 'queue.length': q.length - head }, viz({ [`${nr},${nc}`]: 'compare' }), `Hàng xóm (${nr},${nc}) là đất ⇒ đánh dấu + enqueue. Bộ nhớ nằm trên heap (mảng queue), không phải call stack ⇒ lưới 10⁶ ô toàn đất vẫn an toàn.`);
        }
      }
      yield frame(14, { count, 'queue lớn nhất': maxQ }, viz(), `Queue rỗng ⇒ đảo #${count} đã duyệt xong theo từng lớp khoảng cách.`);
    }
  }
  q = [];
  head = 0;
  yield frame(26, { count }, viz(), `Kết quả: ${count} đảo, cùng O(m·n) như DFS nhưng không có rủi ro stack overflow.`);
  return count;
}
