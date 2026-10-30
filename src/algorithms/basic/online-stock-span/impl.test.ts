import { describe, it, expect } from 'vitest';
import { stockSpans } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('online-stock-span', () => {
  it('computes spans', () => {
    expect(stockSpans([100, 80, 60, 70, 60, 75, 85])).toEqual([1, 1, 1, 2, 1, 4, 6]);
    expect(stockSpans([10, 20, 30, 40, 50])).toEqual([1, 2, 3, 4, 5]);
    expect(stockSpans([50, 40, 30, 20])).toEqual([1, 1, 1, 1]);
    expect(stockSpans([30, 30, 20, 30, 30])).toEqual([1, 2, 1, 4, 5]);
    expect(stockSpans([7])).toEqual([1]);
    expect(stockSpans([])).toEqual([]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { prices: [] }, { prices: [7] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
