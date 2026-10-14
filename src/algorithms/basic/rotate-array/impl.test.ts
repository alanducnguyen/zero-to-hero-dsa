import { describe, it, expect } from 'vitest';
import { rotate } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
describe('rotate-array', () => {
  it('rotates', () => {
    expect(rotate([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([5, 6, 7, 1, 2, 3, 4]);
    expect(rotate([1, 2, 3, 4], 6)).toEqual([3, 4, 1, 2]);
    expect(rotate([1, 2, 3], 0)).toEqual([1, 2, 3]);
    expect(rotate([], 2)).toEqual([]);
    expect(rotate([1], 5)).toEqual([1]);
  });
  it('trace matches impl', () => { checkModule(mod, [defaultInput(mod), { nums: [], k: 2 }, { nums: [1], k: 5 }, ...(mod.meta.presets ?? []).map((p) => p.values)]); });
});
