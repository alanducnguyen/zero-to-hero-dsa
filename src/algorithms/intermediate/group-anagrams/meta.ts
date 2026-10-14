import type { AlgorithmMeta } from '@/engine/types';
export const meta: AlgorithmMeta = {
  id: 'group-anagrams',
  title: 'Group Anagrams',
  subtitle: 'Khoá chuẩn hoá + HashMap – mẫu "nhóm theo lớp tương đương" dùng khắp nơi',
  level: 'intermediate',
  category: 'Hashing',
  tags: ['hashmap', 'string', 'sorting', 'canonical-key'],
  companies: ['Amazon', 'Meta', 'Uber', 'Google', 'Bloomberg'],
  complexity: { time: 'O(N · L log L)', space: 'O(N · L)', best: 'O(N · L)', worst: 'O(N · L log L)' },
  leetcode: [
    { id: 49, title: 'Group Anagrams', slug: 'group-anagrams' },
    { id: 242, title: 'Valid Anagram', slug: 'valid-anagram' },
    { id: 249, title: 'Group Shifted Strings', slug: 'group-shifted-strings' },
    { id: 1002, title: 'Find Common Characters', slug: 'find-common-characters' },
  ],
  inputs: [{ key: 'words', label: 'Các từ', type: 'string[]', default: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'], maxLength: 12 }],
  presets: [
    { label: 'Có chuỗi rỗng', values: { words: ['', 'b', ''] } },
    { label: 'Không nhóm nào', values: { words: ['ab', 'cd', 'ef'] } },
  ],
};
