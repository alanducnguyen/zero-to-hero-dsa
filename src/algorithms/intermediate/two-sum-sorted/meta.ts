import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'two-sum-sorted',
  title: 'Two Pointers',
  subtitle: 'Two Sum II trên mảng sắp xếp – hai con trỏ ngược chiều loại bỏ ứng viên trong O(n)',
  level: 'intermediate',
  category: 'Two Pointers & Sliding Window',
  tags: ['two-pointers', 'array', 'sorted', 'greedy'],
  companies: ['Amazon', 'Meta', 'Google', 'Apple', 'Adobe'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(1)', worst: 'O(n)' },
  leetcode: [
    { id: 167, title: 'Two Sum II - Input Array Is Sorted', slug: 'two-sum-ii-input-array-is-sorted' },
    { id: 15, title: '3Sum', slug: '3sum' },
    { id: 11, title: 'Container With Most Water', slug: 'container-with-most-water' },
    { id: 125, title: 'Valid Palindrome', slug: 'valid-palindrome' },
  ],
  inputs: [
    { key: 'array', label: 'Mảng (sẽ tự sắp xếp)', type: 'number[]', default: [1, 3, 4, 6, 8, 11, 15], min: -99, max: 99, maxLength: 16 },
    { key: 'target', label: 'Target', type: 'number', default: 14, min: -199, max: 199 },
  ],
  presets: [
    { label: 'Không tồn tại', values: { array: [1, 2, 3, 4, 5], target: 100 } },
    { label: 'Hai đầu', values: { array: [2, 5, 7, 9], target: 11 } },
    { label: 'Số âm', values: { array: [-5, -2, 0, 3, 6], target: 1 } },
  ],
};
