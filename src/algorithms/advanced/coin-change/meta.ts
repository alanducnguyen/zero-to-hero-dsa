import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'coin-change',
  title: 'Coin Change (Unbounded Knapsack)',
  subtitle: 'DP "số xu ít nhất" – bài mẫu cho unbounded knapsack và lý do tham lam thất bại',
  level: 'advanced',
  category: 'Dynamic Programming',
  tags: ['dp', 'knapsack', 'unbounded', 'optimization'],
  companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs', 'Uber'],
  complexity: { time: 'O(amount · coins)', space: 'O(amount)', best: 'O(amount · coins)', worst: 'O(amount · coins)' },
  leetcode: [
    { id: 322, title: 'Coin Change', slug: 'coin-change' },
    { id: 518, title: 'Coin Change II', slug: 'coin-change-ii' },
    { id: 279, title: 'Perfect Squares', slug: 'perfect-squares' },
    { id: 377, title: 'Combination Sum IV', slug: 'combination-sum-iv' },
  ],
  inputs: [
    { key: 'coins', label: 'Mệnh giá xu', type: 'number[]', default: [1, 3, 4], min: 1, max: 30, maxLength: 6 },
    { key: 'amount', label: 'amount (≤ 30)', type: 'number', default: 6, min: 0, max: 30 },
  ],
  presets: [
    { label: 'Tham lam sai [1,3,4] → 6', values: { coins: [1, 3, 4], amount: 6 } },
    { label: 'Không thể', values: { coins: [2], amount: 3 } },
    { label: 'Chuẩn [1,2,5] → 11', values: { coins: [1, 2, 5], amount: 11 } },
  ],
};
