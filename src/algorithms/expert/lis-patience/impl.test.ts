import { describe, it, expect } from 'vitest';
import { lengthOfLIS } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('lis-patience', () => {
  it('lis length', () => {
    expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
    expect(lengthOfLIS([5, 4, 3, 2, 1])).toBe(1);
    expect(lengthOfLIS([3, 4, 5, 1, 2])).toBe(3);
    expect(lengthOfLIS([2, 2, 2, 3, 3])).toBe(2);
    expect(lengthOfLIS([])).toBe(0);
    expect(lengthOfLIS([7])).toBe(1);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [] }, { nums: [7] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
