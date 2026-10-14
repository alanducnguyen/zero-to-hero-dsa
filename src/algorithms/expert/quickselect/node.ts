import { quickselect } from './impl';

export interface QSInput { nums: number[]; k: number }

export const run = (input: QSInput) => {
  const n = input.nums.length;
  if (n === 0) return null;
  return quickselect(input.nums, Math.max(1, Math.min(Math.floor(input.k), n)));
};
