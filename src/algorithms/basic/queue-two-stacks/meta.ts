import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'queue-two-stacks',
  title: 'Queue bằng hai Stack',
  subtitle: 'Bài design kinh điển – hiểu amortized O(1) qua việc "đảo" inbox sang outbox đúng lúc',
  level: 'basic',
  category: 'Stack & Queue',
  tags: ['stack', 'queue', 'design', 'amortized'],
  companies: ['Amazon', 'Microsoft', 'Bloomberg', 'Apple', 'Oracle'],
  complexity: { time: 'O(1) amortized', space: 'O(n)', best: 'O(1)', worst: 'O(n) một lần pop' },
  leetcode: [
    { id: 232, title: 'Implement Queue using Stacks', slug: 'implement-queue-using-stacks' },
    { id: 225, title: 'Implement Stack using Queues', slug: 'implement-stack-using-queues' },
    { id: 155, title: 'Min Stack', slug: 'min-stack' },
    { id: 622, title: 'Design Circular Queue', slug: 'design-circular-queue' },
  ],
  inputs: [{ key: 'ops', label: 'Thao tác: "push x", "pop", "peek"', type: 'string[]', default: ['push 1', 'push 2', 'push 3', 'pop', 'push 4', 'peek', 'pop', 'pop', 'pop', 'pop'], maxLength: 20 }],
  presets: [
    { label: 'Pop khi rỗng', values: { ops: ['pop', 'push 5', 'pop', 'pop'] } },
    { label: 'Xen kẽ', values: { ops: ['push 1', 'pop', 'push 2', 'push 3', 'pop', 'push 4', 'pop', 'pop'] } },
  ],
};
