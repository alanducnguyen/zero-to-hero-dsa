import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'edit-distance',
  title: 'Edit Distance (DP 2D)',
  subtitle: 'Khoảng cách Levenshtein – bài quy hoạch động 2 chiều kinh điển về hai chuỗi',
  level: 'expert',
  category: 'Dynamic Programming',
  tags: ['dp', '2d-dp', 'string', 'levenshtein'],
  companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Palantir'],
  complexity: { time: 'O(m·n)', space: 'O(m·n) → O(min(m,n))', best: 'O(m·n)', worst: 'O(m·n)' },
  leetcode: [
    { id: 72, title: 'Edit Distance', slug: 'edit-distance' },
    { id: 1143, title: 'Longest Common Subsequence', slug: 'longest-common-subsequence' },
    { id: 583, title: 'Delete Operation for Two Strings', slug: 'delete-operation-for-two-strings' },
    { id: 10, title: 'Regular Expression Matching', slug: 'regular-expression-matching' },
  ],
  inputs: [
    { key: 'a', label: 'Chuỗi a', type: 'string', default: 'horse', maxLength: 8 },
    { key: 'b', label: 'Chuỗi b', type: 'string', default: 'ros', maxLength: 8 },
  ],
  presets: [
    { label: 'intention → execution', values: { a: 'intent', b: 'exec' } },
    { label: 'Giống nhau', values: { a: 'abc', b: 'abc' } },
    { label: 'Rỗng', values: { a: '', b: 'abc' } },
  ],
};
