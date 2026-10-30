import { describe, it, expect } from 'vitest';
import { combinationSum } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('combination-sum', () => {
  it('finds all combinations in DFS order', () => {
    expect(combinationSum([2, 3, 6, 7], 7)).toEqual([[2, 2, 3], [7]]);
    expect(combinationSum([2, 3, 5], 8)).toEqual([[2, 2, 2, 2], [2, 3, 3], [3, 5]]);
    expect(combinationSum([7, 3, 2], 9)).toEqual([[2, 2, 2, 3], [2, 7], [3, 3, 3]]);
  });
  it('edge cases', () => {
    expect(combinationSum([2], 1)).toEqual([]);
    expect(combinationSum([2], 3)).toEqual([]);
    expect(combinationSum([1], 2)).toEqual([[1, 1]]);
    expect(combinationSum([], 5)).toEqual([]);
    expect(combinationSum([5, 10], 5)).toEqual([[5]]);
  });
  it('trace matches impl and stays bounded', () => {
    const inputs = [defaultInput(mod), ...(mod.meta.presets ?? []).map((p) => p.values), { candidates: [], target: 3 }, { candidates: [1], target: 3 }];
    checkModule(mod, inputs);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
    expect(runTrace(mod, { candidates: [1, 2, 3, 4, 5, 6], target: 12 }).truncated).toBe(false);
  });
});
