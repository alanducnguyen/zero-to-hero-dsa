import { describe, it, expect } from 'vitest';
import { largestRectangleArea } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('largest-rectangle-histogram', () => {
  it('computes max area', () => {
    expect(largestRectangleArea([2, 1, 5, 6, 2, 3])).toBe(10);
    expect(largestRectangleArea([2, 4])).toBe(4);
    expect(largestRectangleArea([])).toBe(0);
    expect(largestRectangleArea([3, 3, 3, 3])).toBe(12);
    expect(largestRectangleArea([1, 2, 3, 4, 5])).toBe(9);
    expect(largestRectangleArea([5, 4, 3, 2, 1])).toBe(9);
    expect(largestRectangleArea([0])).toBe(0);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { heights: [] }, { heights: [0] }, { heights: [2, 4] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
