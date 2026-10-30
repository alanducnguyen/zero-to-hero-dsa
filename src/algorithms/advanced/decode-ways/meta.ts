import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'decode-ways',
  title: 'Decode Ways (DP 1D)',
  subtitle: 'Đếm số cách giải mã chuỗi số – DP trên tiền tố, xử lý ký tự 0 và cặp 10..26',
  level: 'advanced',
  category: 'Dynamic Programming',
  tags: ['dp', '1d-dp', 'string', 'counting'],
  companies: ['Meta', 'Google', 'Amazon', 'Microsoft', 'Uber'],
  complexity: { time: 'O(n)', space: 'O(n) → O(1)', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 91, title: 'Decode Ways', slug: 'decode-ways' },
    { id: 639, title: 'Decode Ways II', slug: 'decode-ways-ii' },
    { id: 70, title: 'Climbing Stairs', slug: 'climbing-stairs' },
    { id: 1416, title: 'Restore The Array', slug: 'restore-the-array' },
  ],
  inputs: [{ key: 's', label: 'Chuỗi chữ số', type: 'string', default: '2263', maxLength: 16 }],
  presets: [
    { label: 'Có số 0 hợp lệ ("2101")', values: { s: '2101' } },
    { label: 'Không giải mã được ("1001")', values: { s: '1001' } },
    { label: 'Toàn số 1 (Fibonacci)', values: { s: '111111' } },
  ],
};
