import { describe, it, expect } from 'vitest';
import { deserialize, serialize } from './impl';
import { fromLevelOrder, parseTree, run } from './node';
import mod from './index';
import { runTrace } from '@/engine/runner';
import { checkModule, defaultInput } from '@/engine/testUtils';

const t = (xs: (number | null)[]) => fromLevelOrder(xs);

describe('serialize-binary-tree', () => {
  it('serializes in preorder with # for null', () => {
    expect(serialize(t([1, 2, 3, null, null, 4, 5]))).toBe('1,2,#,#,3,4,#,#,5,#,#');
    expect(serialize(null)).toBe('#');
    expect(serialize(t([7]))).toBe('7,#,#');
    expect(serialize(t([1, 2]))).toBe('1,2,#,#,#');
    expect(serialize(t([1, null, 2]))).toBe('1,#,2,#,#');
  });
  it('round-trips: deserialize(serialize(t)) equals t', () => {
    const cases: (number | null)[][] = [
      [],
      [0],
      [-5, 10],
      [1, null, 2, null, 3],
      [1, 2, 3, null, null, 4, 5],
      [4, 2, 6, 1, 3, 5, 7],
      [1, 1, 1, null, 1, 1],
      [100, -100, 42, null, 7],
    ];
    for (const xs of cases) {
      const root = t(xs);
      expect(deserialize(serialize(root))).toEqual(root);
    }
    expect(deserialize('#')).toBeNull();
  });
  it('run reports round-trip', () => {
    expect(run({ tree: ['1', '2', '3', 'null', 'null', '4', '5'] })).toEqual({ data: '1,2,#,#,3,4,#,#,5,#,#', roundTrip: true });
    expect(run({ tree: [] })).toEqual({ data: '#', roundTrip: true });
    expect(parseTree(['1', 'null', '#', 'x'])).toEqual([1, null, null, null]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), ...(mod.meta.presets ?? []).map((p) => p.values), { tree: ['9'] }, { tree: ['null'] }]);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
