import { mergeSortedArrays } from './impl';

export interface MergeInput { nums1: number[]; nums2: number[] }

/** Chuẩn hoá: sắp xếp hai mảng, đệm 0 vào cuối nums1 cho đủ chỗ như đề LeetCode 88. */
export function prepare(input: MergeInput): { nums1: number[]; m: number; nums2: number[]; n: number } {
  const a = [...input.nums1].sort((x, y) => x - y);
  const b = [...input.nums2].sort((x, y) => x - y);
  return { nums1: [...a, ...new Array<number>(b.length).fill(0)], m: a.length, nums2: b, n: b.length };
}

export const run = (input: MergeInput) => {
  const { nums1, m, nums2, n } = prepare(input);
  return mergeSortedArrays(nums1, m, nums2, n);
};
