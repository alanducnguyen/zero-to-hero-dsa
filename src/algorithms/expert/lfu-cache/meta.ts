import type { AlgorithmMeta } from '@/engine/types';

export const meta: AlgorithmMeta = {
  id: 'lfu-cache',
  title: 'LFU Cache',
  subtitle: 'Loại key ít dùng nhất trong O(1) – Map key, bucket theo tần suất và minFreq',
  level: 'expert',
  category: 'Design',
  tags: ['design', 'hashmap', 'cache', 'ordered-set', 'hard'],
  companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'LinkedIn', 'Snap'],
  complexity: { time: 'O(1) mỗi thao tác', space: 'O(capacity)', best: 'O(1)', worst: 'O(1)' },
  leetcode: [
    { id: 460, title: 'LFU Cache', slug: 'lfu-cache' },
    { id: 146, title: 'LRU Cache', slug: 'lru-cache' },
    { id: 432, title: 'All O`one Data Structure', slug: 'all-oone-data-structure' },
    { id: 895, title: 'Maximum Frequency Stack', slug: 'maximum-frequency-stack' },
  ],
  inputs: [
    { key: 'capacity', label: 'capacity (1–6)', type: 'number', default: 2, min: 1, max: 6 },
    { key: 'ops', label: 'Thao tác: "put k v", "get k"', type: 'string[]', default: ['put 1 1', 'put 2 2', 'get 1', 'put 3 3', 'get 2', 'get 3', 'put 4 4', 'get 1', 'get 3', 'get 4'], maxLength: 20 },
  ],
  presets: [
    { label: 'Hoà tần suất ⇒ LRU', values: { capacity: 2, ops: ['put 1 10', 'put 2 20', 'get 1', 'get 2', 'put 3 30', 'get 1', 'get 2', 'get 3'] } },
    { label: 'Cập nhật key cũ', values: { capacity: 2, ops: ['put 1 1', 'put 1 5', 'put 2 2', 'put 3 3', 'get 1', 'get 2', 'get 3'] } },
    { label: 'capacity 1', values: { capacity: 1, ops: ['put 1 1', 'get 1', 'put 2 2', 'get 1', 'get 2'] } },
  ],
};
