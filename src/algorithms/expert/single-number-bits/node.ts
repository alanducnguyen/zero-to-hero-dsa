import { countBits, isPowerOfTwo, singleNumber } from './impl';
export const run = (input: { nums: number[] }) => {
  const nums = (input.nums as number[]).map((x) => Math.max(0, Math.min(255, Math.floor(x))));
  const result = singleNumber(nums);
  return { singleNumber: result, bitCount: countBits(result), isPowerOfTwo: isPowerOfTwo(result) };
};
