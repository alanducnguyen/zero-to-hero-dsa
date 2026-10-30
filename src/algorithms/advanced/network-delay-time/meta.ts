import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'network-delay-time',
  title: 'Network Delay Time',
  subtitle: 'Dijkstra có hướng với binary min-heap tự cài: đáp án là max của dist[]',
  level: 'advanced',
  category: 'Graph',
  tags: ['graph', 'shortest-path', 'dijkstra', 'heap', 'priority-queue'],
  companies: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Uber'],
  complexity: { time: 'O(E log E)', space: 'O(V + E)', best: 'O(V + E)', worst: 'O(E log E)' },
  leetcode: [
    { id: 743, title: 'Network Delay Time', slug: 'network-delay-time' },
    { id: 1514, title: 'Path with Maximum Probability', slug: 'path-with-maximum-probability' },
    { id: 1631, title: 'Path With Minimum Effort', slug: 'path-with-minimum-effort' },
    { id: 787, title: 'Cheapest Flights Within K Stops', slug: 'cheapest-flights-within-k-stops' },
  ],
  inputs: [
    {
      key: 'times',
      label: 'Cạnh có hướng, mỗi dòng "u v w" (u → v mất w)',
      type: 'grid',
      default: [
        [1, 2, 4],
        [1, 3, 1],
        [3, 2, 2],
        [2, 4, 1],
        [3, 4, 5],
        [4, 5, 3],
        [5, 1, 1],
      ],
    },
    { key: 'n', label: 'Số node n (đánh số 1..n, tối đa 12)', type: 'number', default: 5, min: 1, max: 12 },
    { key: 'k', label: 'Node phát tín hiệu k', type: 'number', default: 1, min: 1, max: 12 },
  ],
  presets: [
    { label: 'LeetCode ví dụ 1 (đáp án 2)', values: { times: [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 2 } },
    { label: 'Cạnh ngược chiều ⇒ -1', values: { times: [[2, 1, 1], [2, 3, 1], [1, 3, 5]], n: 3, k: 1 } },
    { label: 'Đường vòng rẻ hơn cạnh thẳng', values: { times: [[1, 4, 10], [1, 2, 1], [2, 3, 1], [3, 4, 1]], n: 4, k: 1 } },
  ],
};
