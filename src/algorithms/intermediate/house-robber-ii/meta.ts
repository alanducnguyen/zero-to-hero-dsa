import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'house-robber-ii',
  title: 'House Robber II (vòng tròn)',
  subtitle: 'Phá vòng tròn bằng cách tách 2 trường hợp – max(rob(0..n−2), rob(1..n−1)) với DP O(1) bộ nhớ',
  level: 'intermediate',
  category: 'Dynamic Programming',
  tags: ['dp', '1d-dp', 'array', 'circular'],
  companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Adobe'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 213, title: 'House Robber II', slug: 'house-robber-ii' },
    { id: 198, title: 'House Robber', slug: 'house-robber' },
    { id: 337, title: 'House Robber III', slug: 'house-robber-iii' },
    { id: 918, title: 'Maximum Sum Circular Subarray', slug: 'maximum-sum-circular-subarray' },
  ],
  inputs: [{ key: 'nums', label: 'Tiền ở mỗi nhà (vòng tròn)', type: 'number[]', default: [2, 7, 9, 3, 1], min: 0, max: 999, maxLength: 12 }],
  presets: [
    { label: 'Đầu–cuối kề nhau', values: { nums: [2, 3, 2] } },
    { label: 'Nhà đầu rất to', values: { nums: [200, 3, 140, 20, 10] } },
    { label: '1 nhà', values: { nums: [5] } },
  ],
};
