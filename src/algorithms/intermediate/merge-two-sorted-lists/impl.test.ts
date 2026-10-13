import { describe, it, expect } from 'vitest';
import { fromArray, mergeTwoLists, toArray } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
describe('merge-two-sorted-lists', () => {
  it('merges', () => {
    expect(toArray(mergeTwoLists(fromArray([1, 2, 4]), fromArray([1, 3, 4])))).toEqual([1, 1, 2, 3, 4, 4]);
    expect(toArray(mergeTwoLists(fromArray([]), fromArray([0])))).toEqual([0]);
    expect(toArray(mergeTwoLists(null, null))).toEqual([]);
    expect(toArray(mergeTwoLists(fromArray([1, 2]), fromArray([8, 9])))).toEqual([1, 2, 8, 9]);
  });
  it('trace matches impl', () => { checkModule(mod, [defaultInput(mod), { a: [], b: [] }, { a: [3], b: [] }, ...(mod.meta.presets ?? []).map((p) => p.values)]); });
});
