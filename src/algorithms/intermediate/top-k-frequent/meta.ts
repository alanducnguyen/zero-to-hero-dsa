import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'top-k-frequent',
  title: 'Top K Frequent Elements',
  subtitle: 'HashMap đếm + min-heap kích thước k – mẫu "đếm rồi chọn top-k" gặp khắp nơi',
  level: 'intermediate',
  category: 'Heap',
  tags: ['heap', 'hashmap', 'top-k', 'bucket-sort'],
  companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg', 'Uber'],
  complexity: { time: 'O(n log k)', space: 'O(n)', best: 'O(n)', worst: 'O(n log k)' },
  leetcode: [
    { id: 347, title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements' },
    { id: 692, title: 'Top K Frequent Words', slug: 'top-k-frequent-words' },
    { id: 451, title: 'Sort Characters By Frequency', slug: 'sort-characters-by-frequency' },
    { id: 973, title: 'K Closest Points to Origin', slug: 'k-closest-points-to-origin' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng', type: 'number[]', default: [1, 1, 1, 2, 2, 3, 4, 4, 4, 4], min: 0, max: 9, maxLength: 12 },
    { key: 'k', label: 'k', type: 'number', default: 2, min: 1, max: 5 },
  ],
  presets: [
    { label: 'k = số giá trị', values: { nums: [5, 5, 6], k: 2 } },
    { label: 'Tần suất bằng nhau', values: { nums: [3, 1, 2, 3, 1, 2], k: 2 } },
    { label: 'Một phần tử', values: { nums: [9], k: 1 } },
  ],
};
