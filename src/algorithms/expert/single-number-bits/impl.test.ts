import { describe, it, expect } from 'vitest';
import { countBits, isPowerOfTwo, singleNumber } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('single-number-bits', () => {
  it('xor finds the single', () => {
    expect(singleNumber([4, 1, 2, 1, 2])).toBe(4);
    expect(singleNumber([1])).toBe(1);
    expect(singleNumber([])).toBe(0);
  });
  it('bit tricks', () => {
    expect(countBits(0)).toBe(0);
    expect(countBits(7)).toBe(3);
    expect(countBits(255)).toBe(8);
    expect(isPowerOfTwo(1)).toBe(true);
    expect(isPowerOfTwo(64)).toBe(true);
    expect(isPowerOfTwo(0)).toBe(false);
    expect(isPowerOfTwo(12)).toBe(false);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [] }, { nums: [0] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
