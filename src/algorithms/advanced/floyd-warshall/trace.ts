import { composite, frame, matrix } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight } from '@/engine/types';
import { toEdgeList, type GraphInput } from './node';

export function* trace(input: { graph: GraphInput }): Generator<Frame, number[][]> {
  const g = input.graph;
  const { ids, edges } = toEdgeList(g);
  const n = ids.length;
  const fmt = (x: number) => (x === Infinity ? '∞' : String(x));
  const dist: number[][] = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity)));

  const viz = (nodeHl: Record<string, Highlight> = {}, edgeHl: Record<string, Highlight> = {}, cellHl: Record<string, Highlight> = {}, k?: number) => {
    const graphViz: GraphVisual = {
      kind: 'graph',
      title: k === undefined ? 'Đồ thị' : `Vòng k = ${ids[k]}: cho phép đi vòng qua ${ids[k]}`,
      nodes: g.nodes,
      edges: g.edges.map((e) => ({ ...e, directed: g.directed })),
      highlights: nodeHl,
      edgeHighlights: edgeHl,
    };
    const kHl: Record<string, Highlight> = {};
    if (k !== undefined) for (let t = 0; t < n; t++) { kHl[`${k},${t}`] = 'visited'; kHl[`${t},${k}`] = 'visited'; }
    const table = matrix(dist.map((r) => r.map(fmt)), { title: 'dist[i][j] (hàng i → cột j)', rowLabels: ids, colLabels: ids, highlights: { ...kHl, ...cellHl } });
    return composite([graphViz, table]);
  };

  yield frame(7, { n }, viz(), 'Khởi tạo dist: đường chéo = 0 (đi tới chính mình), còn lại ∞ (chưa biết đường).');
  for (const [u, v, w] of edges) dist[u][v] = Math.min(dist[u][v], w);
  yield frame(10, { edges: edges.map(([u, v, w]) => `${ids[u]}→${ids[v]}:${w}`) }, viz({}, {}, Object.fromEntries(edges.map(([u, v]) => [`${u},${v}`, 'done' as Highlight]))), 'Điền trọng số cạnh trực tiếp: dist[u][v] = w (lấy min nếu có nhiều cạnh song song). Đây là đáp án khi không dùng đỉnh trung gian nào.');
  for (let k = 0; k < n; k++) {
    yield frame(11, { k: ids[k] }, viz({ [ids[k]]: 'active' }, {}, {}, k), `Vòng k = ${ids[k]}: từ giờ mọi đường được phép đi qua ${ids[k]} làm trung gian. Hàng/cột ${ids[k]} (xám) đã là tối ưu với các trung gian trước, nên không đổi trong vòng này.`);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === k || j === k || i === j) continue; // frame trivial: bỏ qua cho gọn
        const viaK = dist[i][k] + dist[k][j];
        const cur = dist[i][j];
        if (viaK < cur) {
          dist[i][j] = viaK;
          yield frame(15, { k: ids[k], i: ids[i], j: ids[j], 'dist[i][k]': fmt(dist[i][k]), 'dist[k][j]': fmt(dist[k][j]), old: fmt(cur), new: viaK },
            viz({ [ids[k]]: 'active', [ids[i]]: 'pointer', [ids[j]]: 'pointer' }, { [`${ids[i]}->${ids[k]}`]: 'swap', [`${ids[k]}->${ids[j]}`]: 'swap' }, { [`${i},${k}`]: 'compare', [`${k},${j}`]: 'compare', [`${i},${j}`]: 'swap' }, k),
            `${ids[i]}→${ids[k]}→${ids[j]} = ${fmt(dist[i][k])} + ${fmt(dist[k][j])} = ${viaK} < ${fmt(cur)} ⇒ cập nhật dist[${ids[i]}][${ids[j]}] = ${viaK}.`);
        } else {
          yield frame(14, { k: ids[k], i: ids[i], j: ids[j], 'dist[i][k]': fmt(dist[i][k]), 'dist[k][j]': fmt(dist[k][j]), 'dist[i][j]': fmt(cur) },
            viz({ [ids[k]]: 'active', [ids[i]]: 'pointer', [ids[j]]: 'pointer' }, {}, { [`${i},${k}`]: 'compare', [`${k},${j}`]: 'compare', [`${i},${j}`]: 'active' }, k),
            `${ids[i]}→${ids[k]}→${ids[j]} = ${fmt(viaK)} không ngắn hơn ${fmt(cur)} ⇒ giữ nguyên.`);
        }
      }
    }
  }
  yield frame(20, { dist: dist.map((r) => r.map(fmt)) }, viz({}, {}, Object.fromEntries(dist.flatMap((r, i) => r.map((v, j) => [`${i},${j}`, (v === Infinity ? 'muted' : 'done') as Highlight])))), 'Xong n vòng: dist[i][j] là đường ngắn nhất dùng bất kỳ đỉnh trung gian nào. Ô ∞ là cặp không tới được.');
  return dist;
}
