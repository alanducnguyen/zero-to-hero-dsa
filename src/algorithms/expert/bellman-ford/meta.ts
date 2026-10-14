import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'bellman-ford',
  title: 'Bellman-Ford',
  subtitle: 'Đường đi ngắn nhất một nguồn với cạnh âm – relax V−1 vòng, phát hiện chu trình âm',
  level: 'expert',
  category: 'Graph',
  tags: ['graph', 'shortest-path', 'negative-weight', 'dp', 'relaxation'],
  companies: ['Google', 'Amazon', 'Microsoft', 'Goldman Sachs', 'Two Sigma'],
  complexity: { time: 'O(V·E)', space: 'O(V)', best: 'O(E)', worst: 'O(V·E)' },
  leetcode: [
    { id: 787, title: 'Cheapest Flights Within K Stops', slug: 'cheapest-flights-within-k-stops' },
    { id: 743, title: 'Network Delay Time', slug: 'network-delay-time' },
    { id: 1334, title: 'Find the City With the Smallest Number of Neighbors', slug: 'find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance' },
  ],
  inputs: [
    {
      key: 'graph',
      label: 'Đồ thị có hướng (edges có weight, cho phép âm)',
      type: 'graph',
      default: {
        directed: true,
        nodes: [
          { id: 'S', x: 60, y: 120 },
          { id: 'A', x: 200, y: 40 },
          { id: 'B', x: 200, y: 200 },
          { id: 'C', x: 340, y: 40 },
          { id: 'D', x: 340, y: 200 },
        ],
        edges: [
          { from: 'S', to: 'A', weight: 4 },
          { from: 'S', to: 'B', weight: 5 },
          { from: 'A', to: 'C', weight: 3 },
          { from: 'B', to: 'A', weight: -3 },
          { from: 'B', to: 'D', weight: 2 },
          { from: 'C', to: 'D', weight: -4 },
          { from: 'D', to: 'C', weight: 6 },
        ],
      },
    },
    { key: 'source', label: 'Đỉnh nguồn', type: 'string', default: 'S', maxLength: 3 },
  ],
  presets: [
    {
      label: 'Chu trình âm',
      values: {
        graph: {
          directed: true,
          nodes: [{ id: 'S', x: 60, y: 120 }, { id: 'X', x: 200, y: 40 }, { id: 'Y', x: 340, y: 120 }, { id: 'Z', x: 200, y: 200 }],
          edges: [{ from: 'S', to: 'X', weight: 1 }, { from: 'X', to: 'Y', weight: 2 }, { from: 'Y', to: 'Z', weight: -5 }, { from: 'Z', to: 'X', weight: 1 }],
        },
        source: 'S',
      },
    },
    {
      label: 'Hội tụ sớm, đỉnh cô lập',
      values: {
        graph: {
          directed: true,
          nodes: [{ id: 'S', x: 60, y: 100 }, { id: 'P', x: 200, y: 100 }, { id: 'Q', x: 340, y: 100 }, { id: 'R', x: 200, y: 220 }],
          edges: [{ from: 'S', to: 'P', weight: 2 }, { from: 'P', to: 'Q', weight: 3 }, { from: 'S', to: 'Q', weight: 10 }],
        },
        source: 'S',
      },
    },
  ],
};
