import { describe, it, expect } from 'vitest';
import { twoSum } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('two-sum-hashmap', () => {
  it('finds pair', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    expect(twoSum([1, 2, 3], 100)).toBeNull();
    expect(twoSum([], 1)).toBeNull();
    expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [], target: 1 }, { nums: [3, 3], target: 6 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
