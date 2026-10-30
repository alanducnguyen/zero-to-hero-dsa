import { describe, it, expect } from 'vitest';
import { minEatingSpeed } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('koko-eating-bananas', () => {
  it('finds the minimum speed', () => {
    expect(minEatingSpeed([3, 6, 7, 11], 8)).toBe(4);
    expect(minEatingSpeed([30, 11, 23, 4, 20], 5)).toBe(30);
    expect(minEatingSpeed([30, 11, 23, 4, 20], 6)).toBe(23);
    expect(minEatingSpeed([1], 1)).toBe(1);
    expect(minEatingSpeed([5, 9, 2], 100)).toBe(1);
    expect(minEatingSpeed([1000000000], 2)).toBe(500000000);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { piles: [1], h: 1 }, { piles: [7, 7], h: 3 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
