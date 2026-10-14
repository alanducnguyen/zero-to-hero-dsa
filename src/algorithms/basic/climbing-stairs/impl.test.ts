import { describe, it, expect } from 'vitest';
import { climbingStairs } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('climbing-stairs', () => {
  it('counts ways', () => {
    expect(climbingStairs(0)).toBe(1);
    expect(climbingStairs(1)).toBe(1);
    expect(climbingStairs(2)).toBe(2);
    expect(climbingStairs(3)).toBe(3);
    expect(climbingStairs(6)).toBe(13);
    expect(climbingStairs(10)).toBe(89);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { n: 2 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
