import { describe, it, expect } from 'vitest';
import { shortestPathGrid } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('bfs-grid-shortest-path', () => {
  it('finds shortest path', () => {
    expect(shortestPathGrid([[0, 0], [0, 0]])).toBe(2);
    expect(shortestPathGrid([[0]])).toBe(0);
    expect(shortestPathGrid([[0, 1], [1, 0]])).toBe(-1);
    expect(shortestPathGrid([[1, 0], [0, 0]])).toBe(-1);
    expect(shortestPathGrid([[0, 0, 0], [1, 1, 0], [0, 0, 0]])).toBe(4);
    expect(shortestPathGrid([])).toBe(-1);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { grid: [[0]] }, { grid: [[0, 1, 0], [1, 1, 0], [0, 0, 0]] }, { grid: [[1]] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
