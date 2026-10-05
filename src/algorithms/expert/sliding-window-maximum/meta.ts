import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'sliding-window-maximum',
  title: 'Sliding Window Maximum',
  subtitle: 'Monotonic deque – max của mọi cửa sổ trong O(n), bài Hard xuất hiện đều ở Amazon/Google',
  level: 'expert',
  category: 'Two Pointers & Sliding Window',
  tags: ['deque', 'monotonic', 'sliding-window', 'hard'],
  companies: ['Amazon', 'Google', 'Meta', 'Uber', 'ByteDance', 'Citadel'],
  complexity: { time: 'O(n)', space: 'O(k)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 239, title: 'Sliding Window Maximum', slug: 'sliding-window-maximum' },
    { id: 862, title: 'Shortest Subarray with Sum at Least K', slug: 'shortest-subarray-with-sum-at-least-k' },
    { id: 1438, title: 'Longest Continuous Subarray With Absolute Diff ≤ Limit', slug: 'longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit' },
    { id: 1696, title: 'Jump Game VI', slug: 'jump-game-vi' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng', type: 'number[]', default: [1, 3, -1, -3, 5, 3, 6, 7], min: -20, max: 20, maxLength: 14 },
    { key: 'k', label: 'k', type: 'number', default: 3, min: 1, max: 14 },
  ],
  presets: [
    { label: 'Giảm dần', values: { nums: [9, 8, 7, 6, 5, 4], k: 3 } },
    { label: 'Tăng dần', values: { nums: [1, 2, 3, 4, 5, 6], k: 2 } },
    { label: 'k = n', values: { nums: [4, 2, 8, 1], k: 4 } },
  ],
};
