import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'jump-game',
  title: 'Jump Game',
  subtitle: 'Greedy theo tầm với xa nhất – quyết định có tới được cuối mảng trong O(n)',
  level: 'basic',
  category: 'Greedy',
  tags: ['greedy', 'array', 'farthest-reach', 'dynamic-programming'],
  companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(1)', worst: 'O(n)' },
  leetcode: [
    { id: 55, title: 'Jump Game', slug: 'jump-game' },
    { id: 45, title: 'Jump Game II', slug: 'jump-game-ii' },
  ],
  inputs: [{ key: 'nums', label: 'Độ dài bước nhảy tối đa', type: 'number[]', default: [2, 3, 1, 1, 0, 4], min: 0, max: 20, maxLength: 14 }],
  presets: [
    { label: 'Tới được', values: { nums: [2, 3, 1, 1, 4] } },
    { label: 'Kẹt ở ô 0', values: { nums: [3, 2, 1, 0, 4] } },
    { label: 'Một phần tử', values: { nums: [0] } },
  ],
};
