import { describe, it, expect } from 'vitest';
import { quickselect } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('quickselect', () => {
  it('finds kth smallest', () => {
    expect(quickselect([7, 2, 9, 4, 1, 8, 5, 3], 4)).toBe(4);
    expect(quickselect([5, 3, 9, 1, 7], 1)).toBe(1);
    expect(quickselect([5, 3, 9, 1, 7], 5)).toBe(9);
    expect(quickselect([1, 2, 3, 4, 5, 6], 2)).toBe(2);
    expect(quickselect([3, 3, 3], 2)).toBe(3);
  });
  it('matches sorting for all k', () => {
    const nums = [12, 3, 5, 7, 4, 19, 26, 3, 8, 1];
    const sorted = [...nums].sort((a, b) => a - b);
    for (let k = 1; k <= nums.length; k++) expect(quickselect(nums, k)).toBe(sorted[k - 1]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [], k: 1 }, { nums: [4], k: 3 }, { nums: [3, 3, 3], k: 2 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
