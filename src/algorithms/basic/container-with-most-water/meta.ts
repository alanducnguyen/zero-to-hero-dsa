import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'container-with-most-water',
  title: 'Container With Most Water',
  subtitle: 'Hai con trỏ ngược chiều – luôn dịch tường thấp hơn, loại O(n²) cặp chỉ trong O(n)',
  level: 'basic',
  category: 'Two Pointers & Sliding Window',
  tags: ['two-pointers', 'array', 'greedy'],
  companies: ['Amazon', 'Google', 'Meta', 'Bloomberg', 'Microsoft'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 11, title: 'Container With Most Water', slug: 'container-with-most-water' },
    { id: 42, title: 'Trapping Rain Water', slug: 'trapping-rain-water' },
  ],
  inputs: [{ key: 'height', label: 'Chiều cao các tường', type: 'number[]', default: [1, 8, 6, 2, 5, 4, 8, 3, 7], min: 0, max: 99, maxLength: 16 }],
  presets: [
    { label: 'Tăng dần', values: { height: [1, 2, 3, 4, 5, 6] } },
    { label: 'Hai tường cao ở giữa', values: { height: [2, 3, 10, 5, 7, 8, 9] } },
    { label: 'Bằng nhau', values: { height: [4, 4, 4, 4] } },
  ],
};
