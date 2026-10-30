import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'online-stock-span',
  title: 'Online Stock Span',
  subtitle: 'Monotonic stack giảm dần lưu [giá, span] – gộp khối ngày, O(1) amortized mỗi lần next',
  level: 'basic',
  category: 'Stack',
  tags: ['monotonic-stack', 'stack', 'design', 'online'],
  companies: ['Amazon', 'Google', 'Bloomberg', 'Microsoft', 'Goldman Sachs'],
  complexity: { time: 'O(1) amortized mỗi next, O(n) tổng', space: 'O(n)', best: 'O(1)', worst: 'O(n) cho một lần next' },
  leetcode: [
    { id: 901, title: 'Online Stock Span', slug: 'online-stock-span' },
    { id: 739, title: 'Daily Temperatures', slug: 'daily-temperatures' },
    { id: 496, title: 'Next Greater Element I', slug: 'next-greater-element-i' },
    { id: 84, title: 'Largest Rectangle in Histogram', slug: 'largest-rectangle-in-histogram' },
  ],
  inputs: [{ key: 'prices', label: 'Giá từng ngày (đến lần lượt)', type: 'number[]', default: [100, 80, 60, 70, 60, 75, 85], min: 1, max: 200, maxLength: 10 }],
  presets: [
    { label: 'Tăng dần (span = i + 1)', values: { prices: [10, 20, 30, 40, 50] } },
    { label: 'Giảm dần (toàn 1)', values: { prices: [50, 40, 30, 20] } },
    { label: 'Giá bằng nhau', values: { prices: [30, 30, 20, 30, 30] } },
  ],
};
