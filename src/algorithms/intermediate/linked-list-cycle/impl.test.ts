import { describe, it, expect } from 'vitest';
import { buildList, detectCycle } from './impl';
import { run } from './node';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('linked-list-cycle', () => {
  it('detects cycle start', () => {
    expect(run({ values: [3, 2, 0, -4], pos: 1 })).toBe(1);
    expect(run({ values: [1, 2], pos: 0 })).toBe(0);
    expect(run({ values: [1], pos: -1 })).toBe(-1);
    expect(run({ values: [1], pos: 0 })).toBe(0);
    expect(run({ values: [], pos: -1 })).toBe(-1);
    expect(detectCycle(buildList([1, 2, 3], -1))).toBeNull();
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { values: [], pos: -1 }, { values: [1, 2], pos: 0 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
