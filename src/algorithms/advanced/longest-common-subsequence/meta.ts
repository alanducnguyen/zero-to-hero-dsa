import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'longest-common-subsequence',
  title: 'Longest Common Subsequence',
  subtitle: 'DP 2D hai tiền tố + truy vết ngược – nền của diff, merge và nhiều bài DP chuỗi',
  level: 'advanced',
  category: 'Dynamic Programming',
  tags: ['dp', '2d-dp', 'string', 'subsequence'],
  companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Atlassian'],
  complexity: { time: 'O(m·n)', space: 'O(m·n) → O(min(m,n))', best: 'O(m·n)', worst: 'O(m·n)' },
  leetcode: [
    { id: 1143, title: 'Longest Common Subsequence', slug: 'longest-common-subsequence' },
    { id: 583, title: 'Delete Operation for Two Strings', slug: 'delete-operation-for-two-strings' },
    { id: 516, title: 'Longest Palindromic Subsequence', slug: 'longest-palindromic-subsequence' },
    { id: 1035, title: 'Uncrossed Lines', slug: 'uncrossed-lines' },
  ],
  inputs: [
    { key: 'a', label: 'Chuỗi a', type: 'string', default: 'abcde', maxLength: 8 },
    { key: 'b', label: 'Chuỗi b', type: 'string', default: 'ace', maxLength: 8 },
  ],
  presets: [
    { label: 'AGGTAB / GXTXAYB', values: { a: 'AGGTAB', b: 'GXTXAYB' } },
    { label: 'Không có chung', values: { a: 'abc', b: 'def' } },
    { label: 'Giống nhau', values: { a: 'abcd', b: 'abcd' } },
  ],
};
