import type { CompareProblem } from './types';
import twoSum from './problems/two-sum';

/** Đăng ký bài toán ở đây (thứ tự = thứ tự hiển thị). */import kthLargest from './problems/kth-largest';
import validAnagram from './problems/valid-anagram';
import majorityElement from './problems/majority-element';

export const PROBLEMS: CompareProblem[] = [
  twoSum,
  kthLargest,
  validAnagram,
  majorityElement,
];

export const problemById = new Map(PROBLEMS.map((p) => [p.id, p]));
export const COMPARE_TAGS = [...new Set(PROBLEMS.flatMap((p) => p.tags))].sort();
