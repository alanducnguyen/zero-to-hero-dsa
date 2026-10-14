import { describe, it, expect } from 'vitest';
import { subsets } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('subsets', () => {
  it('generates the power set in DFS order', () => {
    expect(subsets([1, 2, 3])).toEqual([[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]);
    expect(subsets([])).toEqual([[]]);
    expect(subsets([7])).toEqual([[], [7]]);
    expect(subsets([1, 2, 3, 4])).toHaveLength(16);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [5, 6] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
