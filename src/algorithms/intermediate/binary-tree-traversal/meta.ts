import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'binary-tree-traversal',
  title: 'Binary Tree Traversal',
  subtitle: 'DFS (preorder / inorder / postorder) và BFS – bốn cách duyệt cây là nền của mọi bài về cây',
  level: 'intermediate',
  category: 'Tree',
  tags: ['tree', 'dfs', 'bfs', 'recursion', 'queue'],
  companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Apple'],
  complexity: { time: 'O(n)', space: 'O(h) DFS / O(w) BFS', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 94, title: 'Binary Tree Inorder Traversal', slug: 'binary-tree-inorder-traversal' },
    { id: 102, title: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order-traversal' },
    { id: 104, title: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree' },
    { id: 98, title: 'Validate Binary Search Tree', slug: 'validate-binary-search-tree' },
  ],
  inputs: [
    { key: 'tree', label: 'Cây theo level-order (null = rỗng)', type: 'string[]', default: ['1', '2', '3', '4', '5', 'null', '6'], maxLength: 15 },
    { key: 'order', label: 'Kiểu duyệt: preorder | inorder | postorder | bfs', type: 'string', default: 'preorder', maxLength: 10 },
  ],
  presets: [
    { label: 'Inorder (BST)', values: { tree: ['4', '2', '6', '1', '3', '5', '7'], order: 'inorder' } },
    { label: 'Postorder', values: { tree: ['1', '2', '3', '4', '5', 'null', '6'], order: 'postorder' } },
    { label: 'BFS', values: { tree: ['1', '2', '3', '4', '5', 'null', '6'], order: 'bfs' } },
    { label: 'Cây lệch phải', values: { tree: ['1', 'null', '2', 'null', '3'], order: 'preorder' } },
  ],
};
