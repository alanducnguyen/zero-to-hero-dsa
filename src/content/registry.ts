import type { AlgorithmModule, Level } from '@/engine/types';
import binarySearch from '@/algorithms/basic/binary-search';
import bubbleSort from '@/algorithms/basic/bubble-sort';
import validParentheses from '@/algorithms/basic/valid-parentheses';
import twoSumSorted from '@/algorithms/intermediate/two-sum-sorted';
import slidingWindow from '@/algorithms/intermediate/longest-substring-no-repeat';
import mergeSort from '@/algorithms/intermediate/merge-sort';
import quickSort from '@/algorithms/intermediate/quick-sort';
import reverseLinkedList from '@/algorithms/intermediate/reverse-linked-list';
import bfsGrid from '@/algorithms/advanced/bfs-grid-shortest-path';
import dijkstra from '@/algorithms/advanced/dijkstra';
import kthLargest from '@/algorithms/advanced/kth-largest-heap';
import editDistance from '@/algorithms/expert/edit-distance';
import trie from '@/algorithms/expert/trie';
import monotonicStack from '@/algorithms/expert/largest-rectangle-histogram';

/** Thứ tự = thứ tự học đề xuất. */
export const ALGORITHMS: AlgorithmModule[] = [
  // Cơ bản
  binarySearch,
  bubbleSort,
  validParentheses,
  // Middle
  twoSumSorted,
  slidingWindow,
  mergeSort,
  quickSort,
  reverseLinkedList,
  // Nâng cao
  bfsGrid,
  dijkstra,
  kthLargest,
  // Siêu cấp
  editDistance,
  trie,
  monotonicStack,
];

export const byId = new Map(ALGORITHMS.map((m) => [m.meta.id, m]));
export const byLevel = (level: Level) => ALGORITHMS.filter((m) => m.meta.level === level);
export const CATEGORIES = [...new Set(ALGORITHMS.map((m) => m.meta.category))];
