import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'clone-graph',
  title: 'Clone Graph (BFS + HashMap)',
  subtitle: 'Sao chép sâu đồ thị có chu trình bằng BFS và Map gốc → bản sao, ghi map ngay khi enqueue',
  level: 'intermediate',
  category: 'Graph',
  tags: ['graph', 'bfs', 'hash-map', 'deep-copy'],
  companies: ['Meta', 'Google', 'Amazon', 'Microsoft', 'Uber', 'Bloomberg'],
  complexity: { time: 'O(V + E)', space: 'O(V)', best: 'O(V + E)', worst: 'O(V + E)' },
  leetcode: [
    { id: 133, title: 'Clone Graph', slug: 'clone-graph' },
    { id: 138, title: 'Copy List with Random Pointer', slug: 'copy-list-with-random-pointer' },
    { id: 1485, title: 'Clone Binary Tree With Random Pointer', slug: 'clone-binary-tree-with-random-pointer' },
    { id: 1490, title: 'Clone N-ary Tree', slug: 'clone-n-ary-tree' },
  ],
  inputs: [
    { key: 'edges', label: 'Cạnh vô hướng "a-b" (node 1..20; "a" = node cô lập)', type: 'string[]', default: ['1-2', '1-4', '2-3', '3-4'], maxLength: 14 },
  ],
  presets: [
    { label: 'Tam giác + đuôi', values: { edges: ['1-2', '2-3', '3-1', '3-4', '4-5'] } },
    { label: 'Đồ thị đầy đủ K4', values: { edges: ['1-2', '1-3', '1-4', '2-3', '2-4', '3-4'] } },
    { label: 'Một node', values: { edges: ['1'] } },
  ],
};
