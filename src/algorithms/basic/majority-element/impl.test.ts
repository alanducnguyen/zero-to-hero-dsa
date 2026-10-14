import { describe, it, expect } from 'vitest';
import { majorityElement } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('majority-element', () => {
  it('finds the majority', () => {
    expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).toBe(2);
    expect(majorityElement([3, 2, 3])).toBe(3);
    expect(majorityElement([5])).toBe(5);
    expect(majorityElement([1, 2, 1, 3, 1, 4, 1, 1])).toBe(1);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [7, 7] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
