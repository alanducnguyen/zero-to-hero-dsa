import { isBipartite } from './impl';

export interface GraphInput {
  nodes: { id: string; x: number; y: number }[];
  edges: { from: string; to: string; weight?: number }[];
  directed?: boolean;
}

/** Đồ thị vô hướng → danh sách kề (bỏ qua trọng số). */
export function toAdjacency(g: GraphInput): Record<string, string[]> {
  const adj: Record<string, string[]> = {};
  for (const n of g.nodes) adj[n.id] = [];
  for (const e of g.edges) {
    (adj[e.from] ??= []).push(e.to);
    (adj[e.to] ??= []).push(e.from);
  }
  return adj;
}

export const run = (input: { graph: GraphInput }) => isBipartite(toAdjacency(input.graph));
