import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'search-rotated-array',
  title: 'Search in Rotated Sorted Array',
  subtitle: 'Binary search trên mảng bị xoay – luôn có một nửa đã sắp xếp để quyết định bỏ nửa nào',
  level: 'basic',
  category: 'Binary Search',
  tags: ['binary-search', 'array', 'rotated', 'divide-and-conquer'],
  companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'LinkedIn'],
  complexity: { time: 'O(log n)', space: 'O(1)', best: 'O(1)', worst: 'O(log n)' },
  leetcode: [
    { id: 33, title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array' },
    { id: 153, title: 'Find Minimum in Rotated Sorted Array', slug: 'find-minimum-in-rotated-sorted-array' },
    { id: 81, title: 'Search in Rotated Sorted Array II', slug: 'search-in-rotated-sorted-array-ii' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng đã xoay (phần tử phân biệt)', type: 'number[]', default: [4, 5, 6, 7, 0, 1, 2], min: -99, max: 99, maxLength: 16 },
    { key: 'target', label: 'Target', type: 'number', default: 0, min: -99, max: 99 },
  ],
  presets: [
    { label: 'Không tồn tại', values: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 } },
    { label: 'Ở nửa trái', values: { nums: [15, 18, 22, 3, 6, 9, 11, 13], target: 18 } },
    { label: 'Không xoay', values: { nums: [1, 3, 5, 7, 9, 11], target: 9 } },
  ],
};
