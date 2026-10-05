import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'reverse-linked-list',
  title: 'Reverse Linked List',
  subtitle: 'Đảo ngược danh sách liên kết bằng 3 con trỏ – bài thao tác pointer kinh điển',
  level: 'intermediate',
  category: 'Linked List',
  tags: ['linked-list', 'pointers', 'in-place', 'iterative', 'recursion'],
  companies: ['Microsoft', 'Amazon', 'Apple', 'Meta', 'Adobe'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 206, title: 'Reverse Linked List', slug: 'reverse-linked-list' },
    { id: 92, title: 'Reverse Linked List II', slug: 'reverse-linked-list-ii' },
    { id: 25, title: 'Reverse Nodes in k-Group', slug: 'reverse-nodes-in-k-group' },
    { id: 234, title: 'Palindrome Linked List', slug: 'palindrome-linked-list' },
  ],
  inputs: [{ key: 'values', label: 'Giá trị các node', type: 'number[]', default: [1, 2, 3, 4, 5], min: -99, max: 99, maxLength: 8 }],
  presets: [
    { label: '1 node', values: { values: [7] } },
    { label: '2 node', values: { values: [1, 2] } },
    { label: 'Rỗng', values: { values: [] } },
  ],
};
