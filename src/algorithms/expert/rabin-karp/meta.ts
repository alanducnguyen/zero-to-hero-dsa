import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'rabin-karp',
  title: 'Rabin-Karp',
  subtitle: 'Rolling hash – trượt cửa sổ O(1), chỉ so ký tự khi hash trùng',
  level: 'expert',
  category: 'String',
  tags: ['string', 'hashing', 'rolling-hash', 'pattern-matching'],
  companies: ['Google', 'Meta', 'Amazon', 'Dropbox', 'Cloudflare'],
  complexity: { time: 'O(n + m) trung bình', space: 'O(1)', best: 'O(n + m)', worst: 'O(n·m)' },
  leetcode: [
    { id: 28, title: 'Find the Index of the First Occurrence in a String', slug: 'find-the-index-of-the-first-occurrence-in-a-string' },
    { id: 187, title: 'Repeated DNA Sequences', slug: 'repeated-dna-sequences' },
    { id: 1044, title: 'Longest Duplicate Substring', slug: 'longest-duplicate-substring' },
    { id: 1392, title: 'Longest Happy Prefix', slug: 'longest-happy-prefix' },
  ],
  inputs: [
    { key: 'text', label: 'text', type: 'string', default: 'abracadabra', maxLength: 16 },
    { key: 'pattern', label: 'pattern', type: 'string', default: 'abra', maxLength: 6 },
    { key: 'mod', label: 'mod M (nhỏ ⇒ dễ va chạm)', type: 'number', default: 101, min: 2, max: 1000 },
  ],
  presets: [
    { label: 'Va chạm giả (mod 7)', values: { text: 'abcdabcxabcd', pattern: 'abcd', mod: 7 } },
    { label: 'Không khớp', values: { text: 'hello world', pattern: 'xyz', mod: 101 } },
    { label: 'Khớp chồng lấn', values: { text: 'aaaaa', pattern: 'aa', mod: 101 } },
  ],
};
