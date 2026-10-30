import { describe, it, expect } from 'vitest';
import { medianSlidingWindow } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

function brute(nums: number[], k: number): number[] {
  const out: number[] = [];
  for (let i = 0; i + k <= nums.length; i++) {
    const w = nums.slice(i, i + k).sort((a, b) => a - b);
    out.push(k % 2 ? w[k >> 1] : (w[k / 2 - 1] + w[k / 2]) / 2);
  }
  return out;
}

describe('sliding-window-median', () => {
  it('leetcode examples', () => {
    expect(medianSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([1, -1, -1, 3, 5, 6]);
    expect(medianSlidingWindow([1, 2, 3, 4, 2, 3, 1, 4, 2], 3)).toEqual([2, 3, 3, 3, 2, 3, 2]);
  });
  it('edge cases', () => {
    expect(medianSlidingWindow([], 1)).toEqual([]);
    expect(medianSlidingWindow([5], 1)).toEqual([5]);
    expect(medianSlidingWindow([1, 2], 3)).toEqual([]);
    expect(medianSlidingWindow([1, 2, 3, 4], 4)).toEqual([2.5]);
    expect(medianSlidingWindow([1, 4, 2, 3], 2)).toEqual([2.5, 3, 2.5]);
    expect(medianSlidingWindow([2, 2, 2, 2], 2)).toEqual([2, 2, 2]);
    expect(medianSlidingWindow([2147483647, 2147483647], 2)).toEqual([2147483647]);
  });
  it('matches brute force on random inputs (nhiều giá trị trùng)', () => {
    let seed = 12345;
    const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31);
    for (let t = 0; t < 3000; t++) {
      const n = 1 + Math.floor(rnd() * 15);
      const range = t % 2 ? 4 : 50;
      const nums = Array.from({ length: n }, () => Math.floor(rnd() * range) - Math.floor(range / 2));
      const k = 1 + Math.floor(rnd() * n);
      expect(medianSlidingWindow(nums, k)).toEqual(brute(nums, k));
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      ...(mod.meta.presets ?? []).map((p) => p.values),
      { nums: [], k: 1 },
      { nums: [3], k: 1 },
      { nums: [1, 2], k: 5 },
      { nums: [4, 4, 1, 4, 1, 1, 4], k: 2 },
      { nums: [5, -2, 7, 0, 0, 3, -2, 9, 1, 0, 2, 2, -5, 6], k: 5 },
    ]);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
