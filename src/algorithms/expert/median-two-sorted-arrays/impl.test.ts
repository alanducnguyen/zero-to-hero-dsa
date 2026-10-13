import { describe, it, expect } from 'vitest';
import { findMedianSortedArrays } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('median-two-sorted-arrays', () => {
  it('finds the median', () => {
    expect(findMedianSortedArrays([1, 3], [2])).toBe(2);
    expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
    expect(findMedianSortedArrays([], [2, 4, 6])).toBe(4);
    expect(findMedianSortedArrays([1, 2, 3], [10, 20, 30, 40])).toBe(10);
    expect(findMedianSortedArrays([1, 3, 8, 9, 15], [7, 11, 18, 19, 21, 25])).toBe(11);
  });
  it('matches brute force', () => {
    for (let t = 0; t < 50; t++) {
      const a = Array.from({ length: t % 5 }, () => Math.floor(Math.random() * 20)).sort((x, y) => x - y);
      const b = Array.from({ length: (t % 7) + 1 }, () => Math.floor(Math.random() * 20)).sort((x, y) => x - y);
      const all = [...a, ...b].sort((x, y) => x - y);
      const mid = all.length >> 1;
      const expected = all.length % 2 ? all[mid] : (all[mid - 1] + all[mid]) / 2;
      expect(findMedianSortedArrays(a, b)).toBe(expected);
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums1: [], nums2: [] }, { nums1: [5], nums2: [] }, { nums1: [3, 1], nums2: [2] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
