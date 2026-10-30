import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'word-ladder',
  title: 'Word Ladder',
  subtitle: 'BFS trên đồ thị ngầm giữa các từ – gom hàng xóm bằng pattern wildcard "h*t"',
  level: 'expert',
  category: 'Graph',
  tags: ['bfs', 'graph', 'shortest-path', 'implicit-graph', 'hashmap', 'string'],
  companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'LinkedIn', 'Uber'],
  complexity: { time: 'O(n·L²)', space: 'O(n·L²)', best: 'O(n·L²)', worst: 'O(n·L²)' },
  leetcode: [
    { id: 127, title: 'Word Ladder', slug: 'word-ladder' },
    { id: 126, title: 'Word Ladder II', slug: 'word-ladder-ii' },
    { id: 433, title: 'Minimum Genetic Mutation', slug: 'minimum-genetic-mutation' },
    { id: 752, title: 'Open the Lock', slug: 'open-the-lock' },
  ],
  inputs: [
    { key: 'beginWord', label: 'Từ bắt đầu', type: 'string', default: 'hit', maxLength: 6 },
    { key: 'endWord', label: 'Từ đích', type: 'string', default: 'cog', maxLength: 6 },
    { key: 'wordList', label: 'Danh sách từ', type: 'string[]', default: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'], maxLength: 10 },
  ],
  presets: [
    { label: 'Đích không có trong list', values: { beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'dog', 'lot', 'log'] } },
    { label: 'Không liên thông', values: { beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'cog'] } },
    { label: 'Nhiều đường cùng độ dài', values: { beginWord: 'cold', endWord: 'warm', wordList: ['cord', 'card', 'ward', 'warm', 'wold', 'word', 'worm', 'corm'] } },
  ],
};
