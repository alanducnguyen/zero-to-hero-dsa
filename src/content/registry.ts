import type { AlgorithmModule, Level } from '@/engine/types';
import binarySearch from '@/algorithms/basic/binary-search';
import bubbleSort from '@/algorithms/basic/bubble-sort';
import validParentheses from '@/algorithms/basic/valid-parentheses';

/** Thứ tự = thứ tự học đề xuất. */
export const ALGORITHMS: AlgorithmModule[] = [
  // Cơ bản
  binarySearch,
  bubbleSort,
  validParentheses,
];

export const byId = new Map(ALGORITHMS.map((m) => [m.meta.id, m]));
export const byLevel = (level: Level) => ALGORITHMS.filter((m) => m.meta.level === level);
export const CATEGORIES = [...new Set(ALGORITHMS.map((m) => m.meta.category))];
