import { kruskal } from './impl';
export interface GraphInput {
  nodes: { id: string; x: number; y: number }[];
  edges: { from: string; to: string; weight?: number }[];
  directed?: boolean;
}
export const run = (input: { graph: GraphInput }) => kruskal(input.graph.nodes.map((n) => n.id), input.graph.edges.map((e) => ({ from: e.from, to: e.to, weight: e.weight ?? 1 })));
