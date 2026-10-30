import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'pacific-atlantic-water-flow',
  title: 'Pacific Atlantic Water Flow',
  subtitle: 'Tư duy ngược: BFS lên dốc từ bờ mỗi đại dương, đáp án là giao của hai tập',
  level: 'advanced',
  category: 'Graph',
  tags: ['bfs', 'dfs', 'multi-source-bfs', 'grid', 'reverse-thinking'],
  companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Bloomberg'],
  complexity: { time: 'O(m·n)', space: 'O(m·n)', best: 'O(m·n)', worst: 'O(m·n)' },
  leetcode: [
    { id: 417, title: 'Pacific Atlantic Water Flow', slug: 'pacific-atlantic-water-flow' },
    { id: 130, title: 'Surrounded Regions', slug: 'surrounded-regions' },
    { id: 1020, title: 'Number of Enclaves', slug: 'number-of-enclaves' },
    { id: 778, title: 'Swim in Rising Water', slug: 'swim-in-rising-water' },
  ],
  inputs: [
    {
      key: 'heights',
      label: 'Lưới độ cao (mỗi dòng một hàng). Pacific: mép trên + trái, Atlantic: mép dưới + phải',
      type: 'grid',
      default: [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4],
      ],
    },
  ],
  presets: [
    { label: 'Đỉnh núi ở giữa', values: { heights: [[1, 1, 1], [1, 5, 1], [1, 1, 1]] } },
    { label: 'Một ô duy nhất', values: { heights: [[7]] } },
    { label: 'Thung lũng giữa (ô giữa bị kẹt)', values: { heights: [[3, 3, 3], [3, 1, 3], [3, 3, 3]] } },
  ],
};
