import { describe, it, expect } from 'vitest';
import { subarraySum } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

function brute(nums: number[], k: number): number {
  let c = 0;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let j = i; j < nums.length; j++) {
      s += nums[j];
      if (s === k) c++;
    }
  }
  return c;
}

describe('subarray-sum-equals-k', () => {
  it('counts subarrays', () => {
    expect(subarraySum([1, 1, 1], 2)).toBe(2);
    expect(subarraySum([1, 2, 3], 3)).toBe(2);
    expect(subarraySum([], 0)).toBe(0);
    expect(subarraySum([5], 5)).toBe(1);
    expect(subarraySum([5], 4)).toBe(0);
    expect(subarraySum([0, 0, 0], 0)).toBe(6);
    expect(subarraySum([1, -1, 0], 0)).toBe(3);
    expect(subarraySum([-1, -1, 1], 0)).toBe(1);
    expect(subarraySum([3, 4, -7, 1, 3, 3, 1, -4], 7)).toBe(4);
  });
  it('matches brute force on random input', () => {
    for (let t = 0; t < 200; t++) {
      const nums = Array.from({ length: Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 7) - 3);
      const k = Math.floor(Math.random() * 7) - 3;
      expect(subarraySum(nums, k)).toBe(brute(nums, k));
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [], k: 0 }, { nums: [5], k: 5 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
