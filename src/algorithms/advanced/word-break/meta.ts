import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'word-break',
  title: 'Word Break',
  subtitle: 'DP 1D trên tiền tố + Set từ điển – bài "có cắt được không" kinh điển',
  level: 'advanced',
  category: 'Dynamic Programming',
  tags: ['dp', 'string', 'hashset', 'prefix'],
  companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Bloomberg'],
  complexity: { time: 'O(n·L·L)', space: 'O(n + D)', best: 'O(n)', worst: 'O(n·L·L)' },
  leetcode: [
    { id: 139, title: 'Word Break', slug: 'word-break' },
    { id: 140, title: 'Word Break II', slug: 'word-break-ii' },
    { id: 472, title: 'Concatenated Words', slug: 'concatenated-words' },
    { id: 91, title: 'Decode Ways', slug: 'decode-ways' },
  ],
  inputs: [
    { key: 's', label: 'Chuỗi s', type: 'string', default: 'leetcode', maxLength: 14 },
    { key: 'wordDict', label: 'Từ điển', type: 'string[]', default: ['leet', 'code'], maxLength: 6 },
  ],
  presets: [
    { label: 'Không cắt được', values: { s: 'catsandog', wordDict: ['cats', 'dog', 'sand', 'and', 'cat'] } },
    { label: 'Dùng lại từ', values: { s: 'applepenapple', wordDict: ['apple', 'pen'] } },
    { label: 'Chuỗi rỗng', values: { s: '', wordDict: ['a'] } },
  ],
};
