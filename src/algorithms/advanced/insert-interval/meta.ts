import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'insert-interval',
  title: 'Insert Interval',
  subtitle: 'Chèn khoảng mới vào danh sách đã sắp xếp bằng 3 pha: trái – gộp – phải, O(n) một lượt quét',
  level: 'advanced',
  category: 'Greedy & Sorting',
  tags: ['intervals', 'greedy', 'sweep-line', 'array'],
  companies: ['Google', 'Meta', 'Amazon', 'LinkedIn', 'Microsoft'],
  complexity: { time: 'O(n)', space: 'O(n)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 57, title: 'Insert Interval', slug: 'insert-interval' },
    { id: 56, title: 'Merge Intervals', slug: 'merge-intervals' },
    { id: 715, title: 'Range Module', slug: 'range-module' },
    { id: 352, title: 'Data Stream as Disjoint Intervals', slug: 'data-stream-as-disjoint-intervals' },
  ],
  inputs: [
    { key: 'intervals', label: 'Các khoảng đã sắp xếp "a-b"', type: 'string[]', default: ['1-2', '3-5', '6-7', '8-10', '12-16'], maxLength: 12 },
    { key: 'newInterval', label: 'Khoảng mới "a-b"', type: 'string', default: '4-8', maxLength: 12 },
  ],
  presets: [
    { label: 'Không chồng lấn', values: { intervals: ['1-3', '6-9'], newInterval: '4-5' } },
    { label: 'Nuốt tất cả', values: { intervals: ['2-3', '5-6', '8-9'], newInterval: '1-10' } },
    { label: 'Danh sách rỗng', values: { intervals: [], newInterval: '5-7' } },
  ],
};
