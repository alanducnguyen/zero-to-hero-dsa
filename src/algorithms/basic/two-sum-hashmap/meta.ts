import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'two-sum-hashmap',
  title: 'Two Sum (HashMap)',
  subtitle: 'Bài #1 LeetCode – đổi O(n²) thành O(n) bằng cách "ghi nhớ phần bù" trong HashMap',
  level: 'basic',
  category: 'Hashing',
  tags: ['hashmap', 'array', 'one-pass'],
  companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Adobe'],
  complexity: { time: 'O(n)', space: 'O(n)', best: 'O(1)', worst: 'O(n)' },
  leetcode: [
    { id: 1, title: 'Two Sum', slug: 'two-sum' },
    { id: 167, title: 'Two Sum II - Sorted', slug: 'two-sum-ii-input-array-is-sorted' },
    { id: 219, title: 'Contains Duplicate II', slug: 'contains-duplicate-ii' },
    { id: 1512, title: 'Number of Good Pairs', slug: 'number-of-good-pairs' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng (không cần sắp xếp)', type: 'number[]', default: [2, 7, 11, 15, 3, 6], min: -99, max: 99, maxLength: 14 },
    { key: 'target', label: 'Target', type: 'number', default: 9, min: -199, max: 199 },
  ],
  presets: [
    { label: 'Không tự ghép', values: { nums: [3, 2, 4], target: 6 } },
    { label: 'Số âm', values: { nums: [-1, -2, -3, -4, -5], target: -8 } },
    { label: 'Không tồn tại', values: { nums: [1, 2, 3], target: 100 } },
  ],
};
