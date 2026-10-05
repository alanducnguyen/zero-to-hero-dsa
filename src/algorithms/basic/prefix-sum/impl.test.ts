import { describe, it, expect } from 'vitest';
import { buildPrefix, rangeSum, subarraySumEqualsK } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('prefix-sum', () => {
  it('range sums', () => {
    const p = buildPrefix([3, -1, 4, 1, -5, 9, 2]);
    expect(p).toEqual([0, 3, 2, 6, 7, 2, 11, 13]);
    expect(rangeSum(p, 1, 4)).toBe(-1);
    expect(rangeSum(p, 0, 6)).toBe(13);
    expect(rangeSum(p, 3, 3)).toBe(1);
    expect(buildPrefix([])).toEqual([0]);
  });
  it('counts subarrays with sum k', () => {
    expect(subarraySumEqualsK([1, 1, 1], 2)).toBe(2);
    expect(subarraySumEqualsK([1, 2, 3], 3)).toBe(2);
    expect(subarraySumEqualsK([2, -2, 3, -3, 1], 0)).toBe(3);
    expect(subarraySumEqualsK([], 0)).toBe(0);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [], l: 0, r: 0, k: 0 }, { nums: [5], l: 0, r: 0, k: 5 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
