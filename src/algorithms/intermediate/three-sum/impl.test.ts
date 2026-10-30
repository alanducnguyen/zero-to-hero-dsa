import { describe, it, expect } from 'vitest';
import { threeSum } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

function brute(nums: number[]): string[] {
  const set = new Set<string>();
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++)
      for (let k = j + 1; k < nums.length; k++)
        if (nums[i] + nums[j] + nums[k] === 0) set.add(JSON.stringify([nums[i], nums[j], nums[k]].sort((x, y) => x - y)));
  return [...set].sort();
}

describe('three-sum', () => {
  it('finds unique triplets in scan order', () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([[-1, -1, 2], [-1, 0, 1]]);
    expect(threeSum([0, 0, 0, 0])).toEqual([[0, 0, 0]]);
    expect(threeSum([0, 1, 1])).toEqual([]);
    expect(threeSum([])).toEqual([]);
    expect(threeSum([1, 2])).toEqual([]);
    expect(threeSum([-2, 0, 0, 2, 2, -2, 0])).toEqual([[-2, 0, 2], [0, 0, 0]]);
  });
  it('matches brute force on random input', () => {
    for (let t = 0; t < 200; t++) {
      const nums = Array.from({ length: Math.floor(Math.random() * 9) }, () => Math.floor(Math.random() * 9) - 4);
      expect(threeSum(nums).map((x) => JSON.stringify(x)).sort()).toEqual(brute(nums));
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [] }, { nums: [1, 2] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
