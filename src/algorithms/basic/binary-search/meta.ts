import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'binary-search',
  title: 'Binary Search',
  subtitle: 'Tìm kiếm nhị phân – thu hẹp một nửa không gian tìm kiếm mỗi bước',
  level: 'basic',
  category: 'Searching',
  tags: ['binary-search', 'divide-and-conquer', 'sorted', 'logarithmic'],
  companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'],
  complexity: { time: 'O(log n)', space: 'O(1)', best: 'O(1)', worst: 'O(log n)' },
  leetcode: [
    { id: 704, title: 'Binary Search', slug: 'binary-search' },
    { id: 35, title: 'Search Insert Position', slug: 'search-insert-position' },
    { id: 33, title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array' },
    { id: 875, title: 'Koko Eating Bananas', slug: 'koko-eating-bananas' },
  ],
  inputs: [
    { key: 'array', label: 'Mảng (sẽ tự sắp xếp)', type: 'number[]', default: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21], min: -99, max: 99, maxLength: 20 },
    { key: 'target', label: 'Target', type: 'number', default: 13, min: -99, max: 99 },
  ],
  presets: [
    { label: 'Không tồn tại', values: { array: [2, 4, 6, 8, 10, 12], target: 7 } },
    { label: 'Phần tử đầu', values: { array: [2, 4, 6, 8, 10, 12], target: 2 } },
    { label: 'Mảng 1 phần tử', values: { array: [5], target: 5 } },
  ],
};
