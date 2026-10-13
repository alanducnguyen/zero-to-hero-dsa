import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'floyd-warshall',
  title: 'Floyd–Warshall',
  subtitle: 'Đường đi ngắn nhất mọi cặp đỉnh – DP O(V³) trên tập đỉnh trung gian, chịu được cạnh âm',
  level: 'advanced',
  category: 'Graph',
  tags: ['graph', 'shortest-path', 'dp', 'all-pairs'],
  companies: ['Google', 'Amazon', 'Microsoft', 'Grab', 'Uber'],
  complexity: { time: 'O(V³)', space: 'O(V²)', best: 'O(V³)', worst: 'O(V³)' },
  leetcode: [
    { id: 1334, title: 'Find the City With the Smallest Number of Neighbors', slug: 'find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance' },
    { id: 1462, title: 'Course Schedule IV', slug: 'course-schedule-iv' },
    { id: 399, title: 'Evaluate Division', slug: 'evaluate-division' },
    { id: 2976, title: 'Minimum Cost to Convert String I', slug: 'minimum-cost-to-convert-string-i' },
  ],
  inputs: [
    {
      key: 'graph',
      label: 'Đồ thị có hướng (≤ 5 đỉnh)',
      type: 'graph',
      default: {
        directed: true,
        nodes: [
          { id: 'A', x: 60, y: 60 },
          { id: 'B', x: 260, y: 60 },
          { id: 'C', x: 60, y: 200 },
          { id: 'D', x: 260, y: 200 },
        ],
        edges: [
          { from: 'A', to: 'B', weight: 3 },
          { from: 'A', to: 'D', weight: 7 },
          { from: 'B', to: 'A', weight: 8 },
          { from: 'B', to: 'C', weight: 2 },
          { from: 'C', to: 'A', weight: 5 },
          { from: 'C', to: 'D', weight: 1 },
          { from: 'D', to: 'A', weight: 2 },
        ],
      },
    },
  ],
  presets: [
    {
      label: 'Cạnh âm (không chu trình âm)',
      values: {
        graph: {
          directed: true,
          nodes: [{ id: 'S', x: 60, y: 120 }, { id: 'X', x: 200, y: 40 }, { id: 'Y', x: 200, y: 200 }, { id: 'T', x: 340, y: 120 }],
          edges: [{ from: 'S', to: 'X', weight: 4 }, { from: 'S', to: 'Y', weight: 2 }, { from: 'X', to: 'T', weight: 1 }, { from: 'Y', to: 'X', weight: -3 }, { from: 'Y', to: 'T', weight: 5 }],
        },
      },
    },
    {
      label: 'Vô hướng, có đỉnh cô lập',
      values: {
        graph: {
          nodes: [{ id: 'P', x: 60, y: 60 }, { id: 'Q', x: 200, y: 60 }, { id: 'R', x: 130, y: 180 }, { id: 'Z', x: 330, y: 120 }],
          edges: [{ from: 'P', to: 'Q', weight: 6 }, { from: 'P', to: 'R', weight: 1 }, { from: 'R', to: 'Q', weight: 2 }],
        },
      },
    },
  ],
};
