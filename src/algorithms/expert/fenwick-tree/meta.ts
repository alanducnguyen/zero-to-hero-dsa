import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'fenwick-tree',
  title: 'Fenwick Tree (BIT)',
  subtitle: 'Tổng tiền tố + cập nhật điểm O(log n) chỉ với một mảng và phép i & -i',
  level: 'expert',
  category: 'Tree',
  tags: ['fenwick', 'binary-indexed-tree', 'range-query', 'bit-manipulation', 'prefix-sum'],
  companies: ['Google', 'Meta', 'Amazon', 'Citadel', 'Jane Street', 'Bloomberg'],
  complexity: { time: 'O(log n) query/update', space: 'O(n)', best: 'O(1)', worst: 'O(log n)' },
  leetcode: [
    { id: 307, title: 'Range Sum Query - Mutable', slug: 'range-sum-query-mutable' },
    { id: 315, title: 'Count of Smaller Numbers After Self', slug: 'count-of-smaller-numbers-after-self' },
    { id: 493, title: 'Reverse Pairs', slug: 'reverse-pairs' },
    { id: 1395, title: 'Count Number of Teams', slug: 'count-number-of-teams' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng (≤ 8 phần tử)', type: 'number[]', default: [3, 2, -1, 6, 5, 4, -3, 3], min: -20, max: 20, maxLength: 8 },
    { key: 'ops', label: 'Thao tác: "sum l r", "add i d"', type: 'string[]', default: ['sum 0 5', 'add 2 4', 'sum 0 5', 'sum 3 7'], maxLength: 8 },
  ],
  presets: [
    { label: 'Một phần tử', values: { nums: [7], ops: ['sum 0 0', 'add 0 -2', 'sum 0 0'] } },
    { label: 'Chỉ truy vấn', values: { nums: [1, 2, 3, 4, 5, 6], ops: ['sum 0 5', 'sum 2 3', 'sum 5 5'] } },
  ],
};
