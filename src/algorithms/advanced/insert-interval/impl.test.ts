import { describe, it, expect } from 'vitest';
import { insertInterval } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('insert-interval', () => {
  it('inserts and merges', () => {
    expect(insertInterval([[1, 3], [6, 9]], [2, 5])).toEqual([[1, 5], [6, 9]]);
    expect(insertInterval([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])).toEqual([[1, 2], [3, 10], [12, 16]]);
  });
  it('handles edge cases', () => {
    expect(insertInterval([], [5, 7])).toEqual([[5, 7]]);
    expect(insertInterval([[1, 5]], [6, 8])).toEqual([[1, 5], [6, 8]]);
    expect(insertInterval([[3, 5]], [0, 1])).toEqual([[0, 1], [3, 5]]);
    expect(insertInterval([[1, 5]], [5, 7])).toEqual([[1, 7]]); // chạm đầu mút
    expect(insertInterval([[2, 3], [5, 6]], [1, 10])).toEqual([[1, 10]]);
    expect(insertInterval([[1, 10]], [3, 4])).toEqual([[1, 10]]); // nằm gọn bên trong
  });
  it('does not mutate input', () => {
    const iv = [[1, 3], [6, 9]];
    insertInterval(iv, [2, 5]);
    expect(iv).toEqual([[1, 3], [6, 9]]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      ...(mod.meta.presets ?? []).map((p) => p.values),
      { intervals: ['1-5'], newInterval: '5-7' },
      { intervals: ['5-6'], newInterval: '1-2' },
    ]);
  });
});
