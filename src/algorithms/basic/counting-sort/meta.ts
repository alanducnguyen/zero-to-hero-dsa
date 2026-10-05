import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'counting-sort',
  title: 'Counting Sort',
  subtitle: 'Sắp xếp không so sánh O(n + k) – vượt giới hạn O(n log n) khi miền giá trị nhỏ',
  level: 'basic',
  category: 'Sorting',
  tags: ['sorting', 'non-comparison', 'stable', 'linear'],
  companies: ['Google', 'Amazon', 'Microsoft', 'Hỏi kèm Radix/Bucket Sort'],
  complexity: { time: 'O(n + k)', space: 'O(n + k)', best: 'O(n + k)', worst: 'O(n + k)' },
  leetcode: [
    { id: 75, title: 'Sort Colors', slug: 'sort-colors' },
    { id: 1122, title: 'Relative Sort Array', slug: 'relative-sort-array' },
    { id: 274, title: 'H-Index', slug: 'h-index' },
    { id: 164, title: 'Maximum Gap', slug: 'maximum-gap' },
  ],
  inputs: [{ key: 'array', label: 'Mảng số nguyên 0–9', type: 'number[]', default: [4, 2, 2, 8, 3, 3, 1], min: 0, max: 9, maxLength: 14 }],
  presets: [
    { label: 'Nhiều trùng (stable)', values: { array: [3, 1, 3, 2, 1, 3, 2] } },
    { label: 'k nhỏ, n lớn', values: { array: [1, 0, 1, 1, 0, 0, 1, 0, 1, 1] } },
  ],
};
