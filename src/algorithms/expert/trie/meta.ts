import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'trie',
  title: 'Trie (Prefix Tree)',
  subtitle: 'Cây tiền tố – cấu trúc dữ liệu cho autocomplete, từ điển, tìm kiếm theo tiền tố trong O(L)',
  level: 'expert',
  category: 'Tree',
  tags: ['trie', 'tree', 'string', 'prefix', 'design'],
  companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Twitter'],
  complexity: { time: 'O(L) mỗi thao tác', space: 'O(N·L·Σ)', best: 'O(1)', worst: 'O(L)' },
  leetcode: [
    { id: 208, title: 'Implement Trie (Prefix Tree)', slug: 'implement-trie-prefix-tree' },
    { id: 211, title: 'Design Add and Search Words', slug: 'design-add-and-search-words-data-structure' },
    { id: 212, title: 'Word Search II', slug: 'word-search-ii' },
    { id: 1268, title: 'Search Suggestions System', slug: 'search-suggestions-system' },
  ],
  inputs: [
    { key: 'words', label: 'Các từ để insert', type: 'string[]', default: ['car', 'card', 'care', 'cat', 'dog'], maxLength: 8 },
    { key: 'search', label: 'search(word)', type: 'string', default: 'car', maxLength: 10 },
    { key: 'prefix', label: 'startsWith(prefix)', type: 'string', default: 'ca', maxLength: 10 },
  ],
  presets: [
    { label: 'Chỉ là tiền tố', values: { words: ['apple', 'app'], search: 'ap', prefix: 'ap' } },
    { label: 'Không tồn tại', values: { words: ['hello', 'help'], search: 'hero', prefix: 'hex' } },
  ],
};
