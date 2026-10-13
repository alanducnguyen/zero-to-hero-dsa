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
];

export const problemById = new Map(PROBLEMS.map((p) => [p.id, p]));
export const COMPARE_TAGS = [...new Set(PROBLEMS.flatMap((p) => p.tags))].sort();
