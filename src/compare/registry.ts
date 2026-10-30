import type { CompareProblem } from './types';
import twoSum from './problems/two-sum';

/** Đăng ký bài toán ở đây (thứ tự = thứ tự hiển thị). */import kthLargest from './problems/kth-largest';
import validAnagram from './problems/valid-anagram';
import majorityElement from './problems/majority-element';
import maxSubarray from './problems/max-subarray';
import fibonacci from './problems/fibonacci';
import trappingRainWater from './problems/trapping-rain-water';
import findDuplicate from './problems/find-duplicate';
import longestPalindromicSubstring from './problems/longest-palindromic-substring';
import mergeKSorted from './problems/merge-k-sorted';
import threeSum from './problems/three-sum';
import searchRotatedArray from './problems/search-rotated-array';
import coinChange from './problems/coin-change';
import longestIncreasingSubsequence from './problems/longest-increasing-subsequence';
import courseSchedule from './problems/course-schedule';
import wordLadder from './problems/word-ladder';
import numberOfIslands from './problems/number-of-islands';
import productExceptSelf from './problems/product-except-self';
import houseRobber from './problems/house-robber';
import climbingStairs from './problems/climbing-stairs';
import mergeIntervals from './problems/merge-intervals';
import topKFrequent from './problems/top-k-frequent';
import lruCache from './problems/lru-cache';
import minStack from './problems/min-stack';
import kthSmallestBst from './problems/kth-smallest-bst';
import validParentheses from './problems/valid-parentheses';
import jumpGame from './problems/jump-game';

export const PROBLEMS: CompareProblem[] = [
  twoSum,
  kthLargest,
  validAnagram,
  majorityElement,
  maxSubarray,
  fibonacci,
  trappingRainWater,
  findDuplicate,
  longestPalindromicSubstring,
  mergeKSorted,
  threeSum,
  searchRotatedArray,
  coinChange,
  longestIncreasingSubsequence,
  courseSchedule,
  wordLadder,
  numberOfIslands,
  productExceptSelf,
  houseRobber,
  climbingStairs,
  mergeIntervals,
  topKFrequent,
  lruCache,
  minStack,
  kthSmallestBst,
  validParentheses,
  jumpGame,
];

export const problemById = new Map(PROBLEMS.map((p) => [p.id, p]));
export const COMPARE_TAGS = [...new Set(PROBLEMS.flatMap((p) => p.tags))].sort();
