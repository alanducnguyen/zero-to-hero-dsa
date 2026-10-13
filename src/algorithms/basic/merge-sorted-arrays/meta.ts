import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'merge-sorted-arrays',
  title: 'Merge Sorted Array',
  subtitle: 'Trộn tại chỗ hai mảng đã sắp xếp bằng hai con trỏ đi từ cuối – không đè lên dữ liệu chưa xét',
  level: 'basic',
  category: 'Array',
  tags: ['array', 'two-pointers', 'in-place', 'merge'],
  companies: ['Meta', 'Microsoft', 'Amazon', 'Bloomberg', 'Apple'],
  complexity: { time: 'O(m + n)', space: 'O(1)', best: 'O(n)', worst: 'O(m + n)' },
  leetcode: [
    { id: 88, title: 'Merge Sorted Array', slug: 'merge-sorted-array' },
    { id: 21, title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists' },
    { id: 977, title: 'Squares of a Sorted Array', slug: 'squares-of-a-sorted-array' },
    { id: 986, title: 'Interval List Intersections', slug: 'interval-list-intersections' },
  ],
  inputs: [
    { key: 'nums1', label: 'nums1 (phần tử thật, tự sắp xếp)', type: 'number[]', default: [1, 2, 3], min: 0, max: 20, maxLength: 6 },
    { key: 'nums2', label: 'nums2 (tự sắp xếp)', type: 'number[]', default: [2, 5, 6], min: 0, max: 20, maxLength: 6 },
  ],
  presets: [
    { label: 'nums1 rỗng', values: { nums1: [], nums2: [1] } },
    { label: 'nums2 toàn nhỏ hơn', values: { nums1: [4, 5, 6], nums2: [1, 2, 3] } },
    { label: 'nums2 rỗng', values: { nums1: [1, 2], nums2: [] } },
  ],
};
