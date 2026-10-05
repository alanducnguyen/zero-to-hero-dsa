import { describe, it, expect } from 'vitest';
import { dijkstra } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('dijkstra', () => {
  it('computes shortest distances', () => {
    const g = {
      A: [{ to: 'B', weight: 4 }, { to: 'C', weight: 2 }],
      B: [{ to: 'D', weight: 5 }],
      C: [{ to: 'B', weight: 1 }, { to: 'D', weight: 8 }],
      D: [],
      E: [],
    };
    expect(dijkstra(g, 'A')).toEqual({ A: 0, B: 3, C: 2, D: 8, E: Infinity });
  });
  it('trace matches impl', () => {
    const d = defaultInput(mod);
    checkModule(mod, [d, { ...d, source: 'F' }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
    expect(mod.run(d)).toEqual({ A: 0, B: 4, C: 2, D: 5, E: 9, F: 11 });
  });
});
