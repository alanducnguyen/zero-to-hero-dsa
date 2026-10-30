import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'minimum-window-substring',
  title: 'Minimum Window Substring',
  subtitle: 'Cửa sổ trượt co-giãn với bộ đếm need/have – tìm substring ngắn nhất phủ t trong O(n)',
  level: 'expert',
  category: 'Two Pointers & Sliding Window',
  tags: ['sliding-window', 'hashmap', 'string', 'two-pointers', 'frequency-count'],
  companies: ['Meta', 'Google', 'Amazon', 'Microsoft', 'LinkedIn', 'Uber', 'Airbnb'],
  complexity: { time: 'O(|s| + |t|)', space: 'O(k) – k ký tự khác nhau', best: 'O(|s| + |t|)', worst: 'O(|s| + |t|)' },
  leetcode: [
    { id: 76, title: 'Minimum Window Substring', slug: 'minimum-window-substring' },
    { id: 567, title: 'Permutation in String', slug: 'permutation-in-string' },
    { id: 438, title: 'Find All Anagrams in a String', slug: 'find-all-anagrams-in-a-string' },
    { id: 30, title: 'Substring with Concatenation of All Words', slug: 'substring-with-concatenation-of-all-words' },
  ],
  inputs: [
    { key: 's', label: 'Chuỗi s', type: 'string', default: 'ADOBECODEBANC', maxLength: 20 },
    { key: 't', label: 'Chuỗi t (cần phủ)', type: 'string', default: 'ABC', maxLength: 8 },
  ],
  presets: [
    { label: 'Ký tự lặp trong t', values: { s: 'AABBCAB', t: 'AAB' } },
    { label: 'Không có lời giải', values: { s: 'ABCDE', t: 'XY' } },
    { label: 'Cửa sổ ở đầu', values: { s: 'abcxxxxab', t: 'cab' } },
  ],
};
