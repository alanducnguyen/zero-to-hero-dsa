import { describe, it, expect } from 'vitest';
import { knapsack } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('knapsack-01', () => {
  it('max value', () => {
    expect(knapsack([{ weight: 1, value: 1 }, { weight: 3, value: 4 }, { weight: 4, value: 5 }, { weight: 5, value: 7 }], 7)).toBe(9);
    expect(knapsack([{ weight: 1, value: 6 }, { weight: 2, value: 10 }, { weight: 3, value: 12 }], 5)).toBe(22);
    expect(knapsack([], 10)).toBe(0);
    expect(knapsack([{ weight: 5, value: 10 }], 4)).toBe(0);
    expect(knapsack([{ weight: 2, value: 3 }], 0)).toBe(0);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { weights: [], values: [], capacity: 5 }, { weights: [2], values: [3], capacity: 0 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
