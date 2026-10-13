import type { AlgorithmMeta } from '@/engine/types';
export const meta: AlgorithmMeta = {
  id: 'valid-anagram',
  title: 'Valid Anagram',
  subtitle: 'Đếm tần suất ký tự – mẫu HashMap đếm xuất hiện trong mọi bài về chuỗi',
  level: 'basic',
  category: 'Hashing',
  tags: ['hashmap', 'string', 'counting'],
  companies: ['Amazon', 'Bloomberg', 'Uber', 'Google', 'Spotify'],
  complexity: { time: 'O(n)', space: 'O(k)', best: 'O(1)', worst: 'O(n)' },
  leetcode: [
    { id: 242, title: 'Valid Anagram', slug: 'valid-anagram' },
    { id: 49, title: 'Group Anagrams', slug: 'group-anagrams' },
    { id: 438, title: 'Find All Anagrams in a String', slug: 'find-all-anagrams-in-a-string' },
    { id: 383, title: 'Ransom Note', slug: 'ransom-note' },
  ],
  inputs: [
    { key: 's', label: 's', type: 'string', default: 'anagram', maxLength: 16 },
    { key: 't', label: 't', type: 'string', default: 'nagaram', maxLength: 16 },
  ],
  presets: [
    { label: 'Khác độ dài', values: { s: 'rat', t: 'cart' } },
    { label: 'Cùng độ dài, khác', values: { s: 'rat', t: 'car' } },
    { label: 'Unicode', values: { s: 'việt', t: 'tệiv' } },
  ],
};
