import { describe, it, expect } from 'vitest';
import { mergeSortedArrays } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('merge-sorted-arrays', () => {
  it('merges in place', () => {
    expect(mergeSortedArrays([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)).toEqual([1, 2, 2, 3, 5, 6]);
    expect(mergeSortedArrays([0], 0, [1], 1)).toEqual([1]);
    expect(mergeSortedArrays([1], 1, [], 0)).toEqual([1]);
    expect(mergeSortedArrays([4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums1: [], nums2: [] }, { nums1: [3, 1], nums2: [2] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
