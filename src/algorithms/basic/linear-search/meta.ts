import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'linear-search',
  title: 'Linear Search',
  subtitle: 'Tìm kiếm tuyến tính – điểm xuất phát để hiểu Big-O và khi nào "đơn giản" lại là tối ưu',
  level: 'basic',
  category: 'Searching',
  tags: ['search', 'array', 'brute-force', 'linear'],
  companies: ['Câu hỏi khởi động', 'Thường dùng để dẫn vào Binary Search'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(1)', worst: 'O(n)' },
  leetcode: [
    { id: 1295, title: 'Find Numbers with Even Number of Digits', slug: 'find-numbers-with-even-number-of-digits' },
    { id: 724, title: 'Find Pivot Index', slug: 'find-pivot-index' },
    { id: 2089, title: 'Find Target Indices After Sorting Array', slug: 'find-target-indices-after-sorting-array' },
  ],
  inputs: [
    { key: 'array', label: 'Mảng (không cần sắp xếp)', type: 'number[]', default: [7, 3, 9, 1, 4, 8, 2], min: -99, max: 99, maxLength: 16 },
    { key: 'target', label: 'Target', type: 'number', default: 4, min: -99, max: 99 },
  ],
  presets: [
    { label: 'Ở đầu (best)', values: { array: [5, 2, 8, 1], target: 5 } },
    { label: 'Không có (worst)', values: { array: [5, 2, 8, 1], target: 7 } },
    { label: 'Trùng lặp', values: { array: [3, 4, 4, 1, 4], target: 4 } },
  ],
};
