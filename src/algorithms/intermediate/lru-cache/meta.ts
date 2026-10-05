import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'lru-cache',
  title: 'LRU Cache',
  subtitle: 'Bài design phổ biến nhất – HashMap + doubly linked list cho get/put O(1)',
  level: 'intermediate',
  category: 'Design',
  tags: ['design', 'hashmap', 'linked-list', 'cache'],
  companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Uber', 'Snap'],
  complexity: { time: 'O(1) mỗi thao tác', space: 'O(capacity)', best: 'O(1)', worst: 'O(1)' },
  leetcode: [
    { id: 146, title: 'LRU Cache', slug: 'lru-cache' },
    { id: 460, title: 'LFU Cache', slug: 'lfu-cache' },
    { id: 432, title: 'All O`one Data Structure', slug: 'all-oone-data-structure' },
    { id: 380, title: 'Insert Delete GetRandom O(1)', slug: 'insert-delete-getrandom-o1' },
  ],
  inputs: [
    { key: 'capacity', label: 'capacity (1–6)', type: 'number', default: 2, min: 1, max: 6 },
    { key: 'ops', label: 'Thao tác: "put k v", "get k"', type: 'string[]', default: ['put 1 1', 'put 2 2', 'get 1', 'put 3 3', 'get 2', 'put 4 4', 'get 1', 'get 3', 'get 4'], maxLength: 20 },
  ],
  presets: [
    { label: 'Cập nhật key cũ', values: { capacity: 2, ops: ['put 2 1', 'put 2 2', 'get 2', 'put 1 1', 'put 4 1', 'get 2'] } },
    { label: 'capacity 1', values: { capacity: 1, ops: ['put 1 1', 'get 1', 'put 2 2', 'get 1', 'get 2'] } },
  ],
};
