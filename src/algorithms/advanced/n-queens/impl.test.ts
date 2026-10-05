import { describe, it, expect } from 'vitest';
import { solveNQueens } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('n-queens', () => {
  it('counts solutions', () => {
    expect(solveNQueens(1)).toEqual([[0]]);
    expect(solveNQueens(2)).toEqual([]);
    expect(solveNQueens(3)).toEqual([]);
    expect(solveNQueens(4)).toEqual([[1, 3, 0, 2], [2, 0, 3, 1]]);
    expect(solveNQueens(5)).toHaveLength(10);
    expect(solveNQueens(6)).toHaveLength(4);
    expect(solveNQueens(8)).toHaveLength(92);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { n: 1 }, { n: 2 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
