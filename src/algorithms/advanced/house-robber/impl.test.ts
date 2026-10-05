import { describe, it, expect } from 'vitest';
import { rob } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('house-robber', () => {
  it('maximizes', () => {
    expect(rob([2, 7, 9, 3, 1])).toBe(12);
    expect(rob([1, 2, 3, 1])).toBe(4);
    expect(rob([])).toBe(0);
    expect(rob([5])).toBe(5);
    expect(rob([2, 1])).toBe(2);
    expect(rob([2, 1, 1, 9, 1, 1, 2])).toBe(13);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [] }, { nums: [2, 1] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
