import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'merge-k-sorted-lists',
  title: 'Merge k Sorted Lists',
  subtitle: 'Min-heap k phần tử – mỗi danh sách một đại diện, O(N log k) thay vì O(N·k)',
  level: 'advanced',
  category: 'Heap',
  tags: ['heap', 'merge', 'k-way', 'divide-and-conquer', 'linked-list'],
  companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Uber', 'Airbnb'],
  complexity: { time: 'O(N log k)', space: 'O(k)', best: 'O(N)', worst: 'O(N log k)' },
  leetcode: [
    { id: 23, title: 'Merge k Sorted Lists', slug: 'merge-k-sorted-lists' },
    { id: 21, title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists' },
    { id: 378, title: 'Kth Smallest Element in a Sorted Matrix', slug: 'kth-smallest-element-in-a-sorted-matrix' },
    { id: 632, title: 'Smallest Range Covering Elements from K Lists', slug: 'smallest-range-covering-elements-from-k-lists' },
  ],
  inputs: [
    {
      key: 'lists',
      label: 'k danh sách (mỗi hàng một danh sách, tự sắp xếp)',
      type: 'grid',
      default: [
        [1, 4, 5],
        [1, 3, 4],
        [2, 6],
      ],
    },
  ],
  presets: [
    { label: 'Có danh sách rỗng', values: { lists: [[], [2, 3], [], [1]] } },
    { label: 'Một danh sách', values: { lists: [[1, 2, 3]] } },
    { label: 'k = 4, độ dài lệch', values: { lists: [[9], [1, 2, 3, 4], [5, 6], [0, 7]] } },
  ],
};
