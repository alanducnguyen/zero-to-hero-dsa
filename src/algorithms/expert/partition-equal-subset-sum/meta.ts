import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'partition-equal-subset-sum',
  title: 'Partition Equal Subset Sum',
  subtitle: 'Chia mảng thành hai tập tổng bằng nhau – 0/1 knapsack boolean với mảng dp 1 chiều duyệt ngược',
  level: 'expert',
  category: 'Dynamic Programming',
  tags: ['dp', 'knapsack', 'subset-sum', '1d-dp', 'space-optimization'],
  companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
  complexity: { time: 'O(n·S) – S = tổng/2', space: 'O(S)', best: 'O(n) (tổng lẻ)', worst: 'O(n·S)' },
  leetcode: [
    { id: 416, title: 'Partition Equal Subset Sum', slug: 'partition-equal-subset-sum' },
    { id: 494, title: 'Target Sum', slug: 'target-sum' },
    { id: 1049, title: 'Last Stone Weight II', slug: 'last-stone-weight-ii' },
    { id: 698, title: 'Partition to K Equal Sum Subsets', slug: 'partition-to-k-equal-sum-subsets' },
  ],
  inputs: [{ key: 'nums', label: 'nums (số nguyên dương)', type: 'number[]', default: [1, 5, 11, 5], min: 1, max: 20, maxLength: 8 }],
  presets: [
    { label: 'Không chia được', values: { nums: [1, 2, 3, 5] } },
    { label: 'Tổng lẻ', values: { nums: [1, 2, 4] } },
    { label: 'Có lời giải ở cuối', values: { nums: [3, 3, 3, 4, 5] } },
  ],
};
