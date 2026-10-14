import type { AlgorithmMeta } from '@/engine/types';
export const meta: AlgorithmMeta = {
  id: 'merge-two-sorted-lists',
  title: 'Merge Two Sorted Lists',
  subtitle: 'Dummy node + hai con trỏ – nền của Merge Sort trên linked list và Merge k Lists',
  level: 'intermediate',
  category: 'Linked List',
  tags: ['linked-list', 'two-pointers', 'merge', 'dummy-node'],
  companies: ['Amazon', 'Microsoft', 'Apple', 'Meta', 'Adobe'],
  complexity: { time: 'O(n + m)', space: 'O(1)', best: 'O(min(n,m))', worst: 'O(n + m)' },
  leetcode: [
    { id: 21, title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists' },
    { id: 23, title: 'Merge k Sorted Lists', slug: 'merge-k-sorted-lists' },
    { id: 148, title: 'Sort List', slug: 'sort-list' },
    { id: 88, title: 'Merge Sorted Array', slug: 'merge-sorted-array' },
  ],
  inputs: [
    { key: 'a', label: 'Danh sách a (tự sắp xếp)', type: 'number[]', default: [1, 2, 4], min: -99, max: 99, maxLength: 6 },
    { key: 'b', label: 'Danh sách b (tự sắp xếp)', type: 'number[]', default: [1, 3, 4, 7], min: -99, max: 99, maxLength: 6 },
  ],
  presets: [
    { label: 'Một bên rỗng', values: { a: [], b: [0, 5] } },
    { label: 'Không xen kẽ', values: { a: [1, 2], b: [8, 9] } },
  ],
};
