import type { Level } from '@/engine/types';

export interface LevelInfo {
  id: Level;
  title: string;
  short: string;
  description: string;
  color: string; // tailwind color token
  order: number;
}

export const LEVELS: LevelInfo[] = [
  {
    id: 'basic',
    title: 'Cơ bản',
    short: 'Nền tảng',
    description: 'Tìm kiếm, sắp xếp đơn giản, stack/queue. Hiểu Big-O và cách suy nghĩ về bất biến vòng lặp.',
    color: 'level-basic',
    order: 1,
  },
  {
    id: 'intermediate',
    title: 'Middle',
    short: 'Pattern phỏng vấn',
    description: 'Two pointers, sliding window, chia để trị, linked list. Các pattern xuất hiện trong 60% câu phỏng vấn.',
    color: 'level-intermediate',
    order: 2,
  },
  {
    id: 'advanced',
    title: 'Nâng cao',
    short: 'Đồ thị & Heap',
    description: 'BFS/DFS, Dijkstra, heap, backtracking, DP cơ bản. Mức yêu cầu cho vòng onsite big tech.',
    color: 'level-advanced',
    order: 3,
  },
  {
    id: 'expert',
    title: 'Siêu cấp',
    short: 'Tối ưu & cấu trúc đặc biệt',
    description: 'DP 2D, Trie, monotonic stack, union-find, bit. Để giải bài Hard và trả lời follow-up khó.',
    color: 'level-expert',
    order: 4,
  },
];

export const levelById = (id: Level) => LEVELS.find((l) => l.id === id)!;
