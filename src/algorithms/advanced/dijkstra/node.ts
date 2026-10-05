import { dijkstra, type Edge } from './impl';

export interface GraphInput {
  nodes: { id: string; x: number; y: number }[];
  edges: { from: string; to: string; weight?: number }[];
  directed?: boolean;
}

/** Chuyển input đồ thị (dạng vẽ) thành danh sách kề. */
export function toAdjacency(g: GraphInput): Record<string, Edge[]> {
  const adj: Record<string, Edge[]> = {};
  for (const n of g.nodes) adj[n.id] = [];
  for (const e of g.edges) {
    const w = e.weight ?? 1;
    (adj[e.from] ??= []).push({ to: e.to, weight: w });
    if (!g.directed) (adj[e.to] ??= []).push({ to: e.from, weight: w });
  }
  return adj;
}

export const run = (input: { graph: GraphInput; source: string }) => dijkstra(toAdjacency(input.graph), input.source);
