import { describe, it, expect } from 'vitest';
import { canPartition } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('partition-equal-subset-sum', () => {
  it('decides partition', () => {
    expect(canPartition([1, 5, 11, 5])).toBe(true);
    expect(canPartition([1, 2, 3, 5])).toBe(false);
    expect(canPartition([1, 2, 4])).toBe(false);
    expect(canPartition([3, 3, 3, 4, 5])).toBe(true);
    expect(canPartition([2, 2])).toBe(true);
    expect(canPartition([1])).toBe(false);
    expect(canPartition([2])).toBe(false);
    expect(canPartition([])).toBe(true);
    // [1, 3]: target 2 – nếu duyệt j tăng dần sẽ dùng số 1 hai lần ⇒ true (sai).
    expect(canPartition([1, 3])).toBe(false);
    expect(canPartition([100, 100])).toBe(true);
  });
  it('trace matches impl', () => {
    const inputs = [defaultInput(mod), ...(mod.meta.presets ?? []).map((p) => p.values), { nums: [] }, { nums: [1, 3] }, { nums: [7] }];
    checkModule(mod, inputs);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
