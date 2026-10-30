import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'koko-eating-bananas',
  title: 'Koko Eating Bananas',
  subtitle: 'Binary search trên đáp án – tìm điểm chuyển của một vị từ đơn điệu',
  level: 'intermediate',
  category: 'Binary Search',
  tags: ['binary-search', 'binary-search-on-answer', 'monotonic-predicate'],
  companies: ['Google', 'Meta', 'Amazon', 'Airbnb', 'DoorDash'],
  complexity: { time: 'O(n · log M)', space: 'O(1)', best: 'O(n)', worst: 'O(n · log M)' },
  leetcode: [
    { id: 875, title: 'Koko Eating Bananas', slug: 'koko-eating-bananas' },
    { id: 1011, title: 'Capacity To Ship Packages Within D Days', slug: 'capacity-to-ship-packages-within-d-days' },
    { id: 410, title: 'Split Array Largest Sum', slug: 'split-array-largest-sum' },
    { id: 1482, title: 'Minimum Number of Days to Make m Bouquets', slug: 'minimum-number-of-days-to-make-m-bouquets' },
  ],
  inputs: [
    { key: 'piles', label: 'piles (số chuối mỗi đống, ≤ 30)', type: 'number[]', default: [3, 6, 7, 11], min: 1, max: 30, maxLength: 8 },
    { key: 'h', label: 'h (số giờ, ≥ số đống)', type: 'number', default: 8, min: 1, max: 100 },
  ],
  presets: [
    { label: 'h = số đống', values: { piles: [30, 11, 23, 4, 20], h: 5 } },
    { label: 'Dư 1 giờ', values: { piles: [30, 11, 23, 4, 20], h: 6 } },
    { label: 'Rất nhiều giờ', values: { piles: [5, 9, 2], h: 30 } },
  ],
};
