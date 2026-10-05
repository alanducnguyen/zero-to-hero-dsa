import { describe, it, expect } from 'vitest';
import { quickSort } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('quick-sort', () => {
  it('sorts', () => {
    expect(quickSort([7, 2, 9, 4, 3, 8, 1])).toEqual([1, 2, 3, 4, 7, 8, 9]);
    expect(quickSort([])).toEqual([]);
    expect(quickSort([1])).toEqual([1]);
    expect(quickSort([5, 5, 2, 5, 1, 5])).toEqual([1, 2, 5, 5, 5, 5]);
    expect(quickSort([3, 2, 1])).toEqual([1, 2, 3]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { array: [] }, { array: [1] }, { array: [1, 2, 3, 4, 5, 6] }, { array: [5, 5, 2, 5, 1, 5] }]);
  });
});
