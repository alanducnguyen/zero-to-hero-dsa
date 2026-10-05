import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'quick-sort',
  title: 'Quick Sort',
  subtitle: 'Chia để trị với partition – thuật toán sắp xếp nhanh nhất trong thực tế',
  level: 'intermediate',
  category: 'Sorting',
  tags: ['sorting', 'divide-and-conquer', 'recursion', 'in-place', 'partition'],
  companies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Uber'],
  complexity: { time: 'O(n log n)', space: 'O(log n)', best: 'O(n log n)', worst: 'O(n²)' },
  leetcode: [
    { id: 912, title: 'Sort an Array', slug: 'sort-an-array' },
    { id: 215, title: 'Kth Largest Element in an Array', slug: 'kth-largest-element-in-an-array' },
    { id: 75, title: 'Sort Colors', slug: 'sort-colors' },
    { id: 973, title: 'K Closest Points to Origin', slug: 'k-closest-points-to-origin' },
  ],
  inputs: [{ key: 'array', label: 'Mảng', type: 'number[]', default: [7, 2, 9, 4, 3, 8, 1], min: -99, max: 99, maxLength: 12 }],
  presets: [
    { label: 'Đã sắp xếp (worst)', values: { array: [1, 2, 3, 4, 5, 6] } },
    { label: 'Trùng lặp', values: { array: [5, 5, 2, 5, 1, 5] } },
    { label: 'Ngẫu nhiên', values: { array: [12, 3, 45, 7, 23, 9, 1, 30] } },
  ],
};
