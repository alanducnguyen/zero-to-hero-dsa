import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'task-scheduler',
  title: 'Task Scheduler (Greedy khung)',
  subtitle: 'Lập lịch CPU với cooldown – công thức (maxFreq − 1)·(n + 1) + countMax qua hình ảnh "khung"',
  level: 'advanced',
  category: 'Greedy',
  tags: ['greedy', 'counting', 'hash-map', 'heap', 'math'],
  companies: ['Meta', 'Amazon', 'Microsoft', 'Google', 'Uber'],
  complexity: { time: 'O(N)', space: 'O(1) (≤ 26 loại)', best: 'O(N)', worst: 'O(N)' },
  leetcode: [
    { id: 621, title: 'Task Scheduler', slug: 'task-scheduler' },
    { id: 358, title: 'Rearrange String k Distance Apart', slug: 'rearrange-string-k-distance-apart' },
    { id: 767, title: 'Reorganize String', slug: 'reorganize-string' },
    { id: 2365, title: 'Task Scheduler II', slug: 'task-scheduler-ii' },
  ],
  inputs: [
    { key: 'tasks', label: 'Danh sách task (mỗi chữ cái là một task)', type: 'string', default: 'AAABBC', maxLength: 20 },
    { key: 'n', label: 'Cooldown n', type: 'number', default: 2, min: 0, max: 6 },
  ],
  presets: [
    { label: 'LeetCode ví dụ 1 (có idle)', values: { tasks: 'AAABBB', n: 2 } },
    { label: 'Khung đầy – không idle', values: { tasks: 'AAABCDEFG', n: 2 } },
    { label: 'Một loại áp đảo', values: { tasks: 'AAAAAABCDEFG', n: 2 } },
  ],
};
