import { describe, it, expect } from 'vitest';
import { kruskal } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('kruskal-mst', () => {
  it('finds MST', () => {
    const r = kruskal(['A', 'B', 'C', 'D'], [
      { from: 'A', to: 'B', weight: 1 }, { from: 'B', to: 'C', weight: 2 }, { from: 'A', to: 'C', weight: 3 }, { from: 'C', to: 'D', weight: 4 }, { from: 'B', to: 'D', weight: 5 },
    ])!;
    expect(r.total).toBe(7);
    expect(r.edges).toHaveLength(3);
    expect(kruskal(['A', 'B', 'C'], [{ from: 'A', to: 'B', weight: 1 }])).toBeNull();
    expect(kruskal(['A'], [])).toEqual({ edges: [], total: 0 });
  });
  it('trace matches impl', () => {
    const d = defaultInput(mod);
    checkModule(mod, [d, { graph: { nodes: [{ id: 'A', x: 0, y: 0 }], edges: [] } }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
    expect((mod.run(d) as { total: number }).total).toBe(17);
  });
});
