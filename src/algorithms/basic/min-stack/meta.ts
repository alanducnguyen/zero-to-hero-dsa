import type { AlgorithmMeta } from '@/engine/types';
export const meta: AlgorithmMeta = {
  id: 'min-stack',
  title: 'Min Stack',
  subtitle: 'getMin O(1) bằng stack phụ lưu min theo từng mức – bài design nhập môn',
  level: 'basic',
  category: 'Stack & Queue',
  tags: ['stack', 'design', 'auxiliary-structure'],
  companies: ['Amazon', 'Google', 'Bloomberg', 'Microsoft', 'Goldman Sachs'],
  complexity: { time: 'O(1) mỗi thao tác', space: 'O(n)', best: 'O(1)', worst: 'O(1)' },
  leetcode: [
    { id: 155, title: 'Min Stack', slug: 'min-stack' },
    { id: 716, title: 'Max Stack', slug: 'max-stack' },
    { id: 232, title: 'Implement Queue using Stacks', slug: 'implement-queue-using-stacks' },
    { id: 895, title: 'Maximum Frequency Stack', slug: 'maximum-frequency-stack' },
  ],
  inputs: [{ key: 'ops', label: 'Thao tác: "push x", "pop", "top", "getMin"', type: 'string[]', default: ['push 5', 'push 3', 'push 7', 'getMin', 'pop', 'getMin', 'push 2', 'getMin', 'pop', 'pop', 'getMin'], maxLength: 20 }],
  presets: [
    { label: 'Min trùng lặp', values: { ops: ['push 2', 'push 2', 'push 5', 'pop', 'pop', 'getMin'] } },
    { label: 'Giảm dần', values: { ops: ['push 9', 'push 7', 'push 5', 'getMin', 'pop', 'getMin'] } },
  ],
};
