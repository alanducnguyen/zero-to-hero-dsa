import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'bfs-grid-shortest-path',
  title: 'BFS – Shortest Path trên lưới',
  subtitle: 'Breadth-First Search: đường đi ngắn nhất khi mọi bước có chi phí bằng nhau',
  level: 'advanced',
  category: 'Graph',
  tags: ['bfs', 'graph', 'grid', 'queue', 'shortest-path'],
  companies: ['Google', 'Meta', 'Amazon', 'Uber', 'Microsoft'],
  complexity: { time: 'O(m·n)', space: 'O(m·n)', best: 'O(1)', worst: 'O(m·n)' },
  leetcode: [
    { id: 1091, title: 'Shortest Path in Binary Matrix', slug: 'shortest-path-in-binary-matrix' },
    { id: 994, title: 'Rotting Oranges', slug: 'rotting-oranges' },
    { id: 200, title: 'Number of Islands', slug: 'number-of-islands' },
    { id: 127, title: 'Word Ladder', slug: 'word-ladder' },
  ],
  inputs: [
    {
      key: 'grid',
      label: 'Lưới (0 = đi được, 1 = tường), mỗi dòng một hàng',
      type: 'grid',
      default: [
        [0, 0, 0, 1, 0, 0],
        [1, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0],
      ],
    },
  ],
  presets: [
    { label: 'Không có đường', values: { grid: [[0, 1, 0], [1, 1, 0], [0, 0, 0]] } },
    { label: 'Lưới trống 4×4', values: { grid: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] } },
  ],
};
