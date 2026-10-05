import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'kmp',
  title: 'KMP String Matching',
  subtitle: 'Knuth–Morris–Pratt – bảng LPS để tìm pattern trong O(n + m) không bao giờ lùi text',
  level: 'expert',
  category: 'String',
  tags: ['string', 'pattern-matching', 'kmp', 'prefix-function'],
  companies: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Bloomberg'],
  complexity: { time: 'O(n + m)', space: 'O(m)', best: 'O(n + m)', worst: 'O(n + m)' },
  leetcode: [
    { id: 28, title: 'Find the Index of the First Occurrence', slug: 'find-the-index-of-the-first-occurrence-in-a-string' },
    { id: 214, title: 'Shortest Palindrome', slug: 'shortest-palindrome' },
    { id: 459, title: 'Repeated Substring Pattern', slug: 'repeated-substring-pattern' },
    { id: 1392, title: 'Longest Happy Prefix', slug: 'longest-happy-prefix' },
  ],
  inputs: [
    { key: 'text', label: 'text', type: 'string', default: 'abababcabababca', maxLength: 24 },
    { key: 'pattern', label: 'pattern', type: 'string', default: 'ababca', maxLength: 10 },
  ],
  presets: [
    { label: 'Khớp chồng lấn', values: { text: 'aaaaab', pattern: 'aaa' } },
    { label: 'Không có', values: { text: 'abcdef', pattern: 'xyz' } },
    { label: 'LPS phức tạp', values: { text: 'aabaabaaa', pattern: 'aabaaa' } },
  ],
};
