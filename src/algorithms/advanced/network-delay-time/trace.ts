import { composite, frame, matrix } from '@/engine/helpers';
import type { Frame, GraphVisual, HeapVisual, Highlight } from '@/engine/types';
import type { NetworkInput } from './input';

export function* trace(input: NetworkInput): Generator<Frame, number> {
  const { times, n, k } = input;
  const adj: [number, number][][] = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u].push([v, w]);
  const dist = new Array<number>(n + 1).fill(Infinity);
  dist[k] = 0;
  const heap: [number, number][] = [];
  const settled = new Set<number>();
  const fmt = (x: number) => (x === Infinity ? '∞' : String(x));
  const ids = Array.from({ length: n }, (_, i) => i + 1);
  const nodes = ids.map((id, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return { id: String(id), x: Math.round(240 + 150 * Math.cos(a)), y: Math.round(120 + 95 * Math.sin(a)) };
  });
  const edges = times.map(([u, v, w]) => ({ from: String(u), to: String(v), weight: w, directed: true }));
  const heapStr = () => heap.map(([d, x]) => `${d}:${x}`);

  const swap = (i: number, j: number) => ([heap[i], heap[j]] = [heap[j], heap[i]]);
  const push = (item: [number, number]) => {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0 && heap[(i - 1) >> 1][0] > heap[i][0]) {
      swap(i, (i - 1) >> 1);
      i = (i - 1) >> 1;
    }
  };
  const pop = (): [number, number] => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1;
        const r = l + 1;
        let m = i;
        if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
        if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
        if (m === i) break;
        swap(i, m);
        i = m;
      }
    }
    return top;
  };

  const viz = (nodeHl: Record<string, Highlight> = {}, edgeHl: Record<string, Highlight> = {}, distHl: Record<string, Highlight> = {}) => {
    const h: Record<string, Highlight> = {};
    for (const [, x] of heap) if (!settled.has(x)) h[String(x)] = 'active';
    for (const x of settled) h[String(x)] = 'done';
    const graph: GraphVisual = {
      kind: 'graph',
      title: 'Đồ thị có hướng – xanh lá: đã chốt, tím: đang chờ trong heap',
      nodes,
      edges,
      highlights: { ...h, ...nodeHl },
      edgeHighlights: edgeHl,
      marks: Object.fromEntries(ids.map((id) => [String(id), fmt(dist[id])])),
    };
    const tableHl: Record<string, Highlight> = {};
    ids.forEach((id, i) => { if (settled.has(id)) tableHl[`0,${i}`] = 'done'; });
    const table = matrix([ids.map((id) => fmt(dist[id]))], { title: 'dist[] – thời gian tín hiệu tới sớm nhất', colLabels: ids.map(String), highlights: { ...tableHl, ...distHl } });
    const heapViz: HeapVisual = { kind: 'heap', title: `Min-heap theo d: [${heapStr().join(', ') || 'rỗng'}] (d:node)`, items: heap.map(([d]) => d) };
    return composite([graph, table, heapViz]);
  };
  const col = (x: number) => `0,${x - 1}`;

  yield frame(10, { n, k, edges: times.length }, viz(), `Xây danh sách kề CÓ HƯỚNG: cạnh u→v chỉ thêm vào adj[u]. Khác bài dijkstra vô hướng, tín hiệu không chạy ngược được.`);
  push([0, k]);
  yield frame(42, { k, dist: dist.slice(1).map(fmt), heap: heapStr() }, viz({ [String(k)]: 'pointer' }), `dist[${k}] = 0 vì node ${k} phát tín hiệu ở thời điểm 0; đẩy [0, ${k}] vào heap.`);
  while (heap.length > 0) {
    const [d, u] = pop();
    const stale = d > dist[u];
    yield frame(44, { d, u, 'dist[u]': fmt(dist[u]), heap: heapStr() }, viz({ [String(u)]: stale ? 'muted' : 'pointer' }),
      `pop() lấy gốc heap: [${d}, ${u}] – d nhỏ nhất trong O(log V) nhờ sift-down, thay vì sort cả mảng mỗi vòng.`);
    if (stale) {
      yield frame(45, { d, u, 'dist[u]': fmt(dist[u]) }, viz({ [String(u)]: 'muted' }), `d = ${d} > dist[${u}] = ${fmt(dist[u])}: đây là bản ghi cũ còn sót (lazy deletion – heap không hỗ trợ giảm khoá nên ta đẩy bản mới và bỏ qua bản cũ khi gặp).`);
      continue;
    }
    settled.add(u);
    for (const [v, w] of adj[u]) {
      const ek = `${u}->${v}`;
      const better = d + w < dist[v];
      yield frame(47, { u, v, w, candidate: d + w, 'dist[v]': fmt(dist[v]) }, viz({ [String(u)]: 'pointer', [String(v)]: settled.has(v) ? 'done' : 'compare' }, { [ek]: 'compare' }, { [col(v)]: 'compare' }),
        `Xét cạnh ${u}→${v} (w=${w}): tín hiệu qua ${u} tới ${v} lúc ${d} + ${w} = ${d + w}, so với dist[${v}] = ${fmt(dist[v])}. ${better ? 'Sớm hơn ⇒ relax.' : 'Không sớm hơn ⇒ giữ nguyên.'}`);
      if (better) {
        dist[v] = d + w;
        push([d + w, v]);
        yield frame(49, { v, 'dist[v]': dist[v], heap: heapStr() }, viz({ [String(u)]: 'pointer', [String(v)]: 'swap' }, { [ek]: 'swap' }, { [col(v)]: 'swap' }),
          `dist[${v}] = ${dist[v]}, push([${dist[v]}, ${v}]) rồi sift-up để giữ tính chất heap (cha ≤ con). Bản ghi cũ của ${v} (nếu có) vẫn nằm trong heap.`);
      }
    }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) ans = Math.max(ans, dist[i]);
  const far = ids.filter((id) => dist[id] === ans);
  yield frame(54, { dist: dist.slice(1).map(fmt), ans: fmt(ans) }, viz(Object.fromEntries(far.map((id) => [String(id), 'swap'])), {}, Object.fromEntries(far.map((id) => [col(id), 'swap']))),
    `Heap rỗng. Khác Dijkstra thường (trả cả mảng dist), bài này hỏi khi nào node CUỐI CÙNG nhận tín hiệu ⇒ lấy max dist = ${fmt(ans)} (node ${far.join(', ')}).`);
  const result = ans === Infinity ? -1 : ans;
  yield frame(55, { ans: fmt(ans), result }, viz(), ans === Infinity ? 'Có node dist = ∞: không có đường đi CÓ HƯỚNG nào từ nguồn tới nó ⇒ trả về -1.' : `Mọi node đều nhận được tín hiệu ⇒ đáp án ${result}.`);
  return result;
}
