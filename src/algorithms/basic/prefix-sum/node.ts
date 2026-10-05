import { buildPrefix, rangeSum, subarraySumEqualsK } from './impl';
export interface PrefixInput { nums: number[]; l: number; r: number; k: number }
export function run(input: PrefixInput) {
  const nums = input.nums;
  const n = nums.length;
  const l = Math.max(0, Math.min(n - 1, Math.floor(input.l)));
  const r = Math.max(l, Math.min(n - 1, Math.floor(input.r)));
  const prefix = buildPrefix(nums);
  return { prefix, rangeSum: n ? rangeSum(prefix, l, r) : 0, countSubarraysSumK: subarraySumEqualsK(nums, input.k) };
}
