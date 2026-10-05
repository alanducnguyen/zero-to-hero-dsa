import { describe, it, expect } from 'vitest';
import { bubbleSort } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('bubble-sort', () => {
  it('sorts', () => {
    expect(bubbleSort([5, 1, 4, 2, 8])).toEqual([1, 2, 4, 5, 8]);
    expect(bubbleSort([])).toEqual([]);
    expect(bubbleSort([1])).toEqual([1]);
    expect(bubbleSort([3, 3, 1])).toEqual([1, 3, 3]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { array: [] }, { array: [2, 1] }, { array: [1, 2, 3] }]);
  });
});
