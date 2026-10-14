import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'subsets',
  title: 'Subsets (Backtracking)',
  subtitle: 'Liệt kê 2ⁿ tập con bằng chọn / bỏ chọn – khung backtracking dùng cho cả họ bài tổ hợp',
  level: 'intermediate',
  category: 'Backtracking',
  tags: ['backtracking', 'recursion', 'combinatorics', 'power-set'],
  companies: ['Meta', 'Amazon', 'Google', 'Bloomberg', 'Uber'],
  complexity: { time: 'O(n · 2ⁿ)', space: 'O(n) stack + output', best: 'O(2ⁿ)', worst: 'O(n · 2ⁿ)' },
  leetcode: [
    { id: 78, title: 'Subsets', slug: 'subsets' },
    { id: 90, title: 'Subsets II', slug: 'subsets-ii' },
    { id: 77, title: 'Combinations', slug: 'combinations' },
    { id: 46, title: 'Permutations', slug: 'permutations' },
    { id: 39, title: 'Combination Sum', slug: 'combination-sum' },
  ],
  inputs: [{ key: 'nums', label: 'Mảng (≤ 4 phần tử, khác nhau)', type: 'number[]', default: [1, 2, 3], min: 0, max: 9, maxLength: 4 }],
  presets: [
    { label: '4 phần tử', values: { nums: [1, 2, 3, 4] } },
    { label: 'Một phần tử', values: { nums: [7] } },
    { label: 'Rỗng', values: { nums: [] } },
  ],
};
