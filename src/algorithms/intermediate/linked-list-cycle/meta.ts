import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'linked-list-cycle',
  title: 'Floyd Cycle Detection',
  subtitle: 'Rùa và thỏ – phát hiện vòng và tìm điểm bắt đầu vòng với O(1) bộ nhớ',
  level: 'intermediate',
  category: 'Linked List',
  tags: ['linked-list', 'two-pointers', 'fast-slow', 'cycle'],
  companies: ['Amazon', 'Microsoft', 'Meta', 'Google', 'Bloomberg'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 141, title: 'Linked List Cycle', slug: 'linked-list-cycle' },
    { id: 142, title: 'Linked List Cycle II', slug: 'linked-list-cycle-ii' },
    { id: 287, title: 'Find the Duplicate Number', slug: 'find-the-duplicate-number' },
    { id: 876, title: 'Middle of the Linked List', slug: 'middle-of-the-linked-list' },
  ],
  inputs: [
    { key: 'values', label: 'Giá trị các node', type: 'number[]', default: [3, 2, 0, -4, 7, 9], min: -99, max: 99, maxLength: 9 },
    { key: 'pos', label: 'Node cuối trỏ về chỉ số pos (-1 = không vòng)', type: 'number', default: 2, min: -1, max: 8 },
  ],
  presets: [
    { label: 'Không vòng', values: { values: [1, 2, 3, 4], pos: -1 } },
    { label: 'Vòng cả danh sách', values: { values: [1, 2, 3, 4, 5], pos: 0 } },
    { label: 'Tự trỏ', values: { values: [1], pos: 0 } },
  ],
};
