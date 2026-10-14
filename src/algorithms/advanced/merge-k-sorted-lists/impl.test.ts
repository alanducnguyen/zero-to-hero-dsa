import { describe, it, expect } from 'vitest';
import { mergeKSortedLists } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('merge-k-sorted-lists', () => {
  it('merges k sorted lists', () => {
    expect(mergeKSortedLists([[1, 4, 5], [1, 3, 4], [2, 6]])).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
    expect(mergeKSortedLists([])).toEqual([]);
    expect(mergeKSortedLists([[]])).toEqual([]);
    expect(mergeKSortedLists([[], [2, 3], [], [1]])).toEqual([1, 2, 3]);
    expect(mergeKSortedLists([[9], [1, 2, 3, 4], [5, 6], [0, 7]])).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 9]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { lists: [] }, { lists: [[], []] }, { lists: [[3, 1], [2]] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
