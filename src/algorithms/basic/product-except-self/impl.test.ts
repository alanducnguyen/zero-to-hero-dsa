import { describe, it, expect } from 'vitest';
import { productExceptSelf } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('product-except-self', () => {
  it('computes product of all other elements', () => {
    expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
    expect(productExceptSelf([-1, 1, 0, -3, 3])).toEqual([0, 0, 9, 0, 0]);
    expect(productExceptSelf([0, 4, 0, 2])).toEqual([0, 0, 0, 0]);
    expect(productExceptSelf([2, -3, 4, -1])).toEqual([12, -8, 6, -24]);
    expect(productExceptSelf([5, 7])).toEqual([7, 5]);
    expect(productExceptSelf([3])).toEqual([1]);
    expect(productExceptSelf([])).toEqual([]);
  });
  it('never returns -0', () => {
    for (const x of productExceptSelf([-2, 0, 3])) expect(Object.is(x, -0)).toBe(false);
    for (const x of productExceptSelf([0, -1])) expect(Object.is(x, -0)).toBe(false);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [] }, { nums: [7] }, { nums: [-2, 0, 3] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
