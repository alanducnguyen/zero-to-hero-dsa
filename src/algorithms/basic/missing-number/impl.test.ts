import { describe, it, expect } from 'vitest';
import { missingNumber } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('missing-number', () => {
  it('handles examples and edge cases', () => {
    expect(missingNumber([3, 0, 1])).toBe(2);
    expect(missingNumber([0, 1])).toBe(2);
    expect(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])).toBe(8);
    expect(missingNumber([3, 0, 1, 5, 2])).toBe(4);
    expect(missingNumber([0])).toBe(1);
    expect(missingNumber([1])).toBe(0);
    expect(missingNumber([])).toBe(0);
  });
  it('matches Gauss sum on random permutations', () => {
    for (let t = 0; t < 200; t++) {
      const n = Math.floor(Math.random() * 30);
      const all = Array.from({ length: n + 1 }, (_, i) => i).sort(() => Math.random() - 0.5);
      const missing = all.pop()!;
      expect(missingNumber(all)).toBe(missing);
      expect((n * (n + 1)) / 2 - all.reduce((a, b) => a + b, 0)).toBe(missing);
    }
  });
  it('trace matches impl', () => {
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
    checkModule(mod, [defaultInput(mod), ...(mod.meta.presets ?? []).map((p) => p.values), { nums: [] }, { nums: [0] }, { nums: [1] }]);
  });
});
