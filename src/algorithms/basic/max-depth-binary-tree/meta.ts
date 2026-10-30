import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'max-depth-binary-tree',
  title: 'Maximum Depth of Binary Tree',
  subtitle: 'DFS đệ quy: depth = 1 + max(depth(trái), depth(phải))',
  level: 'basic',
  category: 'Tree',
  tags: ['tree', 'dfs', 'recursion', 'binary-tree'],
  companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'LinkedIn'],
  complexity: { time: 'O(n)', space: 'O(h)', best: 'O(log n) bộ nhớ (cây cân bằng)', worst: 'O(n) bộ nhớ (cây lệch)' },
  leetcode: [
    { id: 104, title: 'Maximum Depth of Binary Tree', slug: 'maximum-depth-of-binary-tree' },
    { id: 111, title: 'Minimum Depth of Binary Tree', slug: 'minimum-depth-of-binary-tree' },
    { id: 110, title: 'Balanced Binary Tree', slug: 'balanced-binary-tree' },
    { id: 543, title: 'Diameter of Binary Tree', slug: 'diameter-of-binary-tree' },
  ],
  inputs: [
    { key: 'values', label: 'Giá trị chèn lần lượt vào cây (BST)', type: 'number[]', default: [4, 2, 6, 1, 3, 7, 8], min: -99, max: 99, maxLength: 15 },
  ],
  presets: [
    { label: 'Cây cân bằng hoàn hảo', values: { values: [4, 2, 6, 1, 3, 5, 7] } },
    { label: 'Cây lệch (như linked list)', values: { values: [1, 2, 3, 4, 5] } },
    { label: 'Một node', values: { values: [42] } },
  ],
};
