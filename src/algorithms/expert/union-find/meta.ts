import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'union-find',
  title: 'Union-Find (DSU)',
  subtitle: 'Disjoint Set Union với path compression và union by rank – gần O(1) cho mọi thao tác',
  level: 'expert',
  category: 'Graph',
  tags: ['union-find', 'dsu', 'graph', 'connectivity', 'amortized'],
  companies: ['Google', 'Amazon', 'Meta', 'Uber', 'Bloomberg'],
  complexity: { time: 'O(α(n)) mỗi thao tác', space: 'O(n)', best: 'O(1)', worst: 'O(log n) một thao tác' },
  leetcode: [
    { id: 547, title: 'Number of Provinces', slug: 'number-of-provinces' },
    { id: 684, title: 'Redundant Connection', slug: 'redundant-connection' },
    { id: 721, title: 'Accounts Merge', slug: 'accounts-merge' },
    { id: 1584, title: 'Min Cost to Connect All Points', slug: 'min-cost-to-connect-all-points' },
  ],
  inputs: [
    { key: 'n', label: 'Số phần tử (0..n-1)', type: 'number', default: 8, min: 1, max: 12 },
    { key: 'ops', label: 'Thao tác: a-b = union, a?b = connected', type: 'string[]', default: ['0-1', '2-3', '1-3', '4-5', '0-3', '6-7', '5-7', '0?7', '4-0', '1?6'], maxLength: 20 },
  ],
  presets: [
    { label: 'Chuỗi dài (xem nén đường)', values: { n: 6, ops: ['0-1', '1-2', '2-3', '3-4', '4-5', '0?5'] } },
    { label: 'Phát hiện chu trình', values: { n: 4, ops: ['0-1', '1-2', '2-0'] } },
  ],
};
