import { describe, it, expect } from 'vitest';
import { orangesRotting } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('rotting-oranges', () => {
  it('computes minutes', () => {
    expect(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])).toBe(4);
    expect(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])).toBe(-1);
    expect(orangesRotting([[2, 1, 1, 0], [1, 1, 0, 1], [0, 1, 1, 1], [2, 1, 1, 1]])).toBe(5);
    expect(orangesRotting([[2, 1, 1, 1, 2]])).toBe(2); // hai nguồn lan song song
    expect(orangesRotting([[2, 1, 1, 0], [1, 1, 0, 1], [0, 1, 1, 1], [2, 0, 1, 1]])).toBe(6); // nguồn (3,0) bị cô lập
  });
  it('handles edge cases', () => {
    expect(orangesRotting([[0, 2]])).toBe(0);
    expect(orangesRotting([[0]])).toBe(0);
    expect(orangesRotting([[1]])).toBe(-1);
    expect(orangesRotting([])).toBe(0);
    expect(orangesRotting([[2, 0, 1]])).toBe(-1);
  });
  it('does not mutate input', () => {
    const g = [[2, 1], [1, 1]];
    orangesRotting(g);
    expect(g).toEqual([[2, 1], [1, 1]]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { grid: [[1]] }, { grid: [[0]] }, { grid: [[2, 1, 1, 1, 2]] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
