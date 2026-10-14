import { describe, it, expect } from 'vitest';
import { isBipartite } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('bipartite-check', () => {
  it('detects bipartite graphs and odd cycles', () => {
    expect(isBipartite({ A: ['B'], B: ['A', 'C'], C: ['B'] }).bipartite).toBe(true);
    expect(isBipartite({ A: ['B', 'C'], B: ['A', 'C'], C: ['A', 'B'] }).bipartite).toBe(false);
    expect(isBipartite({ A: ['B'], B: ['A', 'C'], C: ['B', 'D'], D: ['C', 'A'] }).bipartite).toBe(true);
    expect(isBipartite({}).bipartite).toBe(true);
    expect(isBipartite({ A: [], B: [] })).toEqual({ bipartite: true, color: { A: 0, B: 0 } });
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      { graph: { nodes: [{ id: 'A', x: 0, y: 0 }], edges: [] } },
      { graph: { nodes: [], edges: [] } },
      { graph: { nodes: [{ id: 'A', x: 0, y: 0 }, { id: 'B', x: 1, y: 1 }], edges: [{ from: 'A', to: 'B' }, { from: 'B', to: 'A' }] } },
      ...(mod.meta.presets ?? []).map((p) => p.values),
    ]);
  });
});
