import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'majority-element',
  title: 'Majority Element (Boyer-Moore)',
  subtitle: 'Tìm phần tử > n/2 lần trong O(n) thời gian, O(1) bộ nhớ bằng thuật toán bỏ phiếu',
  level: 'basic',
  category: 'Array',
  tags: ['array', 'voting', 'greedy', 'hashmap'],
  companies: ['Amazon', 'Microsoft', 'Google', 'Adobe', 'Zenefits'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 169, title: 'Majority Element', slug: 'majority-element' },
    { id: 229, title: 'Majority Element II', slug: 'majority-element-ii' },
    { id: 1150, title: 'Check If a Number Is Majority Element in a Sorted Array', slug: 'check-if-a-number-is-majority-element-in-a-sorted-array' },
  ],
  inputs: [{ key: 'nums', label: 'Mảng (có phần tử > n/2 lần)', type: 'number[]', default: [2, 2, 1, 1, 1, 2, 2], min: 0, max: 9, maxLength: 12 }],
  presets: [
    { label: 'Đa số ở cuối', values: { nums: [1, 2, 3, 3, 3, 3, 3] } },
    { label: 'Một phần tử', values: { nums: [5] } },
    { label: 'Đổi ứng viên nhiều lần', values: { nums: [1, 2, 1, 3, 1, 4, 1, 1] } },
  ],
};
