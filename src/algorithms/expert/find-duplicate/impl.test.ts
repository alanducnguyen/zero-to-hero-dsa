import { describe, it, expect } from 'vitest';
import { findDuplicate } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('find-duplicate', () => {
  it('finds the duplicate', () => {
    expect(findDuplicate([1, 3, 4, 2, 2])).toBe(2);
    expect(findDuplicate([3, 1, 3, 4, 2])).toBe(3);
    expect(findDuplicate([1, 1])).toBe(1);
    expect(findDuplicate([1, 1, 2])).toBe(1);
    expect(findDuplicate([2, 2, 2, 2, 2])).toBe(2);
    expect(findDuplicate([2, 5, 9, 6, 9, 3, 8, 9, 7, 1])).toBe(9);
  });
  it('does not mutate input', () => {
    const a = [3, 1, 3, 4, 2];
    findDuplicate(a);
    expect(a).toEqual([3, 1, 3, 4, 2]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), ...(mod.meta.presets ?? []).map((p) => p.values), { nums: [1, 1] }, { nums: [1, 1, 2] }]);
  });
});
