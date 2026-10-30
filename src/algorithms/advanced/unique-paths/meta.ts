import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'unique-paths',
  title: 'Unique Paths (có vật cản)',
  subtitle: 'DP trên lưới: số đường tới một ô = đường từ trên + đường từ trái',
  level: 'advanced',
  category: 'Dynamic Programming',
  tags: ['dp', '2d-dp', 'grid', 'combinatorics'],
  companies: ['Google', 'Amazon', 'Meta', 'Bloomberg', 'Microsoft'],
  complexity: { time: 'O(m·n)', space: 'O(m·n) → O(n)', best: 'O(m·n)', worst: 'O(m·n)' },
  leetcode: [
    { id: 62, title: 'Unique Paths', slug: 'unique-paths' },
    { id: 63, title: 'Unique Paths II', slug: 'unique-paths-ii' },
    { id: 64, title: 'Minimum Path Sum', slug: 'minimum-path-sum' },
    { id: 980, title: 'Unique Paths III', slug: 'unique-paths-iii' },
  ],
  inputs: [
    {
      key: 'grid',
      label: 'Lưới (0 = trống, 1 = vật cản), mỗi dòng một hàng',
      type: 'grid',
      default: [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
      ],
    },
  ],
  presets: [
    { label: 'Không vật cản 3×7 (= C(8,2))', values: { grid: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]] } },
    { label: 'Bị chặn hoàn toàn', values: { grid: [[0, 0, 1], [0, 1, 0], [1, 0, 0]] } },
    { label: 'LeetCode 63 ví dụ', values: { grid: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] } },
  ],
};
