import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'bubble-sort',
  title: 'Bubble Sort',
  subtitle: 'Sắp xếp nổi bọt – thuật toán sắp xếp đơn giản nhất để hiểu bất biến vòng lặp',
  level: 'basic',
  category: 'Sorting',
  tags: ['sorting', 'in-place', 'stable', 'comparison'],
  companies: ['Câu hỏi khởi động', 'Thường dùng để hỏi về độ phức tạp'],
  complexity: { time: 'O(n²)', space: 'O(1)', best: 'O(n)', worst: 'O(n²)' },
  leetcode: [{ id: 912, title: 'Sort an Array', slug: 'sort-an-array' }],
  inputs: [{ key: 'array', label: 'Mảng', type: 'number[]', default: [5, 1, 4, 2, 8, 3], min: -99, max: 99, maxLength: 16 }],
  presets: [
    { label: 'Đã sắp xếp', values: { array: [1, 2, 3, 4, 5, 6] } },
    { label: 'Ngược', values: { array: [9, 7, 5, 3, 1] } },
    { label: 'Trùng lặp', values: { array: [4, 2, 4, 1, 2, 4] } },
  ],
};
