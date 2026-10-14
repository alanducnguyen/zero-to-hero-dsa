import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'quickselect',
  title: 'Quickselect (Kth Smallest)',
  subtitle: 'Partition của Quick Sort nhưng chỉ đệ quy một bên – O(n) trung bình để tìm phần tử thứ k',
  level: 'expert',
  category: 'Divide & Conquer',
  tags: ['quickselect', 'partition', 'divide-and-conquer', 'selection', 'top-k'],
  companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'LinkedIn', 'Apple'],
  complexity: { time: 'O(n) trung bình', space: 'O(1)', best: 'O(n)', worst: 'O(n²)' },
  leetcode: [
    { id: 215, title: 'Kth Largest Element in an Array', slug: 'kth-largest-element-in-an-array' },
    { id: 973, title: 'K Closest Points to Origin', slug: 'k-closest-points-to-origin' },
    { id: 347, title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements' },
    { id: 462, title: 'Minimum Moves to Equal Array Elements II', slug: 'minimum-moves-to-equal-array-elements-ii' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng', type: 'number[]', default: [7, 2, 9, 4, 1, 8, 5, 3], min: 1, max: 20, maxLength: 10 },
    { key: 'k', label: 'k (nhỏ thứ k, 1-indexed)', type: 'number', default: 4, min: 1, max: 10 },
  ],
  presets: [
    { label: 'k = 1 (min)', values: { nums: [5, 3, 9, 1, 7], k: 1 } },
    { label: 'k = n (max)', values: { nums: [5, 3, 9, 1, 7], k: 5 } },
    { label: 'Đã sắp xếp (worst case Lomuto)', values: { nums: [1, 2, 3, 4, 5, 6], k: 2 } },
  ],
};
