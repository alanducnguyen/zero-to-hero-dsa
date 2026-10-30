import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'rotting-oranges',
  title: 'Rotting Oranges',
  subtitle: 'Multi-source BFS theo tầng: mọi nguồn lan song song, số tầng = số phút',
  level: 'advanced',
  category: 'Graph',
  tags: ['bfs', 'multi-source-bfs', 'grid', 'queue', 'simulation'],
  companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Bloomberg'],
  complexity: { time: 'O(m·n)', space: 'O(m·n)', best: 'O(m·n)', worst: 'O(m·n)' },
  leetcode: [
    { id: 994, title: 'Rotting Oranges', slug: 'rotting-oranges' },
    { id: 542, title: '01 Matrix', slug: '01-matrix' },
    { id: 286, title: 'Walls and Gates', slug: 'walls-and-gates' },
    { id: 1162, title: 'As Far from Land as Possible', slug: 'as-far-from-land-as-possible' },
  ],
  inputs: [
    {
      key: 'grid',
      label: 'Lưới (0 = trống, 1 = cam tươi, 2 = cam thối), mỗi dòng một hàng',
      type: 'grid',
      default: [
        [2, 1, 1, 0],
        [1, 1, 0, 1],
        [0, 1, 1, 1],
        [2, 1, 1, 1],
      ],
    },
  ],
  presets: [
    { label: 'LeetCode ví dụ 1 (4 phút)', values: { grid: [[2, 1, 1], [1, 1, 0], [0, 1, 1]] } },
    { label: 'Cam bị cô lập (-1)', values: { grid: [[2, 1, 1], [0, 1, 1], [1, 0, 1]] } },
    { label: 'Không có cam tươi (0)', values: { grid: [[0, 2], [2, 0]] } },
  ],
};
