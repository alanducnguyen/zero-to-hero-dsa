import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'missing-number',
  title: 'Missing Number',
  subtitle: 'XOR chỉ số với giá trị – các cặp trùng tự triệt tiêu, chỉ còn số bị thiếu',
  level: 'basic',
  category: 'Bit Manipulation',
  tags: ['bit', 'xor', 'array', 'math'],
  companies: ['Amazon', 'Microsoft', 'Meta', 'Apple', 'Bloomberg'],
  complexity: { time: 'O(n)', space: 'O(1)' },
  leetcode: [
    { id: 268, title: 'Missing Number', slug: 'missing-number' },
    { id: 136, title: 'Single Number', slug: 'single-number' },
    { id: 448, title: 'Find All Numbers Disappeared in an Array', slug: 'find-all-numbers-disappeared-in-an-array' },
  ],
  inputs: [
    { key: 'nums', label: 'nums (n số phân biệt trong [0, n])', type: 'number[]', default: [3, 0, 1, 5, 2], min: 0, max: 30, maxLength: 20 },
  ],
  presets: [
    { label: 'Thiếu số cuối (n)', values: { nums: [0, 1, 2, 3] } },
    { label: 'Thiếu số 0', values: { nums: [1, 2] } },
    { label: 'LeetCode ví dụ 3', values: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] } },
  ],
};
