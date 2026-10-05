import type { AlgorithmModule, Level } from '@/engine/types';
import linearSearch from '@/algorithms/basic/linear-search';
import binarySearch from '@/algorithms/basic/binary-search';
import bubbleSort from '@/algorithms/basic/bubble-sort';
import selectionSort from '@/algorithms/basic/selection-sort';
import countingSort from '@/algorithms/basic/counting-sort';
import insertionSort from '@/algorithms/basic/insertion-sort';
import validParentheses from '@/algorithms/basic/valid-parentheses';
import twoSumHashmap from '@/algorithms/basic/two-sum-hashmap';
import prefixSum from '@/algorithms/basic/prefix-sum';
import queueTwoStacks from '@/algorithms/basic/queue-two-stacks';
import twoSumSorted from '@/algorithms/intermediate/two-sum-sorted';
import slidingWindow from '@/algorithms/intermediate/longest-substring-no-repeat';
import mergeSort from '@/algorithms/intermediate/merge-sort';
import quickSort from '@/algorithms/intermediate/quick-sort';
import reverseLinkedList from '@/algorithms/intermediate/reverse-linked-list';
import linkedListCycle from '@/algorithms/intermediate/linked-list-cycle';
import lruCache from '@/algorithms/intermediate/lru-cache';
import binaryTreeTraversal from '@/algorithms/intermediate/binary-tree-traversal';
import bstOperations from '@/algorithms/intermediate/bst-operations';
import numberOfIslands from '@/algorithms/intermediate/number-of-islands';
import bfsGrid from '@/algorithms/advanced/bfs-grid-shortest-path';
import dijkstra from '@/algorithms/advanced/dijkstra';
import kthLargest from '@/algorithms/advanced/kth-largest-heap';
import topologicalSort from '@/algorithms/advanced/topological-sort';
import nQueens from '@/algorithms/advanced/n-queens';
import houseRobber from '@/algorithms/advanced/house-robber';
import editDistance from '@/algorithms/expert/edit-distance';
import trie from '@/algorithms/expert/trie';
import monotonicStack from '@/algorithms/expert/largest-rectangle-histogram';
import unionFind from '@/algorithms/expert/union-find';
import bitManipulation from '@/algorithms/expert/single-number-bits';
import kadane from '@/algorithms/expert/max-subarray-kadane';

/** Thứ tự = thứ tự học đề xuất. */
export const ALGORITHMS: AlgorithmModule[] = [
  // Cơ bản
  linearSearch,
  binarySearch,
  bubbleSort,
  selectionSort,
  insertionSort,
  countingSort,
  validParentheses,
  twoSumHashmap,
  prefixSum,
  queueTwoStacks,
  // Middle
  twoSumSorted,
  slidingWindow,
  mergeSort,
  quickSort,
  reverseLinkedList,
  linkedListCycle,
  lruCache,
  binaryTreeTraversal,
  bstOperations,
  numberOfIslands,
  // Nâng cao
  bfsGrid,
  dijkstra,
  kthLargest,
  topologicalSort,
  nQueens,
  houseRobber,
  // Siêu cấp
  editDistance,
  trie,
  monotonicStack,
  unionFind,
  bitManipulation,
  kadane,
];

export const byId = new Map(ALGORITHMS.map((m) => [m.meta.id, m]));
export const byLevel = (level: Level) => ALGORITHMS.filter((m) => m.meta.level === level);
export const CATEGORIES = [...new Set(ALGORITHMS.map((m) => m.meta.category))];
