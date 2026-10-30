import { describe, it, expect } from 'vitest';
import { cloneGraph, GraphNode } from './impl';
import { build, run, toAdjacency } from './node';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

/** thu thập mọi node đi được từ node */
function collect(node: GraphNode | null): Set<GraphNode> {
  const seen = new Set<GraphNode>();
  const st = node ? [node] : [];
  while (st.length) {
    const u = st.pop()!;
    if (seen.has(u)) continue;
    seen.add(u);
    st.push(...u.neighbors);
  }
  return seen;
}

describe('clone-graph', () => {
  it('returns null for empty graph', () => {
    expect(cloneGraph(null)).toBeNull();
    expect(run({ edges: [] })).toEqual([]);
  });
  it('clones LeetCode examples', () => {
    expect(run({ edges: ['1-2', '1-4', '2-3', '3-4'] })).toEqual([[2, 4], [1, 3], [2, 4], [1, 3]]);
    expect(run({ edges: ['1'] })).toEqual([[]]);
    expect(run({ edges: ['1-2'] })).toEqual([[2], [1]]);
  });
  it('produces a deep copy with no shared nodes', () => {
    const { start } = build({ edges: ['1-2', '2-3', '3-1', '3-4', '4-5'] });
    const copy = cloneGraph(start);
    const orig = collect(start);
    const cl = collect(copy);
    expect(cl.size).toBe(orig.size);
    for (const u of cl) expect(orig.has(u)).toBe(false);
    expect(toAdjacency(copy)).toEqual(toAdjacency(start));
  });
  it('only clones the connected component of the start node', () => {
    expect(run({ edges: ['1-2', '3-4'] })).toEqual([[2], [1]]);
  });
  it('ignores self-loops, duplicates and bad strings', () => {
    expect(run({ edges: ['1-2', '2-1', '1-1', 'x', '2-3'] })).toEqual([[2], [1, 3], [2]]);
  });
  it('trace matches impl', () => {
    const inputs = [
      defaultInput(mod),
      ...(mod.meta.presets ?? []).map((p) => p.values),
      { edges: [] },
      { edges: ['1-2', '3-4'] },
    ];
    checkModule(mod, inputs);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
