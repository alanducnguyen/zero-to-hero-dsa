import { describe, it, expect } from 'vitest';
import { numIslands } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('number-of-islands', () => {
  it('counts islands', () => {
    expect(numIslands([[1, 1, 0, 0, 0], [1, 1, 0, 0, 1], [0, 0, 1, 0, 1], [0, 0, 0, 1, 1]])).toBe(3);
    expect(numIslands([[1, 0, 1], [0, 1, 0], [1, 0, 1]])).toBe(5);
    expect(numIslands([[0, 0], [0, 0]])).toBe(0);
    expect(numIslands([[1]])).toBe(1);
    expect(numIslands([])).toBe(0);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { grid: [[1]] }, { grid: [[0]] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
