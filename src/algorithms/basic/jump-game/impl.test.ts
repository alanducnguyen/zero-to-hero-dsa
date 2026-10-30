import { describe, it, expect } from 'vitest';
import { canJump } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('jump-game', () => {
  it('decides reachability', () => {
    expect(canJump([2, 3, 1, 1, 4])).toBe(true);
    expect(canJump([3, 2, 1, 0, 4])).toBe(false);
    expect(canJump([0])).toBe(true);
    expect(canJump([0, 1])).toBe(false);
    expect(canJump([1, 0])).toBe(true);
    expect(canJump([2, 0, 0])).toBe(true);
    expect(canJump([])).toBe(true);
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      { nums: [] },
      { nums: [0] },
      { nums: [0, 1] },
      { nums: [3, 2, 1, 0, 4] },
      { nums: [2, 3, 1, 1, 4] },
    ]);
  });
});
