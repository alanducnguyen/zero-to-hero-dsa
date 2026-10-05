import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'single-number-bits',
  title: 'Bit Manipulation',
  subtitle: 'Single Number với XOR và các mẹo bit (n & (n−1), n & −n) – O(1) bộ nhớ thay cho HashMap',
  level: 'expert',
  category: 'Bit Manipulation',
  tags: ['bit', 'xor', 'math', 'constant-space'],
  companies: ['Google', 'Apple', 'Amazon', 'Nvidia', 'Qualcomm'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 136, title: 'Single Number', slug: 'single-number' },
    { id: 137, title: 'Single Number II', slug: 'single-number-ii' },
    { id: 191, title: 'Number of 1 Bits', slug: 'number-of-1-bits' },
    { id: 338, title: 'Counting Bits', slug: 'counting-bits' },
    { id: 268, title: 'Missing Number', slug: 'missing-number' },
  ],
  inputs: [{ key: 'nums', label: 'Mảng (0–255, mọi số xuất hiện 2 lần trừ một số)', type: 'number[]', default: [4, 1, 2, 1, 2], min: 0, max: 255, maxLength: 12 }],
  presets: [
    { label: 'Kết quả là 2^k', values: { nums: [9, 64, 3, 9, 3] } },
    { label: 'Số lẻ bit', values: { nums: [7, 5, 255, 5, 7] } },
    { label: 'Một phần tử', values: { nums: [42] } },
  ],
};
