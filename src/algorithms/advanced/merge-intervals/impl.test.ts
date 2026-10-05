import { describe, it, expect } from 'vitest';
import { mergeIntervals } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('merge-intervals', () => {
  it('merges', () => {
    expect(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]])).toEqual([[1, 6], [8, 10], [15, 18]]);
    expect(mergeIntervals([[1, 4], [4, 5]])).toEqual([[1, 5]]);
    expect(mergeIntervals([[1, 10], [2, 3], [4, 5], [11, 12]])).toEqual([[1, 10], [11, 12]]);
    expect(mergeIntervals([])).toEqual([]);
    expect(mergeIntervals([[5, 6], [1, 2]])).toEqual([[1, 2], [5, 6]]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { intervals: [] }, { intervals: ['3-1', 'x', '2-2'] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
