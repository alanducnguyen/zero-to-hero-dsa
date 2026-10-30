import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'valid-palindrome',
  title: 'Valid Palindrome',
  subtitle: 'Hai con trỏ ngược chiều – bỏ qua ký tự không phải chữ/số, so sánh không phân biệt hoa thường',
  level: 'basic',
  category: 'Two Pointers & Sliding Window',
  tags: ['two-pointers', 'string'],
  companies: ['Meta', 'Microsoft', 'Amazon', 'Apple', 'Bloomberg'],
  complexity: { time: 'O(n)', space: 'O(1)', best: 'O(1)', worst: 'O(n)' },
  leetcode: [
    { id: 125, title: 'Valid Palindrome', slug: 'valid-palindrome' },
    { id: 680, title: 'Valid Palindrome II', slug: 'valid-palindrome-ii' },
  ],
  inputs: [{ key: 's', label: 'Chuỗi s', type: 'string', default: 'A man, a plan, a canal: Panama', maxLength: 40 }],
  presets: [
    { label: 'Không phải palindrome', values: { s: 'race a car' } },
    { label: 'Toàn ký tự rác', values: { s: ' .,!? ' } },
    { label: 'Chữ và số lẫn lộn', values: { s: 'No 1, on!' } },
  ],
};
