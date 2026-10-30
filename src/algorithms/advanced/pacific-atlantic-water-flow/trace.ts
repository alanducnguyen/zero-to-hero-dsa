import { composite, frame, matrix, queue as queueViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { heights: number[][] }): Generator<Frame, number[][]> {
  const heights = input.heights;
  const m = heights.length;
  const n = heights[0]?.length ?? 0;
  if (m === 0 || n === 0) {
    yield frame(10, { m, n }, matrix([['rỗng']], { title: 'Lưới độ cao' }), 'Lưới rỗng ⇒ không có ô nào, trả về [].');
    return [];
  }
  const empty = () => heights.map((row) => row.map(() => false));
  const pac = empty();
  const atl = empty();
  const result: number[][] = [];
  let queue: [number, number][] = [];
  let head = 0;
  let ocean = 'Pacific';
  const fmt = (q: [number, number][]) => q.map(([r, c]) => `(${r},${c})`);

  const viz = (extra: Record<string, Highlight> = {}) => {
    const h: Record<string, Highlight> = {};
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (pac[r][c] && atl[r][c]) h[`${r},${c}`] = 'done';
        else if (pac[r][c]) h[`${r},${c}`] = 'pointer';
        else if (atl[r][c]) h[`${r},${c}`] = 'range';
      }
    }
    return composite([
      matrix(heights, {
        title: 'Độ cao – xanh dương: tới Pacific, cyan: tới Atlantic, xanh lá: cả hai, tím: ô đang xét, vàng: hàng xóm',
        highlights: { ...h, ...extra },
        rowLabels: heights.map((_, r) => (r === 0 ? `P ${r}` : r === m - 1 ? `${r} A` : String(r))),
      }),
      queueViz(fmt(queue.slice(head)), undefined, `Queue BFS (${ocean})`),
    ]);
  };

  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  function* bfs(seen: boolean[][], starts: [number, number][]): Generator<Frame, void> {
    queue = [];
    head = 0;
    for (const [r, c] of starts) {
      if (seen[r][c]) continue;
      seen[r][c] = true;
      queue.push([r, c]);
    }
    yield frame(19, { ocean, queue: fmt(queue) }, viz(), `Gieo ${queue.length} ô mép của ${ocean} vào queue cùng lúc (multi-source BFS). Ô sát biển chắc chắn chảy ra biển; góc thuộc hai mép chỉ đẩy một lần nhờ seen.`);
    while (head < queue.length) {
      const [r, c] = queue[head++];
      yield frame(22, { ocean, r, c, h: heights[r][c] }, viz({ [`${r},${c}`]: 'active' }), `Lấy (${r},${c}) cao ${heights[r][c]}. Nước từ đây đã ra được ${ocean}; giờ tìm hàng xóm có thể chảy XUỐNG ô này.`);
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc]) continue;
        if (heights[nr][nc] < heights[r][c]) {
          yield frame(27, { ocean, r, c, nr, nc, from: heights[r][c], to: heights[nr][nc] }, viz({ [`${r},${c}`]: 'active', [`${nr},${nc}`]: 'compare' }),
            `(${nr},${nc}) cao ${heights[nr][nc]} < ${heights[r][c]}: nước ở đó không thể chảy NGƯỢC lên (${r},${c}) ⇒ bỏ qua (có thể nó tới ${ocean} bằng đường khác).`);
          continue;
        }
        seen[nr][nc] = true;
        queue.push([nr, nc]);
        yield frame(29, { ocean, r, c, nr, nc, from: heights[r][c], to: heights[nr][nc] }, viz({ [`${r},${c}`]: 'active', [`${nr},${nc}`]: 'compare' }),
          `(${nr},${nc}) cao ${heights[nr][nc]} ≥ ${heights[r][c]} ⇒ nước từ đó chảy xuống (${r},${c}) rồi ra ${ocean}. Đánh dấu seen ngay khi đẩy để mỗi ô vào queue đúng một lần.`);
      }
    }
  }

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
  yield frame(43, { m, n }, viz(), `Tư duy ngược: thay vì thả nước từ ${m * n} ô (mỗi ô một lần DFS ⇒ O((mn)²)), ta đi NGƯỢC từ bờ biển lên dốc. Pacific = mép trên + trái, Atlantic = mép dưới + phải.`);
  yield* bfs(pac, pacStarts);
  const pacCount = pac.flat().filter(Boolean).length;
  yield frame(44, { ocean, reached: pacCount }, viz(), `Xong Pacific: ${pacCount} ô (xanh dương) có đường xuống dốc ra Pacific.`);
  ocean = 'Atlantic';
  yield* bfs(atl, atlStarts);
  const atlCount = atl.flat().filter(Boolean).length;
  yield frame(45, { ocean, reached: atlCount }, viz(), `Xong Atlantic: ${atlCount} ô tới được Atlantic. Ô xanh lá nằm trong cả hai tập.`);
  queue = [];
  head = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r][c] && atl[r][c]) {
        result.push([r, c]);
        yield frame(49, { r, c, result: result.map(([a, b]) => `(${a},${b})`) }, viz({ [`${r},${c}`]: 'active' }), `(${r},${c}) tới được cả hai đại dương ⇒ thêm vào kết quả. Duyệt theo hàng rồi cột nên kết quả tự sắp xếp.`);
      }
    }
  }
  yield frame(52, { result: result.map(([a, b]) => `(${a},${b})`) }, viz(), `Kết quả: ${result.length} ô = giao của hai tập. Mỗi BFS thăm mỗi ô ≤ 1 lần ⇒ tổng O(m·n).`);
  return result;
}
