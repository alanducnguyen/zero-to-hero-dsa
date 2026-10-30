import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'subarray-sum-equals-k',
  title: 'Subarray Sum Equals K',
  subtitle: 'Prefix sum + HashMap đếm tần suất – đếm mảng con tổng k trong O(n), chạy đúng cả với số âm',
  level: 'intermediate',
  category: 'Hashing & Prefix Sum',
  tags: ['prefix-sum', 'hash-map', 'array', 'counting'],
  companies: ['Meta', 'Google', 'Amazon', 'Microsoft', 'Bloomberg'],
  complexity: { time: 'O(n)', space: 'O(n)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 560, title: 'Subarray Sum Equals K', slug: 'subarray-sum-equals-k' },
    { id: 974, title: 'Subarray Sums Divisible by K', slug: 'subarray-sums-divisible-by-k' },
    { id: 525, title: 'Contiguous Array', slug: 'contiguous-array' },
    { id: 437, title: 'Path Sum III', slug: 'path-sum-iii' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng nums', type: 'number[]', default: [1, 2, 1, -1, 2, 3], min: -99, max: 99, maxLength: 14 },
    { key: 'k', label: 'k', type: 'number', default: 3, min: -999, max: 999 },
  ],
  presets: [
    { label: 'Số âm', values: { nums: [3, 4, -7, 1, 3, 3, 1, -4], k: 7 } },
    { label: 'Toàn số 0 (k = 0)', values: { nums: [0, 0, 0, 0], k: 0 } },
    { label: 'Không có', values: { nums: [1, 2, 3], k: 100 } },
  ],
};
