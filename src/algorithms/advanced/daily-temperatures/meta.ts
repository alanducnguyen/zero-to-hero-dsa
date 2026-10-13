import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'daily-temperatures',
  title: 'Daily Temperatures',
  subtitle: 'Monotonic stack "next greater element" – mỗi phần tử vào/ra stack một lần, O(n)',
  level: 'advanced',
  category: 'Stack',
  tags: ['monotonic-stack', 'next-greater', 'array'],
  companies: ['Amazon', 'Google', 'Meta', 'Bloomberg', 'Adobe'],
  complexity: { time: 'O(n)', space: 'O(n)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 739, title: 'Daily Temperatures', slug: 'daily-temperatures' },
    { id: 496, title: 'Next Greater Element I', slug: 'next-greater-element-i' },
    { id: 503, title: 'Next Greater Element II', slug: 'next-greater-element-ii' },
    { id: 901, title: 'Online Stock Span', slug: 'online-stock-span' },
  ],
  inputs: [{ key: 'temps', label: 'Nhiệt độ từng ngày', type: 'number[]', default: [73, 74, 75, 71, 69, 72, 76, 73], min: 30, max: 100, maxLength: 10 }],
  presets: [
    { label: 'Giảm dần (toàn 0)', values: { temps: [80, 75, 70, 65] } },
    { label: 'Tăng dần (toàn 1)', values: { temps: [60, 65, 70, 75] } },
    { label: 'Một ngày', values: { temps: [50] } },
  ],
};
