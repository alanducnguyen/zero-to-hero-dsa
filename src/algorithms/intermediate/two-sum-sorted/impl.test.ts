import { describe, it, expect } from 'vitest';
import { twoSumSorted } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('two-sum-sorted', () => {
  it('finds pair', () => {
    expect(twoSumSorted([1, 3, 4, 6, 8, 11, 15], 14)).toEqual([1, 5]);
    expect(twoSumSorted([2, 5, 7, 9], 11)).toEqual([0, 3]);
    expect(twoSumSorted([1, 2, 3], 100)).toBeNull();
    expect(twoSumSorted([], 1)).toBeNull();
    expect(twoSumSorted([5], 10)).toBeNull();
    expect(twoSumSorted([-5, -2, 0, 3, 6], 1)).toEqual([0, 4]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { array: [], target: 1 }, { array: [5], target: 10 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
