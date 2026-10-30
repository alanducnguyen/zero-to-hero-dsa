import { describe, it, expect } from 'vitest';
import { networkDelayTime } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('network-delay-time', () => {
  it('solves LeetCode examples', () => {
    expect(networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2)).toBe(2);
    expect(networkDelayTime([[1, 2, 1]], 2, 1)).toBe(1);
    expect(networkDelayTime([[1, 2, 1]], 2, 2)).toBe(-1); // cạnh có hướng, không đi ngược
  });
  it('handles edge cases', () => {
    expect(networkDelayTime([], 1, 1)).toBe(0);
    expect(networkDelayTime([[1, 1, 5]], 1, 1)).toBe(0); // cạnh tự vòng
    expect(networkDelayTime([[1, 2, 5], [1, 2, 2]], 2, 1)).toBe(2); // cạnh song song
    expect(networkDelayTime([[1, 4, 10], [1, 2, 1], [2, 3, 1], [3, 4, 1]], 4, 1)).toBe(3);
    expect(networkDelayTime([[1, 2, 0], [2, 3, 0]], 3, 1)).toBe(0);
    expect(networkDelayTime([[1, 2, 4], [1, 3, 1], [3, 2, 2], [2, 4, 1], [3, 4, 5], [4, 5, 3], [5, 1, 1]], 5, 1)).toBe(7);
  });
  it('trace matches impl', () => {
    const d = defaultInput(mod);
    checkModule(mod, [d, { ...d, k: 3 }, { ...d, k: 99 }, { times: [], n: 1, k: 1 }, { times: [[1, 9, 1]], n: 3, k: 1 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
    expect(runTrace(mod, d).frames.length).toBeLessThanOrEqual(300);
  });
});
