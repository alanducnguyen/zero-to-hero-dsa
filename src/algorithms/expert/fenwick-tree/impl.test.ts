import { describe, it, expect } from 'vitest';
import { FenwickTree } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('fenwick-tree', () => {
  it('prefix and range sums with point updates', () => {
    const bit = new FenwickTree([3, 2, -1, 6, 5, 4, -3, 3]);
    expect(bit.prefixSum(0)).toBe(3);
    expect(bit.prefixSum(7)).toBe(19);
    expect(bit.rangeSum(2, 4)).toBe(10);
    bit.add(2, 4);
    expect(bit.rangeSum(2, 4)).toBe(14);
    expect(bit.rangeSum(0, 0)).toBe(3);
  });
  it('matches brute force on random data', () => {
    const nums = Array.from({ length: 16 }, (_, i) => ((i * 7) % 11) - 5);
    const bit = new FenwickTree(nums);
    for (let l = 0; l < nums.length; l++) {
      for (let r = l; r < nums.length; r++) {
        expect(bit.rangeSum(l, r)).toBe(nums.slice(l, r + 1).reduce((a, b) => a + b, 0));
      }
    }
    expect(new FenwickTree([]).n).toBe(0);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [1, 2], ops: ['bogus', 'sum 0 9', 'sum 1 0'] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
