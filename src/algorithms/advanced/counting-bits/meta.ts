import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'counting-bits',
  title: 'Counting Bits',
  subtitle: 'DP trên biểu diễn nhị phân: bits[i] = bits[i >> 1] + (i & 1) – O(n) cho mọi số 0..n',
  level: 'advanced',
  category: 'Bit Manipulation',
  tags: ['bit-manipulation', 'dp', 'popcount'],
  companies: ['Amazon', 'Google', 'Meta', 'Apple', 'Nvidia'],
  complexity: { time: 'O(n)', space: 'O(n)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 338, title: 'Counting Bits', slug: 'counting-bits' },
    { id: 191, title: 'Number of 1 Bits', slug: 'number-of-1-bits' },
    { id: 231, title: 'Power of Two', slug: 'power-of-two' },
    { id: 1356, title: 'Sort Integers by The Number of 1 Bits', slug: 'sort-integers-by-the-number-of-1-bits' },
  ],
  inputs: [{ key: 'n', label: 'n (≤ 20)', type: 'number', default: 10, min: 0, max: 20 }],
  presets: [
    { label: 'n = 0', values: { n: 0 } },
    { label: 'n = 15 (đủ 4 bit)', values: { n: 15 } },
    { label: 'n = 20', values: { n: 20 } },
  ],
};
