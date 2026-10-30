import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'meeting-rooms-ii',
  title: 'Meeting Rooms II',
  subtitle: 'Sắp xếp theo giờ bắt đầu + min-heap giờ kết thúc: số phòng tối thiểu = độ chồng lấn lớn nhất',
  level: 'advanced',
  category: 'Heap',
  tags: ['intervals', 'heap', 'priority-queue', 'greedy', 'sweep-line'],
  companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Bloomberg', 'Uber'],
  complexity: { time: 'O(n log n)', space: 'O(n)', best: 'O(n log n)', worst: 'O(n log n)' },
  leetcode: [
    { id: 253, title: 'Meeting Rooms II', slug: 'meeting-rooms-ii' },
    { id: 252, title: 'Meeting Rooms', slug: 'meeting-rooms' },
    { id: 2402, title: 'Meeting Rooms III', slug: 'meeting-rooms-iii' },
    { id: 1094, title: 'Car Pooling', slug: 'car-pooling' },
  ],
  inputs: [
    { key: 'intervals', label: 'Các cuộc họp "start-end"', type: 'string[]', default: ['9-10', '0-4', '2-6', '5-8', '7-12', '4-7'], maxLength: 12 },
  ],
  presets: [
    { label: 'LeetCode ví dụ 1 (2 phòng)', values: { intervals: ['0-30', '5-10', '15-20'] } },
    { label: 'Nối tiếp nhau (1 phòng)', values: { intervals: ['1-3', '3-5', '5-7'] } },
    { label: 'Tất cả trùng nhau', values: { intervals: ['1-5', '2-6', '3-7', '4-8'] } },
  ],
};
