import { describe, it, expect } from 'vitest';
import { insertionSort } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('insertion-sort', () => {
  it('sorts', () => {
    expect(insertionSort([12, 11, 13, 5, 6, 7])).toEqual([5, 6, 7, 11, 12, 13]);
    expect(insertionSort([])).toEqual([]);
    expect(insertionSort([1])).toEqual([1]);
    expect(insertionSort([3, 1, 3, 2, 1])).toEqual([1, 1, 2, 3, 3]);
    expect(insertionSort([6, 5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { array: [] }, { array: [1] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
