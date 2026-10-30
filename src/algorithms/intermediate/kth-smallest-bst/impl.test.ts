import { describe, it, expect } from 'vitest';
import { kthSmallest } from './impl';
import { buildBST, run } from './node';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('kth-smallest-bst', () => {
  it('finds k-th smallest', () => {
    expect(run({ values: [3, 1, 4, 2], k: 1 })).toBe(1);
    expect(run({ values: [5, 3, 6, 2, 4, 1], k: 3 })).toBe(3);
    expect(run({ values: [5, 3, 6, 2, 4, 1], k: 6 })).toBe(6);
    expect(run({ values: [1, 2, 3, 4, 5], k: 5 })).toBe(5);
    expect(run({ values: [5, 4, 3, 2, 1], k: 2 })).toBe(2);
    expect(run({ values: [7], k: 1 })).toBe(7);
  });
  it('handles duplicates and invalid k', () => {
    expect(run({ values: [2, 2, 1], k: 2 })).toBe(2);
    expect(run({ values: [2, 1], k: 3 })).toBe(-1);
    expect(run({ values: [2, 1], k: 0 })).toBe(-1);
    expect(kthSmallest(buildBST([]), 1)).toBe(-1);
  });
  it('trace matches impl', () => {
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
    expect(runTrace(mod, { values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], k: 15 }).truncated).toBe(false);
    checkModule(mod, [
      defaultInput(mod),
      ...(mod.meta.presets ?? []).map((p) => p.values),
      { values: [], k: 1 },
      { values: [2, 1], k: 5 },
      { values: [-3, -1, -2], k: 2 },
    ]);
  });
});
