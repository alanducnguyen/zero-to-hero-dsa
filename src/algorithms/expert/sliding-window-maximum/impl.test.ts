import { describe, it, expect } from 'vitest';
import { maxSlidingWindow } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('sliding-window-maximum', () => {
  it('window maxima', () => {
    expect(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([3, 3, 5, 5, 6, 7]);
    expect(maxSlidingWindow([1], 1)).toEqual([1]);
    expect(maxSlidingWindow([9, 8, 7, 6, 5, 4], 3)).toEqual([9, 8, 7, 6]);
    expect(maxSlidingWindow([4, 2, 8, 1], 4)).toEqual([8]);
    expect(maxSlidingWindow([], 1)).toEqual([]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { nums: [], k: 1 }, { nums: [5], k: 3 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
