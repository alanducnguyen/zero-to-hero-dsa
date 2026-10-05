import { topologicalSort } from './impl';

export interface GraphInput {
  nodes: { id: string; x: number; y: number }[];
  edges: { from: string; to: string; weight?: number }[];
  directed?: boolean;
}

export function toAdjacency(g: GraphInput): Record<string, string[]> {
  const adj: Record<string, string[]> = {};
  for (const n of g.nodes) adj[n.id] = [];
  for (const e of g.edges) (adj[e.from] ??= []).push(e.to);
  return adj;
}

export const run = (input: { graph: GraphInput }) => topologicalSort(toAdjacency(input.graph));
