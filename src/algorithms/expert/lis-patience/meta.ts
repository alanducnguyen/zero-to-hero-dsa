import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'lis-patience',
  title: 'LIS O(n log n)',
  subtitle: 'Longest Increasing Subsequence bằng patience sorting + binary search – nâng cấp từ DP O(n²)',
  level: 'expert',
  category: 'Dynamic Programming',
  tags: ['dp', 'binary-search', 'lis', 'patience-sorting', 'subsequence'],
  companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Airbnb'],
  complexity: { time: 'O(n log n)', space: 'O(n)', best: 'O(n log n)', worst: 'O(n log n)' },
  leetcode: [
    { id: 300, title: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence' },
    { id: 354, title: 'Russian Doll Envelopes', slug: 'russian-doll-envelopes' },
    { id: 673, title: 'Number of Longest Increasing Subsequence', slug: 'number-of-longest-increasing-subsequence' },
    { id: 1964, title: 'Longest Valid Obstacle Course', slug: 'find-the-longest-valid-obstacle-course-at-each-position' },
  ],
  inputs: [{ key: 'nums', label: 'Mảng', type: 'number[]', default: [10, 9, 2, 5, 3, 7, 101, 18], min: -99, max: 999, maxLength: 14 }],
  presets: [
    { label: 'Giảm dần (LIS = 1)', values: { nums: [5, 4, 3, 2, 1] } },
    { label: 'tails ≠ LIS thật', values: { nums: [3, 4, 5, 1, 2] } },
    { label: 'Trùng lặp', values: { nums: [2, 2, 2, 3, 3] } },
  ],
};
