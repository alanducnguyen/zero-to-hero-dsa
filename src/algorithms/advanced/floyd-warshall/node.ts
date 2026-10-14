import { floydWarshall } from './impl';

export interface GraphInput {
  nodes: { id: string; x: number; y: number }[];
  edges: { from: string; to: string; weight?: number }[];
  directed?: boolean;
}

/** Chuyển đồ thị (dạng vẽ) thành danh sách cạnh theo chỉ số. */
export function toEdgeList(g: GraphInput): { ids: string[]; edges: [number, number, number][] } {
  const ids = g.nodes.map((n) => n.id);
  const idx = new Map(ids.map((id, i) => [id, i]));
  const edges: [number, number, number][] = [];
  for (const e of g.edges) {
    const u = idx.get(e.from);
    const v = idx.get(e.to);
    if (u === undefined || v === undefined) continue;
    const w = e.weight ?? 1;
    edges.push([u, v, w]);
    if (!g.directed) edges.push([v, u, w]);
  }
  return { ids, edges };
}

export const run = (input: { graph: GraphInput }) => {
  const { ids, edges } = toEdgeList(input.graph);
  return floydWarshall(ids.length, edges);
};
