import { describe, it, expect } from 'vitest';
import { selectionSort } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('selection-sort', () => {
  it('sorts', () => {
    expect(selectionSort([29, 10, 14, 37, 13, 5])).toEqual([5, 10, 13, 14, 29, 37]);
    expect(selectionSort([])).toEqual([]);
    expect(selectionSort([1])).toEqual([1]);
    expect(selectionSort([4, 2, 4, 1])).toEqual([1, 2, 4, 4]);
    expect(selectionSort([1, 2, 3])).toEqual([1, 2, 3]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { array: [] }, { array: [1] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
