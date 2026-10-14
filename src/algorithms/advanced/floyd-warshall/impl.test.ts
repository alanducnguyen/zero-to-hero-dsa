import { describe, it, expect } from 'vitest';
import { floydWarshall } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('floyd-warshall', () => {
  it('computes all-pairs shortest paths', () => {
    const d = floydWarshall(4, [[0, 1, 3], [0, 3, 7], [1, 0, 8], [1, 2, 2], [2, 0, 5], [2, 3, 1], [3, 0, 2]]);
    expect(d).toEqual([
      [0, 3, 5, 6],
      [5, 0, 2, 3],
      [3, 6, 0, 1],
      [2, 5, 7, 0],
    ]);
  });
  it('handles negative edges and unreachable pairs', () => {
    const d = floydWarshall(3, [[0, 1, 4], [1, 2, -3]]);
    expect(d[0][2]).toBe(1);
    expect(d[2][0]).toBe(Infinity);
    expect(floydWarshall(0, [])).toEqual([]);
    expect(floydWarshall(1, [])).toEqual([[0]]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      { graph: { nodes: [{ id: 'A', x: 0, y: 0 }], edges: [] } },
      { graph: { nodes: [], edges: [] } },
      ...(mod.meta.presets ?? []).map((p) => p.values),
    ]);
  });
});
