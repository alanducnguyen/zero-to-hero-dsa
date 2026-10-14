import { describe, it, expect } from 'vitest';
import { topKFrequent } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('top-k-frequent', () => {
  it('returns k most frequent values', () => {
    expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toEqual([1, 2]);
    expect(topKFrequent([1, 1, 1, 2, 2, 3, 4, 4, 4, 4], 2)).toEqual([4, 1]);
    expect(topKFrequent([9], 1)).toEqual([9]);
    expect(topKFrequent([5, 5, 6], 2)).toEqual([5, 6]);
    expect(topKFrequent([3, 1, 2, 3, 1, 2], 2)).toEqual([1, 2]);
    expect(topKFrequent([1, 2], 5)).toEqual([1, 2]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [1, 2], k: 5 }, { nums: [2, 2, 2, 1, 1, 0], k: 3 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
