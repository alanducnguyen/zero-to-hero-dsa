import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'median-two-sorted-arrays',
  title: 'Median of Two Sorted Arrays',
  subtitle: 'Nhị phân trên điểm cắt – O(log min(m, n)), bài Hard "khó nhất trong các bài binary search"',
  level: 'expert',
  category: 'Binary Search',
  tags: ['binary-search', 'array', 'partition', 'median'],
  companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Adobe', 'Goldman Sachs'],
  complexity: { time: 'O(log min(m, n))', space: 'O(1)', best: 'O(1)', worst: 'O(log min(m, n))' },
  leetcode: [
    { id: 4, title: 'Median of Two Sorted Arrays', slug: 'median-of-two-sorted-arrays' },
    { id: 215, title: 'Kth Largest Element in an Array', slug: 'kth-largest-element-in-an-array' },
    { id: 378, title: 'Kth Smallest Element in a Sorted Matrix', slug: 'kth-smallest-element-in-a-sorted-matrix' },
  ],
  inputs: [
    { key: 'nums1', label: 'nums1 (tự sắp xếp)', type: 'number[]', default: [1, 3, 8, 9, 15], min: 0, max: 30, maxLength: 8 },
    { key: 'nums2', label: 'nums2 (tự sắp xếp)', type: 'number[]', default: [7, 11, 18, 19, 21, 25], min: 0, max: 30, maxLength: 8 },
  ],
  presets: [
    { label: 'Tổng chẵn', values: { nums1: [1, 2], nums2: [3, 4] } },
    { label: 'Một mảng rỗng', values: { nums1: [], nums2: [2, 4, 6] } },
    { label: 'Không chồng lấn', values: { nums1: [1, 2, 3], nums2: [10, 20, 30, 40] } },
  ],
};
