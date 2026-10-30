import { describe, it, expect } from 'vitest';
import { pacificAtlantic } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('pacific-atlantic-water-flow', () => {
  it('solves LeetCode examples', () => {
    expect(pacificAtlantic([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]])).toEqual([
      [0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0],
    ]);
    expect(pacificAtlantic([[1]])).toEqual([[0, 0]]);
  });
  it('handles edge cases', () => {
    expect(pacificAtlantic([])).toEqual([]);
    expect(pacificAtlantic([[]])).toEqual([]);
    expect(pacificAtlantic([[3, 1, 2]])).toEqual([[0, 0], [0, 1], [0, 2]]); // một hàng: mọi ô chạm cả hai biển
    expect(pacificAtlantic([[3, 3, 3], [3, 1, 3], [3, 3, 3]])).toEqual([[0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2], [0, 0], [0, 1]].sort((a, b) => a[0] - b[0] || a[1] - b[1]));
    expect(pacificAtlantic([[1, 1, 1], [1, 5, 1], [1, 1, 1]])).toHaveLength(9); // viền cao 1 bằng nhau ⇒ cả viền nối hai biển, đỉnh giữa chảy xuống viền
    expect(pacificAtlantic([[2, 2], [2, 2]])).toEqual([[0, 0], [0, 1], [1, 0], [1, 1]]); // cùng độ cao vẫn chảy
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { heights: [] }, { heights: [[3, 1, 2]] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
