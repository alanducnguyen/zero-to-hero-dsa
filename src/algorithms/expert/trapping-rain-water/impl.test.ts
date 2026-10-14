import { describe, it, expect } from 'vitest';
import { trap } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('trapping-rain-water', () => {
  it('computes trapped water', () => {
    expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
    expect(trap([4, 2, 0, 3, 2, 5])).toBe(9);
    expect(trap([1, 2, 3, 4])).toBe(0);
    expect(trap([5, 2])).toBe(0);
    expect(trap([])).toBe(0);
    expect(trap([3, 0, 3])).toBe(3);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { height: [] }, { height: [3] }, { height: [3, 0, 3] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
