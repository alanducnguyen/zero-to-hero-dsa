import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'kruskal-mst',
  title: 'Kruskal (MST)',
  subtitle: 'Cây khung nhỏ nhất bằng tham lam + Union-Find – tính chất cut và vì sao tham lam đúng',
  level: 'advanced',
  category: 'Graph',
  tags: ['graph', 'mst', 'greedy', 'union-find', 'kruskal'],
  companies: ['Google', 'Amazon', 'Microsoft', 'Uber', 'Palantir'],
  complexity: { time: 'O(E log E)', space: 'O(V + E)', best: 'O(E log E)', worst: 'O(E log E)' },
  leetcode: [
    { id: 1584, title: 'Min Cost to Connect All Points', slug: 'min-cost-to-connect-all-points' },
    { id: 1135, title: 'Connecting Cities With Minimum Cost', slug: 'connecting-cities-with-minimum-cost' },
    { id: 1168, title: 'Optimize Water Distribution in a Village', slug: 'optimize-water-distribution-in-a-village' },
    { id: 1489, title: 'Find Critical and Pseudo-Critical Edges in MST', slug: 'find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree' },
  ],
  inputs: [
    {
      key: 'graph',
      label: 'Đồ thị vô hướng có trọng số (JSON)',
      type: 'graph',
      default: {
        nodes: [
          { id: 'A', x: 60, y: 60 }, { id: 'B', x: 200, y: 40 }, { id: 'C', x: 340, y: 60 },
          { id: 'D', x: 60, y: 200 }, { id: 'E', x: 200, y: 220 }, { id: 'F', x: 340, y: 200 },
        ],
        edges: [
          { from: 'A', to: 'B', weight: 4 }, { from: 'A', to: 'D', weight: 2 }, { from: 'B', to: 'C', weight: 6 },
          { from: 'B', to: 'D', weight: 5 }, { from: 'B', to: 'E', weight: 3 }, { from: 'C', to: 'E', weight: 1 },
          { from: 'C', to: 'F', weight: 7 }, { from: 'D', to: 'E', weight: 8 }, { from: 'E', to: 'F', weight: 9 },
        ],
      },
    },
  ],
  presets: [
    {
      label: 'Không liên thông',
      values: {
        graph: {
          nodes: [{ id: 'A', x: 60, y: 100 }, { id: 'B', x: 180, y: 100 }, { id: 'C', x: 320, y: 100 }, { id: 'D', x: 440, y: 100 }],
          edges: [{ from: 'A', to: 'B', weight: 1 }, { from: 'C', to: 'D', weight: 2 }],
        },
      },
    },
  ],
};
