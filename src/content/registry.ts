import type { AlgorithmModule, Level } from '@/engine/types';
import binarySearch from '@/algorithms/basic/binary-search';
import bubbleSort from '@/algorithms/basic/bubble-sort';
import validParentheses from '@/algorithms/basic/valid-parentheses';
import slidingWindow from '@/algorithms/intermediate/longest-substring-no-repeat';
import quickSort from '@/algorithms/intermediate/quick-sort';
import reverseLinkedList from '@/algorithms/intermediate/reverse-linked-list';

/** Thứ tự = thứ tự học đề xuất. */
export const ALGORITHMS: AlgorithmModule[] = [
  // Cơ bản
  binarySearch,
  bubbleSort,
  validParentheses,
  // Middle
  slidingWindow,
  quickSort,
  reverseLinkedList,
];

export const byId = new Map(ALGORITHMS.map((m) => [m.meta.id, m]));
export const byLevel = (level: Level) => ALGORITHMS.filter((m) => m.meta.level === level);
export const CATEGORIES = [...new Set(ALGORITHMS.map((m) => m.meta.category))];
