import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'serialize-binary-tree',
  title: 'Serialize & Deserialize Binary Tree',
  subtitle: 'Preorder DFS với "#" cho null – chuỗi tự mô tả cấu trúc, đọc lại bằng một con trỏ chỉ tiến',
  level: 'expert',
  category: 'Tree',
  tags: ['tree', 'dfs', 'preorder', 'serialization', 'design', 'recursion'],
  companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'LinkedIn', 'Uber'],
  complexity: { time: 'O(n)', space: 'O(n)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 297, title: 'Serialize and Deserialize Binary Tree', slug: 'serialize-and-deserialize-binary-tree' },
    { id: 449, title: 'Serialize and Deserialize BST', slug: 'serialize-and-deserialize-bst' },
    { id: 428, title: 'Serialize and Deserialize N-ary Tree', slug: 'serialize-and-deserialize-n-ary-tree' },
    { id: 331, title: 'Verify Preorder Serialization of a Binary Tree', slug: 'verify-preorder-serialization-of-a-binary-tree' },
  ],
  inputs: [
    { key: 'tree', label: 'Cây theo level-order (null = rỗng)', type: 'string[]', default: ['1', '2', '3', 'null', 'null', '4', '5'], maxLength: 15 },
  ],
  presets: [
    { label: 'Lệch trái', values: { tree: ['1', '2', 'null', '3', 'null', '4'] } },
    { label: 'Cây đầy đủ 7 node', values: { tree: ['4', '2', '6', '1', '3', '5', '7'] } },
    { label: 'Cây rỗng', values: { tree: [] } },
  ],
};
