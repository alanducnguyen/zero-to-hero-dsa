import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'course-schedule',
  title: 'Course Schedule (DFS 3 màu)',
  subtitle: 'Phát hiện chu trình và sắp xếp topo bằng DFS WHITE/GRAY/BLACK – đối chiếu với Kahn BFS',
  level: 'advanced',
  category: 'Graph',
  tags: ['graph', 'dfs', 'topological-sort', 'cycle-detection', 'dag'],
  companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Uber', 'Apple'],
  complexity: { time: 'O(V + E)', space: 'O(V + E)', best: 'O(V + E)', worst: 'O(V + E)' },
  leetcode: [
    { id: 207, title: 'Course Schedule', slug: 'course-schedule' },
    { id: 210, title: 'Course Schedule II', slug: 'course-schedule-ii' },
    { id: 802, title: 'Find Eventual Safe States', slug: 'find-eventual-safe-states' },
    { id: 1462, title: 'Course Schedule IV', slug: 'course-schedule-iv' },
  ],
  inputs: [
    { key: 'numCourses', label: 'Số môn học', type: 'number', default: 6, min: 0, max: 8 },
    { key: 'prerequisites', label: 'Điều kiện "b->a" (học b trước a)', type: 'string[]', default: ['0->1', '0->2', '1->3', '2->3', '3->4', '5->4'], maxLength: 14 },
  ],
  presets: [
    { label: 'Có chu trình', values: { numCourses: 4, prerequisites: ['0->1', '1->2', '2->3', '3->1'] } },
    { label: 'LeetCode 210 ví dụ 2', values: { numCourses: 4, prerequisites: ['0->1', '0->2', '1->3', '2->3'] } },
    { label: 'Tự vòng', values: { numCourses: 2, prerequisites: ['0->1', '1->1'] } },
  ],
};
