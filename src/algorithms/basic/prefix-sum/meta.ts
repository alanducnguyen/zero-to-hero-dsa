import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'prefix-sum',
  title: 'Prefix Sum',
  subtitle: 'Tiền xử lý O(n) để trả lời tổng đoạn O(1), và kết hợp HashMap để đếm subarray có tổng k',
  level: 'basic',
  category: 'Array',
  tags: ['prefix-sum', 'array', 'hashmap', 'preprocessing'],
  companies: ['Meta', 'Amazon', 'Google', 'Bloomberg', 'Uber'],
  complexity: { time: 'O(n) tiền xử lý, O(1) truy vấn', space: 'O(n)', best: 'O(1)', worst: 'O(n)' },
  leetcode: [
    { id: 303, title: 'Range Sum Query - Immutable', slug: 'range-sum-query-immutable' },
    { id: 560, title: 'Subarray Sum Equals K', slug: 'subarray-sum-equals-k' },
    { id: 724, title: 'Find Pivot Index', slug: 'find-pivot-index' },
    { id: 304, title: 'Range Sum Query 2D', slug: 'range-sum-query-2d-immutable' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng', type: 'number[]', default: [3, -1, 4, 1, -5, 9, 2], min: -20, max: 20, maxLength: 12 },
    { key: 'l', label: 'l (đầu đoạn)', type: 'number', default: 1, min: 0, max: 11 },
    { key: 'r', label: 'r (cuối đoạn)', type: 'number', default: 4, min: 0, max: 11 },
    { key: 'k', label: 'k (đếm subarray có tổng k)', type: 'number', default: 4, min: -50, max: 50 },
  ],
  presets: [
    { label: 'Nhiều subarray tổng k', values: { nums: [1, 1, 1, 1], l: 0, r: 3, k: 2 } },
    { label: 'Có số âm, k = 0', values: { nums: [2, -2, 3, -3, 1], l: 0, r: 4, k: 0 } },
  ],
};
