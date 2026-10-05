import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'valid-parentheses',
  title: 'Valid Parentheses (Stack)',
  subtitle: 'Bài toán kinh điển nhất về Stack – khớp ngoặc theo nguyên tắc LIFO',
  level: 'basic',
  category: 'Stack & Queue',
  tags: ['stack', 'string', 'matching', 'lifo'],
  companies: ['Amazon', 'Google', 'Meta', 'Bloomberg', 'Microsoft'],
  complexity: { time: 'O(n)', space: 'O(n)', best: 'O(1)', worst: 'O(n)' },
  leetcode: [
    { id: 20, title: 'Valid Parentheses', slug: 'valid-parentheses' },
    { id: 1021, title: 'Remove Outermost Parentheses', slug: 'remove-outermost-parentheses' },
    { id: 32, title: 'Longest Valid Parentheses', slug: 'longest-valid-parentheses' },
    { id: 150, title: 'Evaluate Reverse Polish Notation', slug: 'evaluate-reverse-polish-notation' },
  ],
  inputs: [{ key: 's', label: 'Chuỗi ngoặc', type: 'string', default: '{[()]}()', maxLength: 24 }],
  presets: [
    { label: 'Sai loại', values: { s: '([)]' } },
    { label: 'Đóng thừa', values: { s: '())' } },
    { label: 'Mở thừa', values: { s: '((()' } },
  ],
};
