import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'bst-operations',
  title: 'Binary Search Tree',
  subtitle: 'Insert / search / delete trên BST – và vì sao cần cây cân bằng',
  level: 'intermediate',
  category: 'Tree',
  tags: ['bst', 'tree', 'recursion', 'search'],
  companies: ['Microsoft', 'Amazon', 'Google', 'Apple', 'Oracle'],
  complexity: { time: 'O(h)', space: 'O(h)', best: 'O(log n)', worst: 'O(n)' },
  leetcode: [
    { id: 701, title: 'Insert into a BST', slug: 'insert-into-a-binary-search-tree' },
    { id: 700, title: 'Search in a BST', slug: 'search-in-a-binary-search-tree' },
    { id: 450, title: 'Delete Node in a BST', slug: 'delete-node-in-a-bst' },
    { id: 98, title: 'Validate BST', slug: 'validate-binary-search-tree' },
    { id: 230, title: 'Kth Smallest in BST', slug: 'kth-smallest-element-in-a-bst' },
  ],
  inputs: [{ key: 'ops', label: 'Thao tác: "insert v", "search v", "delete v"', type: 'string[]', default: ['insert 8', 'insert 3', 'insert 10', 'insert 1', 'insert 6', 'insert 14', 'insert 4', 'search 6', 'search 7', 'delete 3', 'delete 8'], maxLength: 20 }],
  presets: [
    { label: 'Cây lệch (worst)', values: { ops: ['insert 1', 'insert 2', 'insert 3', 'insert 4', 'insert 5', 'search 5'] } },
    { label: 'Xoá gốc 2 con', values: { ops: ['insert 5', 'insert 3', 'insert 8', 'insert 7', 'insert 9', 'delete 5'] } },
  ],
};
