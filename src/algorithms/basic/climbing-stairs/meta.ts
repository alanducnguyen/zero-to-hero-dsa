import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'climbing-stairs',
  title: 'Climbing Stairs',
  subtitle: 'DP 1D nhập môn – "bước cuối từ đâu tới?" là câu hỏi mở khoá mọi bài đếm cách',
  level: 'basic',
  category: 'Dynamic Programming',
  tags: ['dp', 'fibonacci', 'counting'],
  companies: ['Amazon', 'Google', 'Adobe', 'Apple', 'Microsoft'],
  complexity: { time: 'O(n)', space: 'O(n) → O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 70, title: 'Climbing Stairs', slug: 'climbing-stairs' },
    { id: 746, title: 'Min Cost Climbing Stairs', slug: 'min-cost-climbing-stairs' },
    { id: 509, title: 'Fibonacci Number', slug: 'fibonacci-number' },
    { id: 91, title: 'Decode Ways', slug: 'decode-ways' },
  ],
  inputs: [{ key: 'n', label: 'Số bậc n (≤ 12)', type: 'number', default: 6, min: 0, max: 12 }],
  presets: [
    { label: 'n = 0', values: { n: 0 } },
    { label: 'n = 1', values: { n: 1 } },
    { label: 'n = 10', values: { n: 10 } },
  ],
};
