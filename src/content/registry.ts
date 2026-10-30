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
import climbingStairs from '@/algorithms/basic/climbing-stairs';
import majorityElement from '@/algorithms/basic/majority-element';
import mergeSortedArrays from '@/algorithms/basic/merge-sorted-arrays';
import validAnagram from '@/algorithms/basic/valid-anagram';
import rotateArray from '@/algorithms/basic/rotate-array';
import minStack from '@/algorithms/basic/min-stack';
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
import subsets from '@/algorithms/intermediate/subsets';
import topKFrequent from '@/algorithms/intermediate/top-k-frequent';
import bipartiteCheck from '@/algorithms/intermediate/bipartite-check';
import mergeTwoSortedLists from '@/algorithms/intermediate/merge-two-sorted-lists';
import lowestCommonAncestor from '@/algorithms/intermediate/lowest-common-ancestor';
import groupAnagrams from '@/algorithms/intermediate/group-anagrams';
import bfsGrid from '@/algorithms/advanced/bfs-grid-shortest-path';
import dijkstra from '@/algorithms/advanced/dijkstra';
import kthLargest from '@/algorithms/advanced/kth-largest-heap';
import topologicalSort from '@/algorithms/advanced/topological-sort';
import nQueens from '@/algorithms/advanced/n-queens';
import houseRobber from '@/algorithms/advanced/house-robber';
import coinChange from '@/algorithms/advanced/coin-change';
import knapsack01 from '@/algorithms/advanced/knapsack-01';
import kruskalMst from '@/algorithms/advanced/kruskal-mst';
import mergeIntervals from '@/algorithms/advanced/merge-intervals';
import mergeKSortedLists from '@/algorithms/advanced/merge-k-sorted-lists';
import dailyTemperatures from '@/algorithms/advanced/daily-temperatures';
import countingBits from '@/algorithms/advanced/counting-bits';
import longestCommonSubsequence from '@/algorithms/advanced/longest-common-subsequence';
import wordBreak from '@/algorithms/advanced/word-break';
import floydWarshall from '@/algorithms/advanced/floyd-warshall';
import editDistance from '@/algorithms/expert/edit-distance';
import trie from '@/algorithms/expert/trie';
import monotonicStack from '@/algorithms/expert/largest-rectangle-histogram';
import unionFind from '@/algorithms/expert/union-find';
import bitManipulation from '@/algorithms/expert/single-number-bits';
import kadane from '@/algorithms/expert/max-subarray-kadane';
import slidingWindowMaximum from '@/algorithms/expert/sliding-window-maximum';
import lisPatience from '@/algorithms/expert/lis-patience';
import kmp from '@/algorithms/expert/kmp';
import segmentTree from '@/algorithms/expert/segment-tree';
import trappingRainWater from '@/algorithms/expert/trapping-rain-water';
import medianTwoSortedArrays from '@/algorithms/expert/median-two-sorted-arrays';
import quickselect from '@/algorithms/expert/quickselect';
import fenwickTree from '@/algorithms/expert/fenwick-tree';
import bellmanFord from '@/algorithms/expert/bellman-ford';
import rabinKarp from '@/algorithms/expert/rabin-karp';
import middleOfLinkedList from '@/algorithms/basic/middle-of-linked-list';
import jumpGame from '@/algorithms/basic/jump-game';
import subarraySumEqualsK from '@/algorithms/intermediate/subarray-sum-equals-k';
import threeSum from '@/algorithms/intermediate/three-sum';
import insertInterval from '@/algorithms/advanced/insert-interval';
import courseSchedule from '@/algorithms/advanced/course-schedule';
import minimumWindowSubstring from '@/algorithms/expert/minimum-window-substring';
import accountsMerge from '@/algorithms/expert/accounts-merge';
import containerWithMostWater from '@/algorithms/basic/container-with-most-water';
import searchRotatedArray from '@/algorithms/basic/search-rotated-array';
import kokoEatingBananas from '@/algorithms/intermediate/koko-eating-bananas';
import permutations from '@/algorithms/intermediate/permutations';
import rottingOranges from '@/algorithms/advanced/rotting-oranges';
import meetingRoomsII from '@/algorithms/advanced/meeting-rooms-ii';
import wordLadder from '@/algorithms/expert/word-ladder';
import partitionEqualSubsetSum from '@/algorithms/expert/partition-equal-subset-sum';
import validPalindrome from '@/algorithms/basic/valid-palindrome';
import bestTimeToBuySellStock from '@/algorithms/basic/best-time-to-buy-sell-stock';
import kthSmallestBst from '@/algorithms/intermediate/kth-smallest-bst';
import combinationSum from '@/algorithms/intermediate/combination-sum';
import decodeWays from '@/algorithms/advanced/decode-ways';

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
  climbingStairs,
  majorityElement,
  mergeSortedArrays,
  validAnagram,
  rotateArray,
  minStack,
  middleOfLinkedList,
  jumpGame,
  containerWithMostWater,
  searchRotatedArray,
  validPalindrome,
  bestTimeToBuySellStock,
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
  subsets,
  topKFrequent,
  bipartiteCheck,
  mergeTwoSortedLists,
  lowestCommonAncestor,
  groupAnagrams,
  subarraySumEqualsK,
  threeSum,
  kokoEatingBananas,
  permutations,
  kthSmallestBst,
  combinationSum,
  // Nâng cao
  bfsGrid,
  dijkstra,
  kthLargest,
  topologicalSort,
  nQueens,
  houseRobber,
  coinChange,
  knapsack01,
  kruskalMst,
  mergeIntervals,
  mergeKSortedLists,
  dailyTemperatures,
  countingBits,
  longestCommonSubsequence,
  wordBreak,
  floydWarshall,
  insertInterval,
  courseSchedule,
  rottingOranges,
  meetingRoomsII,
  decodeWays,
  // Siêu cấp
  editDistance,
  trie,
  monotonicStack,
  unionFind,
  bitManipulation,
  kadane,
  slidingWindowMaximum,
  lisPatience,
  kmp,
  segmentTree,
  trappingRainWater,
  medianTwoSortedArrays,
  quickselect,
  fenwickTree,
  bellmanFord,
  rabinKarp,
  minimumWindowSubstring,
  accountsMerge,
  wordLadder,
  partitionEqualSubsetSum,
];

export const byId = new Map(ALGORITHMS.map((m) => [m.meta.id, m]));
export const byLevel = (level: Level) => ALGORITHMS.filter((m) => m.meta.level === level);
export const CATEGORIES = [...new Set(ALGORITHMS.map((m) => m.meta.category))];
