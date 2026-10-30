import { describe, it, expect } from 'vitest';
import { permute } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('permutations', () => {
  it('generates all permutations in DFS order', () => {
    expect(permute([1, 2, 3])).toEqual([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]);
    expect(permute([0, 1])).toEqual([[0, 1], [1, 0]]);
    expect(permute([5])).toEqual([[5]]);
    expect(permute([])).toEqual([[]]);
    const four = permute([1, 2, 3, 4]);
    expect(four).toHaveLength(24);
    expect(new Set(four.map((p) => p.join(','))).size).toBe(24);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
  it('keeps default input small', () => {
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
