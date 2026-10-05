import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'merge-intervals',
  title: 'Merge Intervals',
  subtitle: 'Sắp xếp + quét một lượt – pattern "intervals" cho lịch họp, đặt phòng, gộp khoảng',
  level: 'advanced',
  category: 'Greedy & Sorting',
  tags: ['intervals', 'sorting', 'greedy', 'sweep-line'],
  companies: ['Meta', 'Google', 'Amazon', 'Bloomberg', 'Microsoft', 'LinkedIn'],
  complexity: { time: 'O(n log n)', space: 'O(n)', best: 'O(n log n)', worst: 'O(n log n)' },
  leetcode: [
    { id: 56, title: 'Merge Intervals', slug: 'merge-intervals' },
    { id: 57, title: 'Insert Interval', slug: 'insert-interval' },
    { id: 435, title: 'Non-overlapping Intervals', slug: 'non-overlapping-intervals' },
    { id: 253, title: 'Meeting Rooms II', slug: 'meeting-rooms-ii' },
  ],
  inputs: [{ key: 'intervals', label: 'Các khoảng "a-b"', type: 'string[]', default: ['1-3', '8-10', '2-6', '15-18', '9-12', '16-17'], maxLength: 12 }],
  presets: [
    { label: 'Chạm đầu mút', values: { intervals: ['1-4', '4-5'] } },
    { label: 'Lồng nhau', values: { intervals: ['1-10', '2-3', '4-5', '11-12'] } },
    { label: 'Không chồng', values: { intervals: ['1-2', '3-4', '5-6'] } },
  ],
};
