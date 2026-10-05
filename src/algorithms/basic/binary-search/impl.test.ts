import { describe, it, expect } from 'vitest';
import { binarySearch } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('binary-search', () => {
  it('finds elements', () => {
    const a = [1, 3, 5, 7, 9];
    expect(binarySearch(a, 1)).toBe(0);
    expect(binarySearch(a, 9)).toBe(4);
    expect(binarySearch(a, 5)).toBe(2);
    expect(binarySearch(a, 4)).toBe(-1);
    expect(binarySearch([], 1)).toBe(-1);
    expect(binarySearch([2], 2)).toBe(0);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { array: [], target: 1 }, { array: [2, 4, 6], target: 7 }, { array: [5], target: 5 }]);
  });
});
