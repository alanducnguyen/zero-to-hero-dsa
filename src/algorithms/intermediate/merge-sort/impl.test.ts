import { describe, it, expect } from 'vitest';
import { mergeSort } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('merge-sort', () => {
  it('sorts', () => {
    expect(mergeSort([38, 27, 43, 3, 9, 82, 10])).toEqual([3, 9, 10, 27, 38, 43, 82]);
    expect(mergeSort([])).toEqual([]);
    expect(mergeSort([1])).toEqual([1]);
    expect(mergeSort([2, 1])).toEqual([1, 2]);
    expect(mergeSort([5, 3, 5, 1, 3])).toEqual([1, 3, 3, 5, 5]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { array: [] }, { array: [1] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
