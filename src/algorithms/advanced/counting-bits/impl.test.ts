import { describe, it, expect } from 'vitest';
import { countingBits } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('counting-bits', () => {
  it('counts set bits for 0..n', () => {
    expect(countingBits(0)).toEqual([0]);
    expect(countingBits(2)).toEqual([0, 1, 1]);
    expect(countingBits(5)).toEqual([0, 1, 1, 2, 1, 2]);
    expect(countingBits(15)[15]).toBe(4);
    const brute = (x: number) => x.toString(2).split('1').length - 1;
    expect(countingBits(64)).toEqual(Array.from({ length: 65 }, (_, i) => brute(i)));
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { n: 1 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
