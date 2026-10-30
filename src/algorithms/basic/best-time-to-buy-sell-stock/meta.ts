import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'best-time-to-buy-sell-stock',
  title: 'Best Time to Buy and Sell Stock',
  subtitle: 'Một lượt duyệt – nhớ giá thấp nhất đã thấy, greedy kiểu Kadane',
  level: 'basic',
  category: 'Greedy',
  tags: ['array', 'greedy', 'dynamic-programming', 'kadane'],
  companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg', 'Goldman Sachs'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 121, title: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock' },
    { id: 122, title: 'Best Time to Buy and Sell Stock II', slug: 'best-time-to-buy-and-sell-stock-ii' },
    { id: 53, title: 'Maximum Subarray', slug: 'maximum-subarray' },
  ],
  inputs: [{ key: 'prices', label: 'Giá theo ngày', type: 'number[]', default: [7, 1, 5, 3, 6, 4], min: 0, max: 99, maxLength: 16 }],
  presets: [
    { label: 'Giảm dần (lời 0)', values: { prices: [7, 6, 4, 3, 1] } },
    { label: 'Đáy mới sau đỉnh', values: { prices: [3, 8, 2, 5, 1, 4, 9] } },
    { label: 'Tăng dần', values: { prices: [1, 2, 3, 4, 5] } },
  ],
};
