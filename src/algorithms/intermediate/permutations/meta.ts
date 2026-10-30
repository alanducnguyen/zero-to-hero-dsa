import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'permutations',
  title: 'Permutations (Backtracking)',
  subtitle: 'Sinh n! hoán vị bằng used[] + path – khung backtracking cho bài sắp thứ tự',
  level: 'intermediate',
  category: 'Backtracking',
  tags: ['backtracking', 'recursion', 'combinatorics', 'permutation'],
  companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'LinkedIn'],
  complexity: { time: 'O(n · n!)', space: 'O(n) stack + output', best: 'O(n · n!)', worst: 'O(n · n!)' },
  leetcode: [
    { id: 46, title: 'Permutations', slug: 'permutations' },
    { id: 47, title: 'Permutations II', slug: 'permutations-ii' },
    { id: 31, title: 'Next Permutation', slug: 'next-permutation' },
    { id: 60, title: 'Permutation Sequence', slug: 'permutation-sequence' },
  ],
  inputs: [{ key: 'nums', label: 'Mảng (≤ 4 phần tử, khác nhau)', type: 'number[]', default: [1, 2, 3], min: 0, max: 9, maxLength: 4 }],
  presets: [
    { label: '4 phần tử', values: { nums: [1, 2, 3, 4] } },
    { label: 'Hai phần tử', values: { nums: [0, 1] } },
    { label: 'Một phần tử', values: { nums: [5] } },
  ],
};
