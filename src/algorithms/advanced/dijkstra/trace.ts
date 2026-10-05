import { composite, frame, matrix } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight } from '@/engine/types';
import { toAdjacency, type GraphInput } from './node';

export function* trace(input: { graph: GraphInput; source: string }): Generator<Frame, Record<string, number>> {
  const g = input.graph;
  const graph = toAdjacency(g);
  const source = g.nodes.some((n) => n.id === input.source) ? input.source : g.nodes[0]?.id;
  const ids = g.nodes.map((n) => n.id);
  const dist: Record<string, number> = {};
  const visited = new Set<string>();
  const pq: { node: string; d: number }[] = [];
  const fmt = (x: number) => (x === Infinity ? '∞' : String(x));

  const viz = (hl: Record<string, Highlight> = {}, edgeHl: Record<string, Highlight> = {}, extraTable: Record<string, Highlight> = {}) => {
    const h: Record<string, Highlight> = {};
    for (const v of visited) h[v] = 'done';
    const graphViz: GraphVisual = {
      kind: 'graph',
      nodes: g.nodes,
      edges: g.edges.map((e) => ({ ...e, directed: g.directed })),
      highlights: { ...h, ...hl },
      edgeHighlights: edgeHl,
      marks: Object.fromEntries(ids.map((id) => [id, fmt(dist[id] ?? Infinity)])),
    };
    const tableHl: Record<string, Highlight> = {};
    ids.forEach((id, i) => { if (visited.has(id)) tableHl[`0,${i}`] = 'done'; });
    const table = matrix([ids.map((id) => fmt(dist[id] ?? Infinity))], { title: 'dist[] – khoảng cách tạm (xanh = đã chốt)', colLabels: ids, highlights: { ...tableHl, ...extraTable } });
    const pqViz = matrix([[...pq].sort((a, b) => a.d - b.d).map((e) => `${e.node}:${e.d}`)], { title: 'Priority queue (node:dist), nhỏ nhất bên trái' });
    return composite([graphViz, table, pq.length ? pqViz : matrix([['rỗng']], { title: 'Priority queue' })]);
  };

  for (const node of ids) dist[node] = Infinity;
  yield frame(15, { dist: { ...dist } }, viz(), 'Khởi tạo dist = ∞ cho mọi đỉnh: chưa biết đường nào tới chúng.');
  dist[source] = 0;
  pq.push({ node: source, d: 0 });
  yield frame(18, { source, dist: { ...dist }, pq: pq.map((e) => `${e.node}:${e.d}`) }, viz({ [source]: 'active' }), `dist[${source}] = 0 và đưa nguồn vào priority queue.`);
  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d);
    const { node: u, d } = pq.shift()!;
    yield frame(21, { u, d, pq: pq.map((e) => `${e.node}:${e.d}`) }, viz({ [u]: visited.has(u) ? 'muted' : 'active' }), `Lấy đỉnh có khoảng cách tạm nhỏ nhất: ${u} (d = ${d}).`);
    if (visited.has(u)) {
      yield frame(22, { u, d, 'dist[u]': dist[u] }, viz({ [u]: 'muted' }), `${u} đã được chốt với dist = ${dist[u]} ≤ ${d}. Đây là bản ghi cũ trong queue ⇒ bỏ qua (lazy deletion).`);
      continue;
    }
    visited.add(u);
    yield frame(23, { u, d, visited: [...visited] }, viz({ [u]: 'active' }), `Chốt ${u}: dist[${u}] = ${d} là ngắn nhất thật sự. Lý do: mọi đường khác tới ${u} phải đi qua một đỉnh chưa chốt có d ≥ ${d}, cộng trọng số ≥ 0 nên không ngắn hơn.`);
    for (const { to: v, weight } of graph[u] ?? []) {
      const candidate = d + weight;
      const ek = `${u}->${v}`;
      yield frame(25, { u, v, weight, candidate, 'dist[v]': fmt(dist[v]) }, viz({ [u]: 'active', [v]: visited.has(v) ? 'done' : 'compare' }, { [ek]: 'compare' }, { [`0,${ids.indexOf(v)}`]: 'compare' }),
        `Xét cạnh ${u}→${v} (w=${weight}): đường qua ${u} dài ${d} + ${weight} = ${candidate}, so với dist[${v}] = ${fmt(dist[v])}.`);
      if (candidate < dist[v]) {
        dist[v] = candidate;
        pq.push({ node: v, d: candidate });
        yield frame(27, { u, v, candidate, pq: pq.map((e) => `${e.node}:${e.d}`) }, viz({ [u]: 'active', [v]: 'swap' }, { [ek]: 'swap' }, { [`0,${ids.indexOf(v)}`]: 'swap' }), `Ngắn hơn ⇒ relax: dist[${v}] = ${candidate}, đẩy ${v}:${candidate} vào queue.`);
      }
    }
  }
  yield frame(32, { dist: { ...dist } }, viz(), 'Queue rỗng ⇒ đã chốt mọi đỉnh tới được. dist[] là khoảng cách ngắn nhất từ nguồn.');
  return dist;
}
