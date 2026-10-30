import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'product-except-self',
  title: 'Product of Array Except Self',
  subtitle: 'Prefix product trong mảng output + biến suffix chạy ngược – O(n), O(1) phụ, không dùng phép chia',
  level: 'basic',
  category: 'Array',
  tags: ['prefix-sum', 'prefix-product', 'array'],
  companies: ['Amazon', 'Meta', 'Apple', 'Microsoft', 'Google'],
  complexity: { time: 'O(n)', space: 'O(1) phụ (không tính output)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 238, title: 'Product of Array Except Self', slug: 'product-of-array-except-self' },
    { id: 42, title: 'Trapping Rain Water', slug: 'trapping-rain-water' },
    { id: 724, title: 'Find Pivot Index', slug: 'find-pivot-index' },
    { id: 152, title: 'Maximum Product Subarray', slug: 'maximum-product-subarray' },
  ],
  inputs: [{ key: 'nums', label: 'Mảng nums', type: 'number[]', default: [1, 2, 3, 4], min: -9, max: 9, maxLength: 10 }],
  presets: [
    { label: 'Có một số 0', values: { nums: [-1, 1, 0, -3, 3] } },
    { label: 'Hai số 0 (toàn 0)', values: { nums: [0, 4, 0, 2] } },
    { label: 'Số âm', values: { nums: [2, -3, 4, -1] } },
  ],
};
