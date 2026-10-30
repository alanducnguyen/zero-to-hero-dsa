import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'longest-palindromic-substring',
  title: 'Longest Palindromic Substring (Expand Around Center)',
  subtitle: 'Mở rộng từ 2n − 1 tâm để tìm palindrome dài nhất – O(n²) thời gian, O(1) bộ nhớ',
  level: 'expert',
  category: 'String',
  tags: ['string', 'palindrome', 'two-pointers', 'expand-around-center'],
  companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Adobe'],
  complexity: { time: 'O(n²)', space: 'O(1)', best: 'O(n)', worst: 'O(n²)' },
  leetcode: [
    { id: 5, title: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring' },
    { id: 647, title: 'Palindromic Substrings', slug: 'palindromic-substrings' },
  ],
  inputs: [{ key: 's', label: 'Chuỗi s', type: 'string', default: 'babad', maxLength: 16 }],
  presets: [
    { label: 'Tâm chẵn', values: { s: 'cbbd' } },
    { label: 'Palindrome dài', values: { s: 'forgeeksskeeg' } },
    { label: 'Toàn ký tự giống', values: { s: 'aaaa' } },
  ],
};
