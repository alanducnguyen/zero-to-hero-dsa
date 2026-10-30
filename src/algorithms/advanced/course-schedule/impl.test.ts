import { describe, it, expect } from 'vitest';
import { findOrder } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

/** mọi cặp [a, b] phải có b đứng trước a */
function isValidOrder(n: number, pre: number[][], order: number[]) {
  if (order.length !== n || new Set(order).size !== n) return false;
  const pos = new Map(order.map((c, i) => [c, i]));
  return pre.every(([a, b]) => pos.get(b)! < pos.get(a)!);
}

describe('course-schedule', () => {
  it('finds a valid order on DAGs', () => {
    const pre = [[1, 0], [2, 0], [3, 1], [3, 2]];
    expect(isValidOrder(4, pre, findOrder(4, pre))).toBe(true);
    expect(findOrder(2, [[1, 0]])).toEqual([0, 1]);
    expect(findOrder(1, [])).toEqual([0]);
    expect(findOrder(0, [])).toEqual([]);
    expect(isValidOrder(3, [], findOrder(3, []))).toBe(true);
  });
  it('returns [] on cycles', () => {
    expect(findOrder(2, [[1, 0], [0, 1]])).toEqual([]);
    expect(findOrder(1, [[0, 0]])).toEqual([]);
    expect(findOrder(4, [[1, 0], [2, 1], [3, 2], [1, 3]])).toEqual([]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      ...(mod.meta.presets ?? []).map((p) => p.values),
      { numCourses: 0, prerequisites: [] },
      { numCourses: 3, prerequisites: ['2->0', '1->0', '2->1'] },
    ]);
  });
});
