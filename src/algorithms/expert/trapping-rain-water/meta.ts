import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'trapping-rain-water',
  title: 'Trapping Rain Water',
  subtitle: 'Hai con trỏ với leftMax/rightMax – bài Hard kinh điển, O(n) một lượt và O(1) bộ nhớ',
  level: 'expert',
  category: 'Array',
  tags: ['two-pointers', 'array', 'monotonic-stack', 'prefix-max'],
  companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple', 'Bloomberg'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 42, title: 'Trapping Rain Water', slug: 'trapping-rain-water' },
    { id: 11, title: 'Container With Most Water', slug: 'container-with-most-water' },
    { id: 407, title: 'Trapping Rain Water II', slug: 'trapping-rain-water-ii' },
    { id: 84, title: 'Largest Rectangle in Histogram', slug: 'largest-rectangle-in-histogram' },
  ],
  inputs: [{ key: 'height', label: 'Độ cao các cột', type: 'number[]', default: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], min: 0, max: 9, maxLength: 14 }],
  presets: [
    { label: 'Thung lũng lớn', values: { height: [4, 2, 0, 3, 2, 5] } },
    { label: 'Tăng dần (không nước)', values: { height: [1, 2, 3, 4] } },
    { label: 'Một/hai cột', values: { height: [5, 2] } },
  ],
};
