import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'merge-sort',
  title: 'Merge Sort',
  subtitle: 'Chia để trị kinh điển – O(n log n) đảm bảo, stable, nền tảng của TimSort và external sort',
  level: 'intermediate',
  category: 'Sorting',
  tags: ['sorting', 'divide-and-conquer', 'recursion', 'stable', 'merge'],
  companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'LinkedIn'],
  complexity: { time: 'O(n log n)', space: 'O(n)', best: 'O(n log n)', worst: 'O(n log n)' },
  leetcode: [
    { id: 912, title: 'Sort an Array', slug: 'sort-an-array' },
    { id: 148, title: 'Sort List', slug: 'sort-list' },
    { id: 88, title: 'Merge Sorted Array', slug: 'merge-sorted-array' },
    { id: 315, title: 'Count of Smaller Numbers After Self', slug: 'count-of-smaller-numbers-after-self' },
  ],
  inputs: [{ key: 'array', label: 'Mảng', type: 'number[]', default: [38, 27, 43, 3, 9, 82, 10], min: -99, max: 99, maxLength: 10 }],
  presets: [
    { label: 'Đã sắp xếp', values: { array: [1, 2, 3, 4, 5, 6] } },
    { label: 'Trùng lặp (stable)', values: { array: [5, 3, 5, 1, 3] } },
    { label: '2 phần tử', values: { array: [2, 1] } },
  ],
};
