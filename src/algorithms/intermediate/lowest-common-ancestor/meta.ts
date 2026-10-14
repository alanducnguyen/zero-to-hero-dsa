import type { AlgorithmMeta } from '@/engine/types';
export const meta: AlgorithmMeta = {
  id: 'lowest-common-ancestor',
  title: 'Lowest Common Ancestor',
  subtitle: 'LCA của cây nhị phân bằng postorder một lượt – bài cây hay hỏi nhất sau traversal',
  level: 'intermediate',
  category: 'Tree',
  tags: ['tree', 'dfs', 'postorder', 'recursion'],
  companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'LinkedIn'],
  complexity: { time: 'O(n)', space: 'O(h)', best: 'O(1)', worst: 'O(n)' },
  leetcode: [
    { id: 236, title: 'Lowest Common Ancestor of a Binary Tree', slug: 'lowest-common-ancestor-of-a-binary-tree' },
    { id: 235, title: 'LCA of a BST', slug: 'lowest-common-ancestor-of-a-binary-search-tree' },
    { id: 1650, title: 'LCA III (with parent pointer)', slug: 'lowest-common-ancestor-of-a-binary-tree-iii' },
    { id: 1676, title: 'LCA IV (multiple nodes)', slug: 'lowest-common-ancestor-of-a-binary-tree-iv' },
  ],
  inputs: [
    { key: 'tree', label: 'Cây level-order (null = rỗng)', type: 'string[]', default: ['3', '5', '1', '6', '2', '0', '8', 'null', 'null', '7', '4'], maxLength: 15 },
    { key: 'p', label: 'p', type: 'number', default: 5, min: -99, max: 99 },
    { key: 'q', label: 'q', type: 'number', default: 4, min: -99, max: 99 },
  ],
  presets: [
    { label: 'Hai bên gốc', values: { tree: ['3', '5', '1', '6', '2', '0', '8', 'null', 'null', '7', '4'], p: 5, q: 1 } },
    { label: 'p là tổ tiên của q', values: { tree: ['3', '5', '1', '6', '2', '0', '8', 'null', 'null', '7', '4'], p: 5, q: 4 } },
    { label: 'Không có q', values: { tree: ['1', '2', '3'], p: 2, q: 9 } },
  ],
};
