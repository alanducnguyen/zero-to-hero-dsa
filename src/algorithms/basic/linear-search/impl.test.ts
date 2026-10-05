import { describe, it, expect } from 'vitest';
import { linearSearch } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('linear-search', () => {
  it('finds first index', () => {
    expect(linearSearch([7, 3, 9, 1], 9)).toBe(2);
    expect(linearSearch([3, 4, 4, 1], 4)).toBe(1);
    expect(linearSearch([], 1)).toBe(-1);
    expect(linearSearch([1, 2, 3], 5)).toBe(-1);
    expect(linearSearch([5], 5)).toBe(0);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { array: [], target: 1 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
