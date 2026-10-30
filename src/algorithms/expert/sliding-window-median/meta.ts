import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'sliding-window-median',
  title: 'Sliding Window Median',
  subtitle: 'Hai heap + xoá trễ (lazy deletion) – trung vị mọi cửa sổ trong O(n log n)',
  level: 'expert',
  category: 'Heap',
  tags: ['heap', 'two-heaps', 'sliding-window', 'lazy-deletion', 'hard'],
  companies: ['Google', 'Amazon', 'Meta', 'Spotify', 'Citadel', 'Two Sigma'],
  complexity: { time: 'O(n log n)', space: 'O(n)', best: 'O(n log k)', worst: 'O(n log n)' },
  leetcode: [
    { id: 480, title: 'Sliding Window Median', slug: 'sliding-window-median' },
    { id: 295, title: 'Find Median from Data Stream', slug: 'find-median-from-data-stream' },
    { id: 239, title: 'Sliding Window Maximum', slug: 'sliding-window-maximum' },
    { id: 502, title: 'IPO', slug: 'ipo' },
  ],
  inputs: [
    { key: 'nums', label: 'Mảng', type: 'number[]', default: [1, 3, -1, -3, 5, 3, 6, 7], min: -20, max: 20, maxLength: 14 },
    { key: 'k', label: 'k', type: 'number', default: 3, min: 1, max: 14 },
  ],
  presets: [
    { label: 'k chẵn', values: { nums: [1, 4, 2, 3, 6, 5], k: 4 } },
    { label: 'Nhiều giá trị trùng', values: { nums: [2, 2, 1, 2, 3, 2, 2], k: 3 } },
    { label: 'Giảm dần', values: { nums: [9, 7, 5, 3, 1, 0], k: 2 } },
  ],
};
