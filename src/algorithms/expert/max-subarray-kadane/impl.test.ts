import { describe, it, expect } from 'vitest';
import { maxSubArray } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('max-subarray-kadane', () => {
  it('finds max sum', () => {
    expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    expect(maxSubArray([-3, -1, -4, -2])).toBe(-1);
    expect(maxSubArray([2, 3, 1, 5])).toBe(11);
    expect(maxSubArray([-7])).toBe(-7);
    expect(maxSubArray([5, -9, 6])).toBe(6);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [] }, { nums: [5, -9, 6] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
