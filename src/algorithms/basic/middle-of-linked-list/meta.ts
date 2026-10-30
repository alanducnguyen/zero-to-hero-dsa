import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'middle-of-linked-list',
  title: 'Middle of the Linked List',
  subtitle: 'Fast/slow pointers – tìm node giữa trong một lần duyệt, O(1) bộ nhớ',
  level: 'basic',
  category: 'Linked List – Fast/Slow Pointers',
  tags: ['linked-list', 'two-pointers', 'fast-slow-pointers', 'tortoise-hare'],
  companies: ['Amazon', 'Microsoft', 'Adobe', 'Câu hỏi khởi động'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [{ id: 876, title: 'Middle of the Linked List', slug: 'middle-of-the-linked-list' }],
  inputs: [{ key: 'values', label: 'Giá trị các node', type: 'number[]', default: [1, 2, 3, 4, 5], min: -99, max: 99, maxLength: 10 }],
  presets: [
    { label: 'Số node chẵn', values: { values: [1, 2, 3, 4, 5, 6] } },
    { label: 'Một node', values: { values: [7] } },
    { label: 'Hai node', values: { values: [3, 8] } },
  ],
};
