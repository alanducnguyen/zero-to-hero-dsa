import { describe, it, expect } from 'vitest';
import { countingSort } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('counting-sort', () => {
  it('sorts', () => {
    expect(countingSort([4, 2, 2, 8, 3, 3, 1])).toEqual([1, 2, 2, 3, 3, 4, 8]);
    expect(countingSort([])).toEqual([]);
    expect(countingSort([0])).toEqual([0]);
    expect(countingSort([5, 5, 5])).toEqual([5, 5, 5]);
    expect(countingSort([3, 1, 3, 2, 1, 3, 2])).toEqual([1, 1, 2, 2, 3, 3, 3]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { array: [] }, { array: [0] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
