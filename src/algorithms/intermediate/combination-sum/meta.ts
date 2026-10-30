import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'combination-sum',
  title: 'Combination Sum (Backtracking)',
  subtitle: 'Tìm mọi tổ hợp có tổng = target, được dùng lại phần tử – start index + cắt tỉa khi đã sort',
  level: 'intermediate',
  category: 'Backtracking',
  tags: ['backtracking', 'recursion', 'combinatorics', 'pruning'],
  companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Airbnb'],
  complexity: { time: 'O(n^(T/m + 1))', space: 'O(T/m) stack + output', best: 'O(n log n)', worst: 'O(n^(T/m + 1))' },
  leetcode: [
    { id: 39, title: 'Combination Sum', slug: 'combination-sum' },
    { id: 40, title: 'Combination Sum II', slug: 'combination-sum-ii' },
    { id: 216, title: 'Combination Sum III', slug: 'combination-sum-iii' },
    { id: 377, title: 'Combination Sum IV', slug: 'combination-sum-iv' },
  ],
  inputs: [
    { key: 'candidates', label: 'Candidates (số dương, khác nhau)', type: 'number[]', default: [2, 3, 6, 7], min: 1, max: 20, maxLength: 6 },
    { key: 'target', label: 'Target', type: 'number', default: 7, min: 1, max: 12 },
  ],
  presets: [
    { label: 'Nhiều đáp án', values: { candidates: [2, 3, 5], target: 8 } },
    { label: 'Chưa sort', values: { candidates: [7, 3, 2], target: 9 } },
    { label: 'Không có đáp án', values: { candidates: [2], target: 3 } },
  ],
};
