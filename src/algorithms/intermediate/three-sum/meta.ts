import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'three-sum',
  title: '3Sum',
  subtitle: 'Sắp xếp + cố định i + two pointers l/r, bỏ qua trùng – mọi bộ ba tổng 0 trong O(n²)',
  level: 'intermediate',
  category: 'Two Pointers & Sliding Window',
  tags: ['two-pointers', 'sorting', 'array', 'dedup'],
  companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Apple', 'Bloomberg'],
  complexity: { time: 'O(n²)', space: 'O(log n) – O(n) (sắp xếp)', best: 'O(n log n)', worst: 'O(n²)' },
  leetcode: [
    { id: 15, title: '3Sum', slug: '3sum' },
    { id: 16, title: '3Sum Closest', slug: '3sum-closest' },
    { id: 18, title: '4Sum', slug: '4sum' },
    { id: 259, title: '3Sum Smaller', slug: '3sum-smaller' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng nums (sẽ tự sắp xếp)', type: 'number[]', default: [-1, 0, 1, 2, -1, -4], min: -99, max: 99, maxLength: 12 },
  ],
  presets: [
    { label: 'Nhiều trùng lặp', values: { nums: [-2, 0, 0, 2, 2, -2, 0] } },
    { label: 'Toàn số 0', values: { nums: [0, 0, 0, 0] } },
    { label: 'Không có bộ nào', values: { nums: [1, 2, -5, 7] } },
  ],
};
