import { describe, it, expect } from 'vitest';
import { bellmanFord } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('bellman-ford', () => {
  it('handles negative edges without negative cycles', () => {
    const r = bellmanFord(
      ['S', 'A', 'B', 'C', 'D'],
      [
        { from: 'S', to: 'A', weight: 4 }, { from: 'S', to: 'B', weight: 5 }, { from: 'A', to: 'C', weight: 3 },
        { from: 'B', to: 'A', weight: -3 }, { from: 'B', to: 'D', weight: 2 }, { from: 'C', to: 'D', weight: -4 }, { from: 'D', to: 'C', weight: 6 },
      ],
      'S',
    );
    expect(r.negativeCycle).toBe(false);
    expect(r.dist).toEqual({ S: 0, A: 2, B: 5, C: 5, D: 1 });
  });
  it('detects a negative cycle and unreachable nodes', () => {
    const r = bellmanFord(['S', 'X', 'Y', 'Z'], [{ from: 'S', to: 'X', weight: 1 }, { from: 'X', to: 'Y', weight: 2 }, { from: 'Y', to: 'Z', weight: -5 }, { from: 'Z', to: 'X', weight: 1 }], 'S');
    expect(r.negativeCycle).toBe(true);
    const u = bellmanFord(['S', 'T'], [], 'S');
    expect(u.dist.T).toBe(Infinity);
    expect(u.negativeCycle).toBe(false);
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      { graph: { nodes: [{ id: 'A', x: 0, y: 0 }], edges: [] }, source: 'A' },
      { graph: { nodes: [{ id: 'A', x: 0, y: 0 }, { id: 'B', x: 1, y: 1 }], edges: [{ from: 'A', to: 'B', weight: 2 }] }, source: 'Z' },
      ...(mod.meta.presets ?? []).map((p) => p.values),
    ]);
  });
});
