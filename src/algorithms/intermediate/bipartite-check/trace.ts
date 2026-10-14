import { composite, frame, queue } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight } from '@/engine/types';
import { toAdjacency, type GraphInput } from './node';

export function* trace(input: { graph: GraphInput }): Generator<Frame, { bipartite: boolean; color: Record<string, number> }> {
  const g = input.graph;
  const adj = toAdjacency(g);
  const color: Record<string, number> = {};
  const q: string[] = [];
  const colorOf = (id: string): Highlight => (color[id] === 0 ? 'pointer' : 'active');
  const viz = (nodeHl: Record<string, Highlight> = {}, edgeHl: Record<string, Highlight> = {}, title?: string) => {
    const h: Record<string, Highlight> = {};
    for (const id of Object.keys(color)) h[id] = colorOf(id);
    const graphViz: GraphVisual = {
      kind: 'graph',
      title: title ?? 'Màu 0 = xanh dương, màu 1 = tím',
      nodes: g.nodes,
      edges: g.edges.map((e) => ({ from: e.from, to: e.to })),
      highlights: { ...h, ...nodeHl },
      edgeHighlights: edgeHl,
      marks: Object.fromEntries(Object.entries(color).map(([id, c]) => [id, `c${c}`])),
    };
    return composite([graphViz, queue(q.length ? q : ['rỗng'], {}, 'BFS queue')]);
  };
  const ek = (u: string, v: string) => (g.edges.some((e) => e.from === u && e.to === v) ? `${u}->${v}` : `${v}->${u}`);

  for (const s of Object.keys(adj)) {
    if (s in color) continue;
    color[s] = 0;
    q.push(s);
    yield frame(9, { s, 'color[s]': 0 }, viz({ [s]: 'pointer' }), `${s} chưa tô ⇒ bắt đầu thành phần mới, tô màu 0. Chọn màu nào cho đỉnh đầu không quan trọng (đổi vai 2 màu vẫn hợp lệ).`);
    while (q.length > 0) {
      const u = q.shift()!;
      yield frame(12, { u, 'color[u]': color[u], queue: [...q] }, viz({ [u]: 'compare' }), `Lấy ${u} (màu ${color[u]}) khỏi queue, xét mọi hàng xóm: chúng bắt buộc phải mang màu ${1 - color[u]}.`);
      for (const v of adj[u] ?? []) {
        if (!(v in color)) {
          color[v] = 1 - color[u];
          q.push(v);
          yield frame(15, { u, v, 'color[v]': color[v], queue: [...q] }, viz({ [u]: 'compare' }, { [ek(u, v)]: 'done' }), `${v} chưa tô ⇒ tô màu ${color[v]} (ngược ${u}) và đưa vào queue.`);
        } else if (color[v] === color[u]) {
          yield frame(18, { u, v, 'color[u]': color[u], 'color[v]': color[v] }, viz({ [u]: 'swap', [v]: 'swap' }, { [ek(u, v)]: 'swap' }, 'Mâu thuẫn: cạnh nối hai đỉnh cùng màu'), `Cạnh ${u}–${v} nối hai đỉnh cùng màu ${color[u]} ⇒ không thể tô 2 màu. Lý do: tồn tại chu trình độ dài lẻ đi qua cạnh này.`);
          return { bipartite: false, color };
        } else {
          yield frame(17, { u, v, 'color[u]': color[u], 'color[v]': color[v] }, viz({ [u]: 'compare' }, { [ek(u, v)]: 'done' }), `${v} đã tô màu ${color[v]} ≠ ${color[u]} ⇒ cạnh hợp lệ, bỏ qua.`);
        }
      }
    }
  }
  yield frame(23, { color: { ...color } }, viz({}, Object.fromEntries(g.edges.map((e) => [`${e.from}->${e.to}`, 'done' as Highlight])), 'Bipartite: mọi cạnh nối hai màu khác nhau'), 'Tô xong mọi thành phần không gặp mâu thuẫn ⇒ đồ thị bipartite. Hai màu chính là hai phần của đồ thị.');
  return { bipartite: true, color };
}
