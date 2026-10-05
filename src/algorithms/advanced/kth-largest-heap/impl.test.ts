import { describe, it, expect } from 'vitest';
import { findKthLargest, MinHeap } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('kth-largest-heap', () => {
  it('heap keeps order', () => {
    const h = new MinHeap();
    for (const x of [5, 3, 8, 1, 9, 2]) h.push(x);
    const out: number[] = [];
    while (h.size) out.push(h.pop());
    expect(out).toEqual([1, 2, 3, 5, 8, 9]);
  });
  it('finds kth largest', () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
    expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
    expect(findKthLargest([1], 1)).toBe(1);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [1], k: 1 }, { nums: [2, 1], k: 5 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
