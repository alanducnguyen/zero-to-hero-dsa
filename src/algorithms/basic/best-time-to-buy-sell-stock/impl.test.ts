import { describe, it, expect } from 'vitest';
import { maxProfit } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

function brute(p: number[]): number {
  let best = 0;
  for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) best = Math.max(best, p[j] - p[i]);
  return best;
}

describe('best-time-to-buy-sell-stock', () => {
  it('computes max profit', () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
    expect(maxProfit([])).toBe(0);
    expect(maxProfit([5])).toBe(0);
    expect(maxProfit([2, 2, 2])).toBe(0);
    expect(maxProfit([3, 8, 2, 5, 1, 4, 9])).toBe(8);
  });
  it('matches brute force on random input', () => {
    for (let t = 0; t < 200; t++) {
      const p = Array.from({ length: Math.floor(Math.random() * 12) }, () => Math.floor(Math.random() * 20));
      expect(maxProfit(p)).toBe(brute(p));
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { prices: [] }, { prices: [4] }, { prices: [2, 2] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
