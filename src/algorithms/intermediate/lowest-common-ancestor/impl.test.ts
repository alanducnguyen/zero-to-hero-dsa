import { describe, it, expect } from 'vitest';
import { fromLevelOrder, lowestCommonAncestor } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
describe('lowest-common-ancestor', () => {
  const t = fromLevelOrder([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
  it('finds lca', () => {
    expect(lowestCommonAncestor(t, 5, 1)?.val).toBe(3);
    expect(lowestCommonAncestor(t, 5, 4)?.val).toBe(5);
    expect(lowestCommonAncestor(t, 7, 4)?.val).toBe(2);
    expect(lowestCommonAncestor(null, 1, 2)).toBeNull();
    expect(lowestCommonAncestor(fromLevelOrder([1, 2, 3]), 2, 9)?.val).toBe(2);
  });
  it('trace matches impl', () => { checkModule(mod, [defaultInput(mod), { tree: [], p: 1, q: 2 }, { tree: ['1'], p: 1, q: 1 }, ...(mod.meta.presets ?? []).map((p) => p.values)]); });
});
