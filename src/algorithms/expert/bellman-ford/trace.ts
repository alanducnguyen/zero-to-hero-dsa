import { composite, frame, matrix } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight } from '@/engine/types';
import { toEdges, type GraphInput } from './node';

export function* trace(input: { graph: GraphInput; source: string }): Generator<Frame, { dist: Record<string, number>; negativeCycle: boolean }> {
  const g = input.graph;
  const ids = g.nodes.map((n) => n.id);
  const edges = toEdges(g);
  const source = ids.includes(input.source) ? input.source : ids[0];
  const dist: Record<string, number> = {};
  const history: string[][] = [];
  const fmt = (x: number) => (x === Infinity ? '∞' : String(x));

  const viz = (nodeHl: Record<string, Highlight> = {}, edgeHl: Record<string, Highlight> = {}, rowHl: Record<string, Highlight> = {}, title?: string) => {
    const graphViz: GraphVisual = {
      kind: 'graph',
      title,
      nodes: g.nodes,
      edges: g.edges.map((e) => ({ ...e, directed: g.directed })),
      highlights: nodeHl,
      edgeHighlights: edgeHl,
      marks: Object.fromEntries(ids.map((id) => [id, fmt(dist[id] ?? Infinity)])),
    };
    const rows = [...history, ids.map((id) => fmt(dist[id] ?? Infinity))];
    const rowLabels = [...history.map((_, k) => (k === 0 ? 'init' : `vòng ${k}`)), history.length === 0 ? 'init' : `vòng ${history.length}`];
    const hl: Record<string, Highlight> = {};
    for (const [k, v] of Object.entries(rowHl)) hl[`${rows.length - 1},${ids.indexOf(k)}`] = v;
    return composite([graphViz, matrix(rows, { title: 'dist[] sau mỗi vòng relax', rowLabels, colLabels: ids, highlights: hl })]);
  };

  for (const v of ids) dist[v] = Infinity;
  dist[source] = 0;
  yield frame(14, { source, dist: { ...dist } }, viz({ [source]: 'active' }), `dist[${source}] = 0, còn lại ∞. Không cần heap hay thứ tự ưu tiên – Bellman-Ford chỉ cần duyệt cạnh.`);
  const V = ids.length;
  for (let round = 1; round < V; round++) {
    history.push(ids.map((id) => fmt(dist[id])));
    let changed = false;
    yield frame(15, { round, 'V-1': V - 1 }, viz({}, {}, {}, `Vòng ${round}/${V - 1}`), `Vòng ${round}: relax toàn bộ ${edges.length} cạnh. Sau vòng k, mọi đường ngắn nhất dùng ≤ k cạnh đã đúng.`);
    for (const { from, to, weight } of edges) {
      const ek = `${from}->${to}`;
      const cand = dist[from] + weight;
      if (cand < dist[to]) {
        dist[to] = cand;
        changed = true;
        yield frame(19, { round, from, to, weight, 'dist[from]+w': cand, 'dist[to]': cand }, viz({ [from]: 'pointer', [to]: 'swap' }, { [ek]: 'swap' }, { [to]: 'swap' }, `Vòng ${round}/${V - 1}`),
          `${from}→${to} (w=${weight}): ${fmt(dist[from])} + ${weight} = ${cand} ngắn hơn ⇒ dist[${to}] = ${cand}.`);
      } else {
        yield frame(18, { round, from, to, weight, 'dist[from]+w': fmt(cand), 'dist[to]': fmt(dist[to]) }, viz({ [from]: 'pointer', [to]: 'compare' }, { [ek]: 'compare' }, { [to]: 'compare' }, `Vòng ${round}/${V - 1}`),
          `${from}→${to} (w=${weight}): ${fmt(dist[from])} + ${weight} = ${fmt(cand)} không ngắn hơn ${fmt(dist[to])} ⇒ giữ.`);
      }
    }
    if (!changed) {
      yield frame(23, { round, changed }, viz(), `Vòng ${round} không đổi gì ⇒ đã hội tụ, dừng sớm (không cần đủ V−1 vòng).`);
      break;
    }
  }
  history.push(ids.map((id) => fmt(dist[id])));
  let negativeCycle = false;
  yield frame(27, { dist: { ...dist } }, viz({}, {}, {}, 'Vòng kiểm tra chu trình âm'), `Vòng kiểm tra: nếu sau ${V - 1} vòng vẫn có cạnh relax được thì đường ngắn nhất "dài hơn V−1 cạnh" ⇒ chứa chu trình âm.`);
  for (const { from, to, weight } of edges) {
    if (dist[from] + weight < dist[to]) {
      negativeCycle = true;
      yield frame(28, { from, to, weight, 'dist[from]+w': dist[from] + weight, 'dist[to]': fmt(dist[to]) }, viz({ [from]: 'swap', [to]: 'swap' }, { [`${from}->${to}`]: 'swap' }, { [to]: 'swap' }, 'Phát hiện chu trình âm'),
        `${from}→${to} vẫn relax được (${fmt(dist[from])} + ${weight} < ${fmt(dist[to])}) ⇒ có chu trình âm tới được từ ${source}. dist không còn ý nghĩa.`);
    }
  }
  yield frame(30, { dist: { ...dist }, negativeCycle }, viz(Object.fromEntries(ids.map((id) => [id, (dist[id] === Infinity ? 'muted' : negativeCycle ? 'swap' : 'done') as Highlight]))),
    negativeCycle ? 'Kết quả: có chu trình âm.' : `Kết quả: dist[] là khoảng cách ngắn nhất từ ${source}; ∞ = không tới được.`);
  history.pop();
  return { dist, negativeCycle };
}
