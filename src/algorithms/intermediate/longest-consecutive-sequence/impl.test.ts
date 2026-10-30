import { describe, it, expect } from 'vitest';
import { longestConsecutive } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

function brute(nums: number[]): number {
  const s = [...new Set(nums)].sort((a, b) => a - b);
  let best = 0;
  let cur = 0;
  for (let i = 0; i < s.length; i++) {
    cur = i > 0 && s[i] === s[i - 1] + 1 ? cur + 1 : 1;
    best = Math.max(best, cur);
  }
  return best;
}

describe('longest-consecutive-sequence', () => {
  it('handles examples and edge cases', () => {
    expect(longestConsecutive([100, 4, 200, 1, 3, 2])).toBe(4);
    expect(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toBe(9);
    expect(longestConsecutive([])).toBe(0);
    expect(longestConsecutive([7])).toBe(1);
    expect(longestConsecutive([1, 1, 1])).toBe(1);
    expect(longestConsecutive([1, 2, 0, 1])).toBe(3);
    expect(longestConsecutive([-2, -1, 0, 1])).toBe(4);
    expect(longestConsecutive([10, 30, 20])).toBe(1);
  });
  it('matches sort-based brute force on random input', () => {
    for (let t = 0; t < 200; t++) {
      const nums = Array.from({ length: Math.floor(Math.random() * 15) }, () => Math.floor(Math.random() * 21) - 10);
      expect(longestConsecutive(nums)).toBe(brute(nums));
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [] }, { nums: [5] }, { nums: [3, 3, 3] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
