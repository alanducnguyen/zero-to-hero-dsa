import { findMedianSortedArrays } from './impl';

export interface MedianInput { nums1: number[]; nums2: number[] }

export const sortedPair = (input: MedianInput): [number[], number[]] => [
  [...input.nums1].sort((a, b) => a - b),
  [...input.nums2].sort((a, b) => a - b),
];

export const run = (input: MedianInput) => {
  const [a, b] = sortedPair(input);
  if (a.length + b.length === 0) return null;
  return findMedianSortedArrays(a, b);
};
