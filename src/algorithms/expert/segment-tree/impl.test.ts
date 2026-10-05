import { describe, it, expect } from 'vitest';
import { SegmentTree } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('segment-tree', () => {
  it('query and update', () => {
    const st = new SegmentTree([2, 1, 5, 3, 4, 6]);
    expect(st.query(1, 4)).toBe(13);
    expect(st.query(0, 5)).toBe(21);
    st.update(2, 0);
    expect(st.query(1, 4)).toBe(8);
    expect(st.query(2, 2)).toBe(0);
    const one = new SegmentTree([7]);
    expect(one.query(0, 0)).toBe(7);
    one.update(0, 3);
    expect(one.query(0, 0)).toBe(3);
    expect(new SegmentTree([]).n).toBe(0);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [], ops: [] }, { nums: [1, 2], ops: ['query 0 9', 'sum 1 0', 'set 1 5', 'query 0 1'] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
