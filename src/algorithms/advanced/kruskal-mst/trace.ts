import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight } from '@/engine/types';
import type { Edge } from './impl';
import type { GraphInput } from './node';

export function* trace(input: { graph: GraphInput }): Generator<Frame, { edges: Edge[]; total: number } | null> {
  const g = input.graph;
  const nodes = g.nodes.map((n) => n.id);
  const edges: Edge[] = g.edges.map((e) => ({ from: e.from, to: e.to, weight: e.weight ?? 1 }));
  const parent = new Map<string, string>(nodes.map((v) => [v, v]));
  const find = (x: string): string => { const p = parent.get(x)!; if (p === x) return x; const r = find(p); parent.set(x, r); return r; };
  const chosen: Edge[] = [];
  const rejected = new Set<string>();
  let total = 0;
  const key = (e: Edge) => `${e.from}->${e.to}`;
  const viz = (hl: Record<string, Highlight> = {}, edgeHl: Record<string, Highlight> = {}, listHl: Record<number, Highlight> = {}) => {
    const eh: Record<string, Highlight> = {};
    for (const e of chosen) eh[key(e)] = 'done';
    for (const k of rejected) eh[k] = 'muted';
    const gv: GraphVisual = { kind: 'graph', title: `MST: cạnh xanh đã chọn, tổng = ${total}`, nodes: g.nodes, edges: edges.map((e) => ({ ...e, directed: false })), highlights: hl, edgeHighlights: { ...eh, ...edgeHl } };
    const groups: Record<string, string> = {};
    for (const v of nodes) groups[v] = find(v);
    return composite([gv, composite([arr(sorted.map((e) => `${e.from}-${e.to}:${e.weight}`), { title: 'Cạnh đã sắp xếp theo trọng số', highlights: listHl }), mapViz(groups, undefined, 'find(v): gốc của thành phần')], 'column')]);
  };
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  yield frame(20, { edges: sorted.length, nodes: nodes.length }, viz(), `Sắp xếp ${edges.length} cạnh tăng dần theo trọng số. Tham lam: luôn xét cạnh rẻ nhất chưa xét. Mỗi đỉnh ban đầu là một thành phần riêng.`);
  for (let i = 0; i < sorted.length; i++) {
    const e = sorted[i];
    const ra = find(e.from);
    const rb = find(e.to);
    yield frame(25, { edge: `${e.from}-${e.to}`, weight: e.weight, 'find(from)': ra, 'find(to)': rb }, viz({ [e.from]: 'compare', [e.to]: 'compare' }, { [key(e)]: 'compare' }, { [i]: 'compare' }), `Xét cạnh ${e.from}-${e.to} (w=${e.weight}): find(${e.from}) = ${ra}, find(${e.to}) = ${rb}. ${ra === rb ? 'Cùng thành phần ⇒ thêm vào sẽ tạo CHU TRÌNH ⇒ bỏ.' : 'Khác thành phần ⇒ cạnh rẻ nhất nối hai thành phần ⇒ chọn (cut property).'}`);
    if (ra === rb) {
      rejected.add(key(e));
      yield frame(26, { edge: `${e.from}-${e.to}`, skipped: true }, viz({}, {}, { [i]: 'muted' }), `Bỏ cạnh ${e.from}-${e.to}.`);
      continue;
    }
    parent.set(rb, ra);
    chosen.push(e);
    total += e.weight;
    yield frame(29, { edge: `${e.from}-${e.to}`, total, chosen: chosen.length }, viz({ [e.from]: 'done', [e.to]: 'done' }, { [key(e)]: 'swap' }, { [i]: 'done' }), `Chọn ${e.from}-${e.to}, gộp hai thành phần (parent[${rb}] = ${ra}). Tổng = ${total}, đã có ${chosen.length}/${nodes.length - 1} cạnh.`);
    if (chosen.length === nodes.length - 1) {
      yield frame(30, { chosen: chosen.length }, viz(), `Đủ V − 1 = ${nodes.length - 1} cạnh ⇒ cây khung hoàn chỉnh, dừng sớm (các cạnh còn lại đều tạo chu trình).`);
      break;
    }
  }
  const ok = chosen.length === nodes.length - 1;
  yield frame(32, { total, edges: chosen.map((e) => `${e.from}-${e.to}`), connected: ok }, viz(), ok ? `MST: ${chosen.map((e) => `${e.from}-${e.to}`).join(', ')}, tổng trọng số ${total}.` : `Chỉ ${chosen.length} cạnh < V − 1 ⇒ đồ thị không liên thông, không có cây khung (đây là rừng khung nhỏ nhất). Trả về null.`);
  return ok ? { edges: chosen, total } : null;
}
