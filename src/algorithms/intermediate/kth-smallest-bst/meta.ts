import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'kth-smallest-bst',
  title: 'Kth Smallest in BST',
  subtitle: 'Inorder lặp với stack tường minh – dừng ngay ở node thứ k',
  level: 'intermediate',
  category: 'Tree',
  tags: ['bst', 'tree', 'inorder', 'stack', 'iterative'],
  companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Uber'],
  complexity: { time: 'O(h + k)', space: 'O(h)', best: 'O(log n + k)', worst: 'O(n)' },
  leetcode: [
    { id: 230, title: 'Kth Smallest Element in a BST', slug: 'kth-smallest-element-in-a-bst' },
    { id: 94, title: 'Binary Tree Inorder Traversal', slug: 'binary-tree-inorder-traversal' },
    { id: 173, title: 'Binary Search Tree Iterator', slug: 'binary-search-tree-iterator' },
  ],
  inputs: [
    { key: 'values', label: 'Giá trị chèn lần lượt vào BST', type: 'number[]', default: [5, 3, 6, 2, 4, 1], min: -99, max: 99, maxLength: 15 },
    { key: 'k', label: 'k (1-based)', type: 'number', default: 3, min: 1, max: 15 },
  ],
  presets: [
    { label: 'k = 1 (min)', values: { values: [5, 3, 6, 2, 4, 1], k: 1 } },
    { label: 'Cây cân bằng, k lớn', values: { values: [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7], k: 9 } },
    { label: 'Cây lệch phải', values: { values: [1, 2, 3, 4, 5], k: 4 } },
  ],
};
