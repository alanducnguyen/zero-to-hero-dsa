import { describe, it, expect } from 'vitest';
import { coinChange } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('coin-change', () => {
  it('min coins', () => {
    expect(coinChange([1, 2, 5], 11)).toBe(3);
    expect(coinChange([1, 3, 4], 6)).toBe(2);
    expect(coinChange([2], 3)).toBe(-1);
    expect(coinChange([1], 0)).toBe(0);
    expect(coinChange([5], 5)).toBe(1);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { coins: [1], amount: 0 }, { coins: [0, 2, 2], amount: 3 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
