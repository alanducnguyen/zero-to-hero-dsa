import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'longest-consecutive-sequence',
  title: 'Longest Consecutive Sequence',
  subtitle: 'HashSet + chỉ đếm từ đầu dãy (x − 1 không tồn tại) – tìm dãy số liên tiếp dài nhất trong O(n) không cần sắp xếp',
  level: 'intermediate',
  category: 'Hashing & Prefix Sum',
  tags: ['hash-set', 'array', 'sequence', 'union-find'],
  companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Bloomberg', 'Uber'],
  complexity: { time: 'O(n)', space: 'O(n)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 128, title: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence' },
    { id: 298, title: 'Binary Tree Longest Consecutive Sequence', slug: 'binary-tree-longest-consecutive-sequence' },
    { id: 2274, title: 'Maximum Consecutive Floors Without Special Floors', slug: 'maximum-consecutive-floors-without-special-floors' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng nums', type: 'number[]', default: [100, 4, 200, 1, 3, 2], min: -999, max: 999, maxLength: 14 },
  ],
  presets: [
    { label: 'LeetCode ví dụ 2', values: { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] } },
    { label: 'Có trùng lặp', values: { nums: [1, 2, 0, 1, 2] } },
    { label: 'Số âm, nhiều dãy', values: { nums: [-1, 9, -3, 10, -2, 5, 11] } },
  ],
};
