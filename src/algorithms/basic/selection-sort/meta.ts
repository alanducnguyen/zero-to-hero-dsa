import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'selection-sort',
  title: 'Selection Sort',
  subtitle: 'Sắp xếp chọn – ít hoán đổi nhất trong các thuật toán O(n²), lý tưởng khi ghi đắt hơn đọc',
  level: 'basic',
  category: 'Sorting',
  tags: ['sorting', 'in-place', 'comparison', 'unstable'],
  companies: ['Câu hỏi khởi động', 'Hay dùng để hỏi về stable sort'],
  complexity: { time: 'O(n²)', space: 'O(1)', best: 'O(n²)', worst: 'O(n²)' },
  leetcode: [
    { id: 912, title: 'Sort an Array', slug: 'sort-an-array' },
    { id: 1984, title: 'Minimum Difference Between Highest and Lowest of K Scores', slug: 'minimum-difference-between-highest-and-lowest-of-k-scores' },
  ],
  inputs: [{ key: 'array', label: 'Mảng', type: 'number[]', default: [29, 10, 14, 37, 13, 5], min: -99, max: 99, maxLength: 14 }],
  presets: [
    { label: 'Đã sắp xếp', values: { array: [1, 2, 3, 4, 5] } },
    { label: 'Ngược', values: { array: [9, 7, 5, 3, 1] } },
    { label: 'Mất stable', values: { array: [4, 2, 4, 1] } },
  ],
};
