import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'kth-largest-heap',
  title: 'Heap / Priority Queue',
  subtitle: 'Kth Largest Element – cài min-heap từ đầu và dùng nó để giữ top-k trong O(n log k)',
  level: 'advanced',
  category: 'Heap',
  tags: ['heap', 'priority-queue', 'top-k', 'complete-binary-tree'],
  companies: ['Meta', 'Amazon', 'Google', 'LinkedIn', 'Apple'],
  complexity: { time: 'O(n log k)', space: 'O(k)', best: 'O(n)', worst: 'O(n log k)' },
  leetcode: [
    { id: 215, title: 'Kth Largest Element in an Array', slug: 'kth-largest-element-in-an-array' },
    { id: 347, title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements' },
    { id: 23, title: 'Merge k Sorted Lists', slug: 'merge-k-sorted-lists' },
    { id: 295, title: 'Find Median from Data Stream', slug: 'find-median-from-data-stream' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng', type: 'number[]', default: [3, 2, 1, 5, 6, 4], min: -99, max: 99, maxLength: 10 },
    { key: 'k', label: 'k', type: 'number', default: 2, min: 1, max: 10 },
  ],
  presets: [
    { label: 'k = 1 (max)', values: { nums: [7, 1, 9, 3], k: 1 } },
    { label: 'Trùng lặp', values: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 } },
  ],
};
