import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'largest-rectangle-histogram',
  title: 'Monotonic Stack',
  subtitle: 'Largest Rectangle in Histogram – stack đơn điệu tìm "phần tử nhỏ hơn gần nhất" trong O(n)',
  level: 'expert',
  category: 'Stack & Queue',
  tags: ['monotonic-stack', 'stack', 'array', 'hard'],
  companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'ByteDance'],
  complexity: { time: 'O(n)', space: 'O(n)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 84, title: 'Largest Rectangle in Histogram', slug: 'largest-rectangle-in-histogram' },
    { id: 85, title: 'Maximal Rectangle', slug: 'maximal-rectangle' },
    { id: 739, title: 'Daily Temperatures', slug: 'daily-temperatures' },
    { id: 42, title: 'Trapping Rain Water', slug: 'trapping-rain-water' },
  ],
  inputs: [{ key: 'heights', label: 'Chiều cao các cột', type: 'number[]', default: [2, 1, 5, 6, 2, 3], min: 0, max: 20, maxLength: 12 }],
  presets: [
    { label: 'Tăng dần', values: { heights: [1, 2, 3, 4, 5] } },
    { label: 'Giảm dần', values: { heights: [5, 4, 3, 2, 1] } },
    { label: 'Bằng nhau', values: { heights: [3, 3, 3, 3] } },
  ],
};
