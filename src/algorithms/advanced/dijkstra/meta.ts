import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'dijkstra',
  title: 'Dijkstra',
  subtitle: 'Đường đi ngắn nhất một nguồn trên đồ thị trọng số không âm – thuật toán tham lam với priority queue',
  level: 'advanced',
  category: 'Graph',
  tags: ['graph', 'shortest-path', 'greedy', 'priority-queue', 'heap'],
  companies: ['Google', 'Uber', 'Lyft', 'Amazon', 'Microsoft', 'Grab'],
  complexity: { time: 'O((V+E) log V)', space: 'O(V+E)', best: 'O(V log V)', worst: 'O((V+E) log V)' },
  leetcode: [
    { id: 743, title: 'Network Delay Time', slug: 'network-delay-time' },
    { id: 787, title: 'Cheapest Flights Within K Stops', slug: 'cheapest-flights-within-k-stops' },
    { id: 1631, title: 'Path With Minimum Effort', slug: 'path-with-minimum-effort' },
    { id: 1514, title: 'Path with Maximum Probability', slug: 'path-with-maximum-probability' },
  ],
  inputs: [
    {
      key: 'graph',
      label: 'Đồ thị (JSON: nodes có toạ độ x,y; edges có weight)',
      type: 'graph',
      default: {
        nodes: [
          { id: 'A', x: 60, y: 120 },
          { id: 'B', x: 180, y: 40 },
          { id: 'C', x: 180, y: 200 },
          { id: 'D', x: 310, y: 120 },
          { id: 'E', x: 430, y: 50 },
          { id: 'F', x: 430, y: 200 },
        ],
        edges: [
          { from: 'A', to: 'B', weight: 4 },
          { from: 'A', to: 'C', weight: 2 },
          { from: 'B', to: 'C', weight: 5 },
          { from: 'B', to: 'D', weight: 10 },
          { from: 'C', to: 'D', weight: 3 },
          { from: 'D', to: 'E', weight: 4 },
          { from: 'D', to: 'F', weight: 11 },
          { from: 'E', to: 'F', weight: 2 },
        ],
      },
    },
    { key: 'source', label: 'Đỉnh nguồn', type: 'string', default: 'A', maxLength: 3 },
  ],
  presets: [
    {
      label: 'Có hướng, đỉnh cô lập',
      values: {
        graph: {
          directed: true,
          nodes: [{ id: 'S', x: 60, y: 100 }, { id: 'X', x: 200, y: 40 }, { id: 'Y', x: 200, y: 160 }, { id: 'T', x: 340, y: 100 }, { id: 'Z', x: 460, y: 100 }],
          edges: [{ from: 'S', to: 'X', weight: 7 }, { from: 'S', to: 'Y', weight: 1 }, { from: 'Y', to: 'X', weight: 2 }, { from: 'X', to: 'T', weight: 1 }, { from: 'Y', to: 'T', weight: 8 }, { from: 'Z', to: 'T', weight: 1 }],
        },
        source: 'S',
      },
    },
  ],
};
