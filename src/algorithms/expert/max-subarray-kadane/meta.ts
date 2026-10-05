import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'max-subarray-kadane',
  title: 'Kadane (Max Subarray)',
  subtitle: 'Maximum Subarray trong O(n) – DP ẩn dưới dạng một biến, và liên hệ với prefix sum',
  level: 'expert',
  category: 'Dynamic Programming',
  tags: ['dp', 'array', 'kadane', 'prefix-sum', 'greedy'],
  companies: ['Amazon', 'Microsoft', 'LinkedIn', 'Apple', 'Bloomberg'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 53, title: 'Maximum Subarray', slug: 'maximum-subarray' },
    { id: 152, title: 'Maximum Product Subarray', slug: 'maximum-product-subarray' },
    { id: 918, title: 'Maximum Sum Circular Subarray', slug: 'maximum-sum-circular-subarray' },
    { id: 560, title: 'Subarray Sum Equals K', slug: 'subarray-sum-equals-k' },
  ],
  inputs: [{ key: 'nums', label: 'Mảng (có thể âm)', type: 'number[]', default: [-2, 1, -3, 4, -1, 2, 1, -5, 4], min: -20, max: 20, maxLength: 14 }],
  presets: [
    { label: 'Toàn số âm', values: { nums: [-3, -1, -4, -2] } },
    { label: 'Toàn số dương', values: { nums: [2, 3, 1, 5] } },
    { label: 'Một phần tử', values: { nums: [-7] } },
  ],
};
