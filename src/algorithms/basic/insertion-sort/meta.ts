import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'insertion-sort',
  title: 'Insertion Sort',
  subtitle: 'Sắp xếp chèn – thuật toán O(n²) nhanh nhất thực tế, được dùng bên trong Quick/Merge/Tim Sort',
  level: 'basic',
  category: 'Sorting',
  tags: ['sorting', 'in-place', 'stable', 'adaptive', 'online'],
  companies: ['Câu hỏi khởi động', 'Hỏi kèm khi bàn về TimSort / introsort'],
  complexity: { time: 'O(n²)', space: 'O(1)', best: 'O(n)', worst: 'O(n²)' },
  leetcode: [
    { id: 147, title: 'Insertion Sort List', slug: 'insertion-sort-list' },
    { id: 912, title: 'Sort an Array', slug: 'sort-an-array' },
    { id: 1051, title: 'Height Checker', slug: 'height-checker' },
  ],
  inputs: [{ key: 'array', label: 'Mảng', type: 'number[]', default: [12, 11, 13, 5, 6, 7], min: -99, max: 99, maxLength: 14 }],
  presets: [
    { label: 'Gần sắp xếp (best)', values: { array: [1, 2, 4, 3, 5, 6] } },
    { label: 'Ngược (worst)', values: { array: [6, 5, 4, 3, 2, 1] } },
    { label: 'Trùng lặp', values: { array: [3, 1, 3, 2, 1] } },
  ],
};
