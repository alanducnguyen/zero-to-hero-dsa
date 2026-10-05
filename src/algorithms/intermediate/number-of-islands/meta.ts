import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'number-of-islands',
  title: 'Number of Islands (DFS)',
  subtitle: 'Flood fill – đếm thành phần liên thông trên lưới bằng DFS, bài đồ thị ngụy trang phổ biến nhất',
  level: 'intermediate',
  category: 'Graph',
  tags: ['dfs', 'grid', 'flood-fill', 'connected-components', 'recursion'],
  companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg', 'LinkedIn'],
  complexity: { time: 'O(m·n)', space: 'O(m·n)', best: 'O(m·n)', worst: 'O(m·n)' },
  leetcode: [
    { id: 200, title: 'Number of Islands', slug: 'number-of-islands' },
    { id: 695, title: 'Max Area of Island', slug: 'max-area-of-island' },
    { id: 733, title: 'Flood Fill', slug: 'flood-fill' },
    { id: 130, title: 'Surrounded Regions', slug: 'surrounded-regions' },
    { id: 547, title: 'Number of Provinces', slug: 'number-of-provinces' },
  ],
  inputs: [
    {
      key: 'grid',
      label: 'Lưới (1 = đất, 0 = nước), mỗi dòng một hàng',
      type: 'grid',
      default: [
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 1],
        [0, 0, 1, 0, 1],
        [0, 0, 0, 1, 1],
      ],
    },
  ],
  presets: [
    { label: 'Một đảo lớn', values: { grid: [[1, 1, 1], [0, 1, 0], [1, 1, 1]] } },
    { label: 'Chéo không nối', values: { grid: [[1, 0, 1], [0, 1, 0], [1, 0, 1]] } },
    { label: 'Toàn nước', values: { grid: [[0, 0], [0, 0]] } },
  ],
};
