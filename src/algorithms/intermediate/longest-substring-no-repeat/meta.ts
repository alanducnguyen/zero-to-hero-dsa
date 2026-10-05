import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'longest-substring-no-repeat',
  title: 'Sliding Window',
  subtitle: 'Longest Substring Without Repeating Characters – cửa sổ trượt với HashMap',
  level: 'intermediate',
  category: 'Two Pointers & Sliding Window',
  tags: ['sliding-window', 'hashmap', 'string', 'two-pointers'],
  companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg', 'Adobe'],
  complexity: { time: 'O(n)', space: 'O(min(n, k))', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 3, title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters' },
    { id: 209, title: 'Minimum Size Subarray Sum', slug: 'minimum-size-subarray-sum' },
    { id: 424, title: 'Longest Repeating Character Replacement', slug: 'longest-repeating-character-replacement' },
    { id: 76, title: 'Minimum Window Substring', slug: 'minimum-window-substring' },
  ],
  inputs: [{ key: 's', label: 'Chuỗi', type: 'string', default: 'abcabcbb', maxLength: 20 }],
  presets: [
    { label: 'Lặp xa', values: { s: 'abba' } },
    { label: 'Toàn giống', values: { s: 'bbbbb' } },
    { label: 'Không lặp', values: { s: 'abcdef' } },
    { label: 'pwwkew', values: { s: 'pwwkew' } },
  ],
};
