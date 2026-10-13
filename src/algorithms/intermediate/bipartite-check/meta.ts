import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'bipartite-check',
  title: 'Is Graph Bipartite? (tô 2 màu)',
  subtitle: 'BFS tô màu xen kẽ – bipartite ⟺ không có chu trình lẻ; nền của matching và phân nhóm',
  level: 'intermediate',
  category: 'Graph',
  tags: ['graph', 'bfs', 'coloring', 'bipartite'],
  companies: ['Meta', 'Google', 'Amazon', 'Bloomberg', 'LinkedIn'],
  complexity: { time: 'O(V + E)', space: 'O(V)', best: 'O(V)', worst: 'O(V + E)' },
  leetcode: [
    { id: 785, title: 'Is Graph Bipartite?', slug: 'is-graph-bipartite' },
    { id: 886, title: 'Possible Bipartition', slug: 'possible-bipartition' },
    { id: 1042, title: 'Flower Planting With No Adjacent', slug: 'flower-planting-with-no-adjacent' },
  ],
  inputs: [
    {
      key: 'graph',
      label: 'Đồ thị vô hướng',
      type: 'graph',
      default: {
        nodes: [
          { id: 'A', x: 60, y: 60 },
          { id: 'B', x: 220, y: 60 },
          { id: 'C', x: 380, y: 60 },
          { id: 'D', x: 60, y: 200 },
          { id: 'E', x: 220, y: 200 },
          { id: 'F', x: 380, y: 200 },
        ],
        edges: [
          { from: 'A', to: 'E' },
          { from: 'B', to: 'D' },
          { from: 'B', to: 'F' },
          { from: 'C', to: 'E' },
          { from: 'D', to: 'C' },
        ],
      },
    },
  ],
  presets: [
    {
      label: 'Chu trình lẻ (tam giác)',
      values: {
        graph: {
          nodes: [{ id: 'A', x: 80, y: 60 }, { id: 'B', x: 260, y: 60 }, { id: 'C', x: 170, y: 200 }, { id: 'D', x: 400, y: 200 }],
          edges: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'A' }, { from: 'B', to: 'D' }],
        },
      },
    },
    {
      label: 'Nhiều thành phần + đỉnh cô lập',
      values: {
        graph: {
          nodes: [{ id: 'P', x: 60, y: 60 }, { id: 'Q', x: 200, y: 60 }, { id: 'R', x: 60, y: 200 }, { id: 'S', x: 200, y: 200 }, { id: 'X', x: 360, y: 60 }, { id: 'Y', x: 360, y: 200 }, { id: 'Z', x: 480, y: 130 }],
          edges: [{ from: 'P', to: 'Q' }, { from: 'Q', to: 'S' }, { from: 'S', to: 'R' }, { from: 'R', to: 'P' }, { from: 'X', to: 'Y' }],
        },
      },
    },
  ],
};
