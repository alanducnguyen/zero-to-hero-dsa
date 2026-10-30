import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'word-search',
  title: 'Word Search (Backtracking)',
  subtitle: 'DFS quay lui trên lưới ký tự – đánh dấu ô tại chỗ rồi khôi phục khi quay lui',
  level: 'expert',
  category: 'Backtracking',
  tags: ['backtracking', 'dfs', 'grid', 'recursion', 'pruning'],
  companies: ['Amazon', 'Microsoft', 'Meta', 'Bloomberg', 'Uber', 'Apple'],
  complexity: { time: 'O(m·n·3^L)', space: 'O(L)', best: 'O(m·n)', worst: 'O(m·n·3^L)' },
  leetcode: [
    { id: 79, title: 'Word Search', slug: 'word-search' },
    { id: 212, title: 'Word Search II', slug: 'word-search-ii' },
    { id: 1219, title: 'Path with Maximum Gold', slug: 'path-with-maximum-gold' },
  ],
  inputs: [
    { key: 'board', label: 'Lưới ký tự (mỗi phần tử một hàng)', type: 'string[]', default: ['ABCE', 'SFCS', 'ADEE'], maxLength: 6 },
    { key: 'word', label: 'Từ cần tìm', type: 'string', default: 'SEE', maxLength: 10 },
  ],
  presets: [
    { label: 'ABCCED (có quay lui)', values: { board: ['ABCE', 'SFCS', 'ADEE'], word: 'ABCCED' } },
    { label: 'ABCB (không dùng lại ô)', values: { board: ['ABCE', 'SFCS', 'ADEE'], word: 'ABCB' } },
    { label: 'Nhiều ngõ cụt', values: { board: ['AAA', 'AAB'], word: 'AAAAB' } },
  ],
};
