import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'longest-repeating-character-replacement',
  title: 'Longest Repeating Character Replacement',
  subtitle: 'Cửa sổ trượt với bảng đếm và maxFreq không giảm – (độ dài − maxFreq) ≤ k',
  level: 'intermediate',
  category: 'Two Pointers & Sliding Window',
  tags: ['sliding-window', 'hashmap', 'string', 'frequency-count'],
  companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Uber'],
  complexity: { time: 'O(n)', space: 'O(1) – tối đa 26 ký tự', best: 'O(n)', worst: 'O(n)' },
  leetcode: [
    { id: 424, title: 'Longest Repeating Character Replacement', slug: 'longest-repeating-character-replacement' },
    { id: 1004, title: 'Max Consecutive Ones III', slug: 'max-consecutive-ones-iii' },
    { id: 2024, title: 'Maximize the Confusion of an Exam', slug: 'maximize-the-confusion-of-an-exam' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters' },
  ],
  inputs: [
    { key: 's', label: 'Chuỗi s (chữ in hoa)', type: 'string', default: 'AABABBA', maxLength: 16 },
    { key: 'k', label: 'k (số lần thay)', type: 'number', default: 1, min: 0, max: 10 },
  ],
  presets: [
    { label: 'ABAB, k=2', values: { s: 'ABAB', k: 2 } },
    { label: 'k = 0', values: { s: 'ABBBCCCCA', k: 0 } },
    { label: 'maxFreq lỗi thời', values: { s: 'AAAABCDEBBB', k: 2 } },
  ],
};
