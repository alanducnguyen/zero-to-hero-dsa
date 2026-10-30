import { composite, frame, matrix, queue as queueViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { grid: number[][] }): Generator<Frame, number> {
  const g = input.grid.map((row) => [...row]);
  const m = g.length;
  const n = g[0]?.length ?? 0;
  const rotAt: number[][] = g.map((row) => row.map(() => -1)); // phút cam bị thối
  const queue: [number, number][] = [];
  let head = 0;
  let fresh = 0;
  let minutes = 0;
  const viz = (extra: Record<string, Highlight> = {}) => {
    const cells = g.map((row, r) => row.map((v, c) => (v === 0 ? null : v === 1 ? '●' : rotAt[r][c])));
    const h: Record<string, Highlight> = {};
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (g[r][c] === 1) h[`${r},${c}`] = 'compare';
        else if (g[r][c] === 2) h[`${r},${c}`] = 'swap';
      }
    }
    for (let k = head; k < queue.length; k++) h[`${queue[k][0]},${queue[k][1]}`] = 'range';
    return composite([
      matrix(cells, { title: 'Lưới: ● = cam tươi (vàng), số = phút bị thối (đỏ), cyan = frontier trong queue', highlights: { ...h, ...extra } }),
      queueViz(queue.slice(head).map(([r, c]) => `(${r},${c})`), undefined, 'Queue (frontier của phút hiện tại)'),
    ]);
  };

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (g[r][c] === 2) {
        queue.push([r, c]);
        rotAt[r][c] = 0;
      } else if (g[r][c] === 1) fresh++;
    }
  }
  yield frame(17, { m, n, fresh, queue: queue.map(([r, c]) => `(${r},${c})`) }, viz(), `Quét toàn lưới: ${queue.length} cam thối được đưa vào queue CÙNG LÚC (multi-source) vì chúng lan độc lập và song song ở phút 0; đếm được ${fresh} cam tươi để biết khi nào xong và phát hiện cam không thể với tới.`);
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (head < queue.length && fresh > 0) {
    const size = queue.length - head;
    yield frame(22, { minutes, size, fresh }, viz(), `Bắt đầu phút ${minutes + 1}: chụp size = ${size} – đúng số cam thối của tầng hiện tại. Chỉ xử lý ${size} phần tử này để cam mới thối trong phút này không lan tiếp ngay (chúng thuộc phút sau).`);
    for (let i = 0; i < size; i++) {
      const [r, c] = queue[head++];
      yield frame(24, { minutes, i, size, r, c, fresh }, viz({ [`${r},${c}`]: 'active' }), `Lấy (${r},${c}) ra khỏi queue, xét 4 hàng xóm. Chỉ cam tươi (1) mới bị lây; ô trống, ô ngoài lưới, cam đã thối đều bỏ qua.`);
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || g[nr][nc] !== 1) continue;
        g[nr][nc] = 2;
        rotAt[nr][nc] = minutes + 1;
        fresh--;
        queue.push([nr, nc]);
        yield frame(31, { minutes, r, c, nr, nc, fresh }, viz({ [`${r},${c}`]: 'active', [`${nr},${nc}`]: 'pointer' }), `(${nr},${nc}) là cam tươi kề (${r},${c}) ⇒ thối ở phút ${minutes + 1}. Đánh dấu = 2 NGAY khi đẩy vào queue để ô khác không đẩy nó lần nữa. Còn ${fresh} cam tươi.`);
      }
    }
    minutes++;
    yield frame(34, { minutes, fresh, nextLevel: queue.length - head }, viz(), `Hết tầng ⇒ minutes = ${minutes}. ${fresh === 0 ? 'Không còn cam tươi ⇒ vòng lặp dừng (không đếm thêm phút thừa).' : queue.length - head === 0 ? 'Queue rỗng mà vẫn còn cam tươi ⇒ chúng bị cô lập.' : `Frontier mới có ${queue.length - head} cam sẽ lan ở phút tiếp theo.`}`);
  }
  const result = fresh === 0 ? minutes : -1;
  yield frame(36, { fresh, minutes, result }, viz(), fresh === 0 ? `Không còn cam tươi ⇒ đáp án ${minutes} phút. Vì BFS theo tầng, tầng cuối chính là thời điểm cam xa nguồn nhất bị thối – đó là tối thiểu.` : `Còn ${fresh} cam tươi không có đường nối tới cam thối nào (bị ô trống ngăn cách) ⇒ trả về -1.`);
  return result;
}
