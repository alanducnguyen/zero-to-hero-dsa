import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'segment-tree',
  title: 'Segment Tree',
  subtitle: 'Tổng đoạn và cập nhật điểm cùng O(log n) – khi prefix sum không còn đủ',
  level: 'expert',
  category: 'Tree',
  tags: ['segment-tree', 'range-query', 'tree', 'divide-and-conquer'],
  companies: ['Google', 'Meta', 'Amazon', 'Uber', 'Citadel', 'Jane Street'],
  complexity: { time: 'O(log n) query/update', space: 'O(n)', best: 'O(1)', worst: 'O(log n)' },
  leetcode: [
    { id: 307, title: 'Range Sum Query - Mutable', slug: 'range-sum-query-mutable' },
    { id: 315, title: 'Count of Smaller Numbers After Self', slug: 'count-of-smaller-numbers-after-self' },
    { id: 218, title: 'The Skyline Problem', slug: 'the-skyline-problem' },
    { id: 2407, title: 'Longest Increasing Subsequence II', slug: 'longest-increasing-subsequence-ii' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng (≤ 8 phần tử để xem cây)', type: 'number[]', default: [2, 1, 5, 3, 4, 6], min: -20, max: 20, maxLength: 8 },
    { key: 'ops', label: 'Thao tác: "query l r", "update i v"', type: 'string[]', default: ['query 1 4', 'update 2 0', 'query 1 4', 'query 0 5'], maxLength: 10 },
  ],
  presets: [
    { label: 'Một phần tử', values: { nums: [7], ops: ['query 0 0', 'update 0 3', 'query 0 0'] } },
    { label: 'Nhiều update', values: { nums: [1, 1, 1, 1], ops: ['update 0 5', 'update 3 -2', 'query 0 3', 'query 1 2'] } },
  ],
};
