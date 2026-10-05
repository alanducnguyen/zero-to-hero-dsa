import { describe, it, expect } from 'vitest';
import { topologicalSort } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('topological-sort', () => {
  it('orders a DAG', () => {
    const order = topologicalSort({ A: ['C'], B: ['C'], C: ['D'], D: [] })!;
    expect(order).toHaveLength(4);
    expect(order.indexOf('A')).toBeLessThan(order.indexOf('C'));
    expect(order.indexOf('B')).toBeLessThan(order.indexOf('C'));
    expect(order.indexOf('C')).toBeLessThan(order.indexOf('D'));
    expect(topologicalSort({})).toEqual([]);
    expect(topologicalSort({ A: ['B'] })).toEqual(['A', 'B']);
  });
  it('detects cycles', () => {
    expect(topologicalSort({ A: ['B'], B: ['C'], C: ['A'] })).toBeNull();
    expect(topologicalSort({ A: ['A'] })).toBeNull();
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { graph: { nodes: [], edges: [] } }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
