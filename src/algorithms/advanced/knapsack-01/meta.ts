import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'knapsack-01',
  title: '0/1 Knapsack',
  subtitle: 'Bài toán cái túi – DP 2 chiều "lấy hay không lấy", nền của mọi bài subset sum / partition',
  level: 'advanced',
  category: 'Dynamic Programming',
  tags: ['dp', 'knapsack', '2d-dp', 'subset'],
  companies: ['Amazon', 'Google', 'Microsoft', 'Flipkart', 'Walmart'],
  complexity: { time: 'O(n · W)', space: 'O(n · W) → O(W)', best: 'O(n · W)', worst: 'O(n · W)' },
  leetcode: [
    { id: 416, title: 'Partition Equal Subset Sum', slug: 'partition-equal-subset-sum' },
    { id: 494, title: 'Target Sum', slug: 'target-sum' },
    { id: 1049, title: 'Last Stone Weight II', slug: 'last-stone-weight-ii' },
    { id: 474, title: 'Ones and Zeroes', slug: 'ones-and-zeroes' },
  ],
  inputs: [
    { key: 'weights', label: 'Trọng lượng các món', type: 'number[]', default: [1, 3, 4, 5], min: 1, max: 12, maxLength: 6 },
    { key: 'values', label: 'Giá trị các món', type: 'number[]', default: [1, 4, 5, 7], min: 0, max: 99, maxLength: 6 },
    { key: 'capacity', label: 'Sức chứa (≤ 12)', type: 'number', default: 7, min: 0, max: 12 },
  ],
  presets: [
    { label: 'Tham lam theo tỉ lệ sai', values: { weights: [1, 2, 3], values: [6, 10, 12], capacity: 5 } },
    { label: 'Không món nào vừa', values: { weights: [5, 6], values: [10, 20], capacity: 4 } },
  ],
};
