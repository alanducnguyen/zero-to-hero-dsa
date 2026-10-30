import { describe, it, expect } from 'vitest';
import { maxDepth } from './impl';
import { buildBST, run } from './node';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('max-depth-binary-tree', () => {
  it('computes depth', () => {
    expect(maxDepth(null)).toBe(0);
    expect(run({ values: [] })).toBe(0);
    expect(run({ values: [7] })).toBe(1);
    expect(run({ values: [2, 1] })).toBe(2);
    expect(run({ values: [4, 2, 6, 1, 3, 5, 7] })).toBe(3);
    expect(run({ values: [4, 2, 6, 1, 3, 7, 8] })).toBe(4);
    expect(run({ values: [1, 2, 3, 4, 5] })).toBe(5);
    expect(run({ values: [5, 4, 3, 2, 1] })).toBe(5);
    expect(run({ values: [3, 3, 3] })).toBe(1);
  });
  it('handles a hand-built non-BST tree', () => {
    const t = buildBST([3]);
    t!.left = { val: 9, left: null, right: null };
    t!.right = { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } };
    expect(maxDepth(t)).toBe(3);
  });
  it('trace matches impl', () => {
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
    expect(runTrace(mod, { values: [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15] }).truncated).toBe(false);
    checkModule(mod, [
      defaultInput(mod),
      ...(mod.meta.presets ?? []).map((p) => p.values),
      { values: [] },
      { values: [-3, -1, -2] },
    ]);
  });
});
