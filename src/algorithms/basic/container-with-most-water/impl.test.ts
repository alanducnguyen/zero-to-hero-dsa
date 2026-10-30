import { describe, it, expect } from 'vitest';
import { maxArea } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

function brute(h: number[]): number {
  let best = 0;
  for (let i = 0; i < h.length; i++) for (let j = i + 1; j < h.length; j++) best = Math.max(best, Math.min(h[i], h[j]) * (j - i));
  return best;
}

describe('container-with-most-water', () => {
  it('computes max area', () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
    expect(maxArea([1, 1])).toBe(1);
    expect(maxArea([])).toBe(0);
    expect(maxArea([5])).toBe(0);
    expect(maxArea([0, 0, 0])).toBe(0);
    expect(maxArea([4, 3, 2, 1, 4])).toBe(16);
  });
  it('matches brute force on random input', () => {
    for (let t = 0; t < 200; t++) {
      const h = Array.from({ length: Math.floor(Math.random() * 12) }, () => Math.floor(Math.random() * 20));
      expect(maxArea(h)).toBe(brute(h));
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { height: [] }, { height: [3] }, { height: [1, 1] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
