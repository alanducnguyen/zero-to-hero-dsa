import { describe, it, expect } from 'vitest';
import { searchRotated } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('search-rotated-array', () => {
  it('finds index or -1', () => {
    expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
    expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
    expect(searchRotated([1], 0)).toBe(-1);
    expect(searchRotated([1], 1)).toBe(0);
    expect(searchRotated([], 5)).toBe(-1);
    expect(searchRotated([3, 1], 1)).toBe(1);
    expect(searchRotated([1, 3], 3)).toBe(1);
    expect(searchRotated([5, 1, 3], 5)).toBe(0);
  });
  it('works for every rotation and target', () => {
    const base = [-7, -3, 0, 2, 5, 8, 13, 21];
    for (let r = 0; r < base.length; r++) {
      const nums = [...base.slice(r), ...base.slice(0, r)];
      for (const x of base) expect(searchRotated(nums, x)).toBe(nums.indexOf(x));
      for (const x of [-10, 1, 4, 30]) expect(searchRotated(nums, x)).toBe(-1);
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      { nums: [], target: 1 },
      { nums: [1], target: 1 },
      { nums: [3, 1], target: 1 },
      { nums: [5, 1, 3], target: 5 },
      ...(mod.meta.presets ?? []).map((p) => p.values),
    ]);
  });
});
