import { describe, it, expect } from 'vitest';
import { robCircular } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

function brute(nums: number[]): number {
  const n = nums.length;
  let best = 0;
  for (let mask = 0; mask < 1 << n; mask++) {
    let ok = true;
    let sum = 0;
    for (let i = 0; i < n && ok; i++) {
      if (!(mask & (1 << i))) continue;
      const j = (i + 1) % n;
      if (n > 1 && j !== i && mask & (1 << j)) ok = false;
      sum += nums[i];
    }
    if (ok) best = Math.max(best, sum);
  }
  return best;
}

describe('house-robber-ii', () => {
  it('handles examples and edge cases', () => {
    expect(robCircular([2, 3, 2])).toBe(3);
    expect(robCircular([1, 2, 3, 1])).toBe(4);
    expect(robCircular([1, 2, 3])).toBe(3);
    expect(robCircular([])).toBe(0);
    expect(robCircular([5])).toBe(5);
    expect(robCircular([1, 9])).toBe(9);
    expect(robCircular([2, 7, 9, 3, 1])).toBe(11);
    expect(robCircular([200, 3, 140, 20, 10])).toBe(340);
  });
  it('matches brute force', () => {
    let seed = 11;
    const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
    for (let t = 0; t < 200; t++) {
      const nums = Array.from({ length: Math.floor(rnd() * 10) }, () => Math.floor(rnd() * 20));
      expect(robCircular(nums)).toBe(brute(nums));
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [] }, { nums: [1, 9] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
