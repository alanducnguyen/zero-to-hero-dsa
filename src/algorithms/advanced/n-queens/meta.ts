import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'n-queens',
  title: 'N-Queens (Backtracking)',
  subtitle: 'Bài mẫu của backtracking: thử – kiểm tra – quay lui, với cắt tỉa bằng ba tập cột/chéo',
  level: 'advanced',
  category: 'Backtracking',
  tags: ['backtracking', 'recursion', 'pruning', 'combinatorial'],
  companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Zenefits'],
  complexity: { time: 'O(n!)', space: 'O(n)', best: 'O(n)', worst: 'O(n!)' },
  leetcode: [
    { id: 51, title: 'N-Queens', slug: 'n-queens' },
    { id: 52, title: 'N-Queens II', slug: 'n-queens-ii' },
    { id: 46, title: 'Permutations', slug: 'permutations' },
    { id: 78, title: 'Subsets', slug: 'subsets' },
    { id: 37, title: 'Sudoku Solver', slug: 'sudoku-solver' },
  ],
  inputs: [{ key: 'n', label: 'n (1–6 để xem từng bước)', type: 'number', default: 4, min: 1, max: 6 }],
  presets: [
    { label: 'n = 5', values: { n: 5 } },
    { label: 'n = 3 (vô nghiệm)', values: { n: 3 } },
    { label: 'n = 6', values: { n: 6 } },
  ],
};
