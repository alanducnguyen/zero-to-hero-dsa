import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'gas-station',
  title: 'Gas Station',
  subtitle: 'Greedy một lượt: tổng âm thì vô nghiệm, hụt xăng thì bỏ cả đoạn và xuất phát lại',
  level: 'advanced',
  category: 'Greedy',
  tags: ['greedy', 'array', 'circular', 'prefix-sum'],
  companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg', 'Apple'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 134, title: 'Gas Station', slug: 'gas-station' },
    { id: 55, title: 'Jump Game', slug: 'jump-game' },
    { id: 53, title: 'Maximum Subarray', slug: 'maximum-subarray' },
  ],
  inputs: [
    { key: 'gas', label: 'gas[i] – xăng ở trạm i', type: 'number[]', default: [1, 2, 3, 4, 5], min: 0, max: 20, maxLength: 10 },
    { key: 'cost', label: 'cost[i] – xăng để đi i → i+1', type: 'number[]', default: [3, 4, 5, 1, 2], min: 0, max: 20, maxLength: 10 },
  ],
  presets: [
    { label: 'Vô nghiệm (tổng âm)', values: { gas: [2, 3, 4], cost: [3, 4, 3] } },
    { label: 'Reset nhiều lần', values: { gas: [3, 1, 1, 5, 2, 4], cost: [4, 2, 3, 1, 3, 1] } },
    { label: 'Xuất phát ở 0', values: { gas: [5, 1, 2, 3], cost: [4, 2, 1, 3] } },
  ],
};
