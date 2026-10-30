import { composite, frame, mapViz, queue as queueViz } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight, VisualState } from '@/engine/types';
import { GraphNode } from './impl';
import { build, toAdjacency, type CGInput } from './node';

export function* trace(input: CGInput): Generator<Frame, number[][]> {
  const { start, nodes } = build(input);
  const n = nodes.length;

  // Bố cục: các node gốc xếp trên vòng tròn
  const R = n <= 1 ? 0 : 120;
  const gNodes = nodes.map((u, k) => {
    const ang = -Math.PI / 2 + (2 * Math.PI * k) / Math.max(1, n);
    return { id: String(u.val), label: String(u.val), x: Math.round(260 + R * Math.cos(ang)), y: Math.round(150 + R * Math.sin(ang)) };
  });
  const gEdges: GraphVisual['edges'] = [];
  for (const u of nodes) for (const v of u.neighbors) if (u.val < v.val) gEdges.push({ from: String(u.val), to: String(v.val) });

  const clones = new Map<GraphNode, GraphNode>();
  const queue: GraphNode[] = [];
  /** các hướng cạnh đã nối trong bản sao: "u->v" */
  const linked = new Set<string>();
  let cur: GraphNode | null = null;

  const viz = (extra: Record<string, Highlight> = {}, edgeExtra: Record<string, Highlight> = {}, mapExtra: Record<string, Highlight> = {}): VisualState => {
    const h: Record<string, Highlight> = {};
    for (const u of nodes) if (!clones.has(u)) h[u.val] = 'muted';
    for (const u of clones.keys()) h[u.val] = 'done';
    for (const u of queue) h[u.val] = 'active';
    if (cur) h[cur.val] = 'pointer';
    const eh: Record<string, Highlight> = {};
    for (const e of gEdges) {
      const both = linked.has(`${e.from}->${e.to}`) && linked.has(`${e.to}->${e.from}`);
      const one = linked.has(`${e.from}->${e.to}`) || linked.has(`${e.to}->${e.from}`);
      if (both) eh[`${e.from}->${e.to}`] = 'done';
      else if (one) eh[`${e.from}->${e.to}`] = 'range';
    }
    const marks: Record<string, string> = {};
    for (const u of clones.keys()) marks[u.val] = `${u.val}'`;
    const gv: GraphVisual = {
      kind: 'graph',
      title: 'Đồ thị gốc (xanh lá = đã có bản sao, tím = trong queue, xanh dương = cur)',
      nodes: gNodes,
      edges: gEdges,
      highlights: { ...h, ...extra },
      edgeHighlights: { ...eh, ...edgeExtra },
      marks,
    };
    const entries: Record<string, string> = {};
    const mh: Record<string, Highlight> = {};
    for (const [o, c] of clones) {
      entries[`${o.val}`] = `${c.val}' → [${c.neighbors.map((x) => `${x.val}'`).join(', ')}]`;
      if (cur === o) mh[`${o.val}`] = 'pointer';
    }
    return composite([
      gv,
      composite([
        queueViz(queue.length ? queue.map((u) => u.val) : ['—'], undefined, 'queue (node gốc chờ xử lý)'),
        mapViz(entries, { ...mh, ...mapExtra }, 'clones: gốc → bản sao [neighbors]'),
      ], 'row'),
    ]);
  };

  if (start === null) {
    yield frame(9, { node: null }, viz(), 'Đồ thị rỗng (node = null) ⇒ trả về null ngay. Luôn hỏi interviewer về case này.');
    return toAdjacency(null);
  }
  yield frame(9, { node: start.val }, viz({ [start.val]: 'compare' }), `Bắt đầu từ node ${start.val}. Chỉ được cho một node, nên mọi node khác phải được khám phá qua neighbors – BFS sẽ đi hết thành phần liên thông.`);
  yield frame(10, { node: start.val }, viz(), 'Map clones: node gốc → bản sao. Nó vừa là tập "đã thăm" vừa để tìm lại bản sao của một láng giềng khi nối cạnh – không có map thì không biết bản sao nào đã tồn tại.');
  clones.set(start, new GraphNode(start.val));
  yield frame(11, { node: start.val }, viz({}, {}, { [start.val]: 'swap' }), `Tạo bản sao ${start.val}' và ghi vào map NGAY, trước khi đưa ${start.val} vào queue.`);
  queue.push(start);
  yield frame(12, { queue: queue.map((u) => u.val) }, viz(), `queue = [${start.val}]. Bất biến: mọi node trong queue đều đã có bản sao trong map.`);

  while (queue.length > 0) {
    yield frame(13, { queue: queue.map((u) => u.val) }, viz(), `queue còn ${queue.length} node ⇒ tiếp tục.`);
    cur = queue.shift()!;
    yield frame(14, { cur: cur.val, queue: queue.map((u) => u.val) }, viz(),
      `Lấy ${cur.val} ra khỏi queue. Bản sao ${cur.val}' đã có sẵn; giờ cần nối ${cur.val}' với bản sao của từng láng giềng [${cur.neighbors.map((x) => x.val).join(', ')}].`);
    for (const nb of cur.neighbors) {
      const ek = `${cur.val}->${nb.val}`;
      const has = clones.has(nb);
      yield frame(16, { cur: cur.val, nb: nb.val, 'clones.has(nb)': has }, viz({ [nb.val]: 'compare' }, { [ek]: 'compare' }),
        has
          ? `${nb.val} đã có bản sao (đã vào queue trước đó, có thể đã xử lý xong) ⇒ KHÔNG tạo mới, KHÔNG enqueue lại. Đây là chỗ chặn vòng lặp vô hạn khi đồ thị có chu trình.`
          : `${nb.val} chưa có bản sao ⇒ đây là lần đầu khám phá ${nb.val}.`);
      if (!has) {
        clones.set(nb, new GraphNode(nb.val));
        yield frame(17, { cur: cur.val, nb: nb.val }, viz({ [nb.val]: 'swap' }, { [ek]: 'compare' }, { [nb.val]: 'swap' }),
          `Tạo ${nb.val}' và ghi map NGAY lúc này chứ không đợi lúc lấy ra khỏi queue: nếu đợi, một node khác kề ${nb.val} có thể thấy ${nb.val} "chưa thăm" và enqueue nó lần nữa ⇒ tạo 2 bản sao trùng, cạnh bị nhân đôi.`);
        queue.push(nb);
        yield frame(18, { cur: cur.val, nb: nb.val, queue: queue.map((u) => u.val) }, viz({}, { [ek]: 'compare' }),
          `Đưa ${nb.val} vào queue để sau này nối các cạnh của ${nb.val}'.`);
      }
      const c = clones.get(cur)!;
      c.neighbors.push(clones.get(nb)!);
      linked.add(ek);
      yield frame(20, { cur: cur.val, nb: nb.val, [`${cur.val}'.neighbors`]: c.neighbors.map((x) => x.val) }, viz({}, {}, { [cur.val]: 'swap' }),
        `Nối ${cur.val}' → ${nb.val}' (trỏ tới BẢN SAO, không trỏ về node gốc – trộn lẫn là lỗi kinh điển). Cạnh vô hướng gồm 2 hướng; hướng ${nb.val}' → ${cur.val}' sẽ được nối khi xử lý ${nb.val}.`);
    }
  }
  cur = null;
  const result = toAdjacency(clones.get(start)!);
  yield frame(23, { result }, viz(),
    `queue rỗng ⇒ đã sao chép ${clones.size} node. Trả về ${start.val}'. Mỗi node vào queue đúng 1 lần, mỗi cạnh được duyệt 2 lần (mỗi đầu một lần) ⇒ O(V + E). Danh sách kề bản sao: ${JSON.stringify(result)}.`);
  return result;
}
