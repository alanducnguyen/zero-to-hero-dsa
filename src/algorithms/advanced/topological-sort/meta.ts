import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'topological-sort',
  title: 'Topological Sort (Kahn)',
  subtitle: 'Sắp xếp topo trên DAG bằng bậc vào – xếp lịch, giải phụ thuộc, phát hiện chu trình',
  level: 'advanced',
  category: 'Graph',
  tags: ['graph', 'topological-sort', 'bfs', 'dag', 'kahn'],
  companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Airbnb'],
  complexity: { time: 'O(V + E)', space: 'O(V)', best: 'O(V + E)', worst: 'O(V + E)' },
  leetcode: [
    { id: 207, title: 'Course Schedule', slug: 'course-schedule' },
    { id: 210, title: 'Course Schedule II', slug: 'course-schedule-ii' },
    { id: 269, title: 'Alien Dictionary', slug: 'alien-dictionary' },
    { id: 310, title: 'Minimum Height Trees', slug: 'minimum-height-trees' },
  ],
  inputs: [
    {
      key: 'graph',
      label: 'Đồ thị có hướng (JSON)',
      type: 'graph',
      default: {
        directed: true,
        nodes: [
          { id: 'A', x: 60, y: 60 },
          { id: 'B', x: 60, y: 180 },
          { id: 'C', x: 200, y: 120 },
          { id: 'D', x: 340, y: 60 },
          { id: 'E', x: 340, y: 180 },
          { id: 'F', x: 470, y: 120 },
        ],
        edges: [
          { from: 'A', to: 'C' },
          { from: 'B', to: 'C' },
          { from: 'C', to: 'D' },
          { from: 'C', to: 'E' },
          { from: 'D', to: 'F' },
          { from: 'E', to: 'F' },
          { from: 'B', to: 'E' },
        ],
      },
    },
  ],
  presets: [
    {
      label: 'Có chu trình',
      values: {
        graph: {
          directed: true,
          nodes: [{ id: 'A', x: 60, y: 100 }, { id: 'B', x: 200, y: 40 }, { id: 'C', x: 200, y: 160 }, { id: 'D', x: 340, y: 100 }],
          edges: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'B' }, { from: 'C', to: 'D' }],
        },
      },
    },
  ],
};
