import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'find-duplicate',
  title: 'Find the Duplicate Number (Floyd)',
  subtitle: 'Biến mảng thành danh sách liên kết ngầm i → nums[i] rồi dùng rùa–thỏ tìm điểm vào chu trình – O(n), O(1), không sửa mảng',
  level: 'expert',
  category: 'Two Pointers',
  tags: ['floyd', 'cycle-detection', 'fast-slow-pointers', 'pigeonhole', 'array'],
  companies: ['Google', 'Amazon', 'Microsoft', 'Bloomberg', 'Meta'],
  complexity: { time: 'O(n)', space: 'O(1)' },
  leetcode: [
    { id: 287, title: 'Find the Duplicate Number', slug: 'find-the-duplicate-number' },
    { id: 142, title: 'Linked List Cycle II', slug: 'linked-list-cycle-ii' },
  ],
  inputs: [{ key: 'nums', label: 'nums (n+1 số trong [1, n])', type: 'number[]', default: [1, 3, 4, 2, 2], min: 1, max: 12, maxLength: 12 }],
  presets: [
    { label: 'Đuôi dài', values: { nums: [3, 1, 3, 4, 2] } },
    { label: 'Lặp nhiều lần', values: { nums: [2, 2, 2, 2, 2] } },
    { label: 'Chu trình dài', values: { nums: [2, 5, 9, 6, 9, 3, 8, 9, 7, 1] } },
  ],
};
