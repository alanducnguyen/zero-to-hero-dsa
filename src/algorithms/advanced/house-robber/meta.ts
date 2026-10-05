import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'house-robber',
  title: 'House Robber (DP 1D)',
  subtitle: 'Quy hoạch động một chiều – cách định nghĩa trạng thái, công thức chuyển và tối ưu O(1) bộ nhớ',
  level: 'advanced',
  category: 'Dynamic Programming',
  tags: ['dp', '1d-dp', 'array', 'optimization'],
  companies: ['Amazon', 'Google', 'Microsoft', 'Adobe', 'LinkedIn'],
  complexity: { time: 'O(n)', space: 'O(n) → O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 198, title: 'House Robber', slug: 'house-robber' },
    { id: 213, title: 'House Robber II', slug: 'house-robber-ii' },
    { id: 70, title: 'Climbing Stairs', slug: 'climbing-stairs' },
    { id: 740, title: 'Delete and Earn', slug: 'delete-and-earn' },
  ],
  inputs: [{ key: 'nums', label: 'Tiền ở mỗi nhà', type: 'number[]', default: [2, 7, 9, 3, 1], min: 0, max: 99, maxLength: 12 }],
  presets: [
    { label: 'Lấy cách 2', values: { nums: [1, 2, 3, 1] } },
    { label: 'Nhà ở giữa to', values: { nums: [2, 1, 1, 9, 1, 1, 2] } },
    { label: '1 nhà', values: { nums: [5] } },
  ],
};
