import { bellmanFord, type Edge } from './impl';

export interface GraphInput {
  nodes: { id: string; x: number; y: number }[];
  edges: { from: string; to: string; weight?: number }[];
  directed?: boolean;
}

/** Chuyển đồ thị (dạng vẽ) thành danh sách cạnh; vô hướng ⇒ hai cạnh ngược chiều. */
export function toEdges(g: GraphInput): Edge[] {
  const out: Edge[] = [];
  for (const e of g.edges) {
    const w = e.weight ?? 1;
    out.push({ from: e.from, to: e.to, weight: w });
    if (!g.directed) out.push({ from: e.to, to: e.from, weight: w });
  }
  return out;
}

export const run = (input: { graph: GraphInput; source: string }) => {
  const ids = input.graph.nodes.map((n) => n.id);
  const source = ids.includes(input.source) ? input.source : ids[0];
  return bellmanFord(ids, toEdges(input.graph), source);
};
