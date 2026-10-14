import type { AlgorithmMeta } from '@/engine/types';
export const meta: AlgorithmMeta = {
  id: 'rotate-array',
  title: 'Rotate Array',
  subtitle: 'Xoay mảng tại chỗ bằng "đảo ba lần" – mẹo O(1) bộ nhớ hay được hỏi',
  level: 'basic',
  category: 'Array',
  tags: ['array', 'in-place', 'two-pointers', 'reverse'],
  companies: ['Microsoft', 'Amazon', 'Apple', 'Goldman Sachs'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 189, title: 'Rotate Array', slug: 'rotate-array' },
    { id: 61, title: 'Rotate List', slug: 'rotate-list' },
    { id: 48, title: 'Rotate Image', slug: 'rotate-image' },
    { id: 796, title: 'Rotate String', slug: 'rotate-string' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng', type: 'number[]', default: [1, 2, 3, 4, 5, 6, 7], min: -99, max: 99, maxLength: 12 },
    { key: 'k', label: 'k (xoay phải)', type: 'number', default: 3, min: 0, max: 50 },
  ],
  presets: [
    { label: 'k > n', values: { nums: [1, 2, 3, 4], k: 6 } },
    { label: 'k = 0', values: { nums: [1, 2, 3], k: 0 } },
  ],
};
