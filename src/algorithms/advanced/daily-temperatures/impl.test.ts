import { describe, it, expect } from 'vitest';
import { dailyTemperatures } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('daily-temperatures', () => {
  it('computes days until warmer', () => {
    expect(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
    expect(dailyTemperatures([80, 75, 70, 65])).toEqual([0, 0, 0, 0]);
    expect(dailyTemperatures([60, 65, 70, 75])).toEqual([1, 1, 1, 0]);
    expect(dailyTemperatures([50])).toEqual([0]);
    expect(dailyTemperatures([])).toEqual([]);
    expect(dailyTemperatures([70, 70, 71])).toEqual([2, 1, 0]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { temps: [] }, { temps: [70, 70, 71] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
