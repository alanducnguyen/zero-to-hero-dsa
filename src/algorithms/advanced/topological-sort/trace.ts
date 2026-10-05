import { arr, composite, frame, mapViz, queue as queueViz } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight } from '@/engine/types';
import { toAdjacency, type GraphInput } from './node';

export function* trace(input: { graph: GraphInput }): Generator<Frame, string[] | null> {
  const g = input.graph;
  const graph = toAdjacency(g);
  const indegree: Record<string, number> = {};
  const order: string[] = [];
  const queue: string[] = [];
  let head = 0;
  const removed = new Set<string>();
  const viz = (hl: Record<string, Highlight> = {}, edgeHl: Record<string, Highlight> = {}, mapHl?: Record<string, Highlight>) => {
    const h: Record<string, Highlight> = {};
    for (const v of removed) h[v] = 'done';
    for (let k = head; k < queue.length; k++) h[queue[k]] = 'range';
    const gv: GraphVisual = {
      kind: 'graph',
      nodes: g.nodes,
      edges: g.edges.map((e) => ({ from: e.from, to: e.to, directed: true })),
      highlights: { ...h, ...hl },
      edgeHighlights: edgeHl,
      marks: Object.fromEntries(Object.keys(indegree).map((v) => [v, `in=${indegree[v]}`])),
    };
    return composite([
      gv,
      composite([mapViz(indegree, mapHl, 'indegree (bậc vào)'), queueViz(queue.slice(head), undefined, 'Queue (đỉnh có indegree = 0)')], 'row'),
      arr(order.length ? order : ['—'], { title: 'Thứ tự topo' }),
    ]);
  };

  for (const u of Object.keys(graph)) indegree[u] ??= 0;
  for (const u of Object.keys(graph)) for (const v of graph[u]) indegree[v] = (indegree[v] ?? 0) + 1;
  yield frame(11, { indegree: { ...indegree } }, viz(), 'Đếm bậc vào (indegree) của mỗi đỉnh = số cạnh trỏ tới nó = số "phụ thuộc" chưa giải quyết.');
  for (const v of Object.keys(indegree)) if (indegree[v] === 0) queue.push(v);
  yield frame(13, { queue: [...queue] }, viz(), queue.length ? `Đỉnh có indegree = 0 (${queue.join(', ')}) không phụ thuộc ai ⇒ có thể đứng đầu. Đưa vào queue.` : 'Không đỉnh nào có indegree = 0 ⇒ mọi đỉnh đều nằm trong chu trình.');
  while (head < queue.length) {
    const u = queue[head++];
    yield frame(17, { u, queue: queue.slice(head) }, viz({ [u]: 'active' }), `Lấy ${u} ra khỏi queue.`);
    order.push(u);
    removed.add(u);
    yield frame(18, { u, order: [...order] }, viz({ [u]: 'active' }), `Thêm ${u} vào thứ tự topo. Mọi đỉnh trỏ tới ${u} (nếu có) đều đã nằm trước nó trong order.`);
    for (const v of graph[u] ?? []) {
      indegree[v]--;
      const ek = `${u}->${v}`;
      yield frame(20, { u, v, 'indegree[v]': indegree[v] }, viz({ [u]: 'active', [v]: indegree[v] === 0 ? 'swap' : 'compare' }, { [ek]: 'swap' }, { [v]: 'swap' }), `"Cắt" cạnh ${u}→${v}: indegree[${v}] giảm còn ${indegree[v]}.${indegree[v] === 0 ? ` ${v} đã hết phụ thuộc!` : ''}`);
      if (indegree[v] === 0) {
        queue.push(v);
        yield frame(21, { u, v, queue: queue.slice(head) }, viz({ [u]: 'active' }), `indegree[${v}] = 0 ⇒ đưa ${v} vào queue.`);
      }
    }
  }
  const total = Object.keys(indegree).length;
  if (order.length !== total) {
    const stuck = Object.keys(indegree).filter((v) => !removed.has(v));
    yield frame(24, { ordered: order.length, total, stuck }, viz(Object.fromEntries(stuck.map((v) => [v, 'swap' as Highlight]))), `Queue rỗng nhưng chỉ ${order.length}/${total} đỉnh được xếp. Các đỉnh còn lại (${stuck.join(', ')}) vẫn có indegree > 0 ⇒ chúng nằm trong (hoặc phụ thuộc vào) một chu trình ⇒ không có thứ tự topo. Trả về null.`);
    return null;
  }
  yield frame(25, { order: [...order] }, viz(), `Đủ ${total} đỉnh ⇒ đồ thị là DAG. Thứ tự topo: ${order.join(' → ')}.`);
  return order;
}
