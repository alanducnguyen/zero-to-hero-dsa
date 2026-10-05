import { describe, it, expect } from 'vitest';
import { LRUCache } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('lru-cache', () => {
  it('leetcode example', () => {
    const c = new LRUCache(2);
    c.put(1, 1); c.put(2, 2);
    expect(c.get(1)).toBe(1);
    c.put(3, 3);
    expect(c.get(2)).toBe(-1);
    c.put(4, 4);
    expect(c.get(1)).toBe(-1);
    expect(c.get(3)).toBe(3);
    expect(c.get(4)).toBe(4);
  });
  it('update existing key does not evict', () => {
    const c = new LRUCache(2);
    c.put(2, 1); c.put(2, 2);
    expect(c.get(2)).toBe(2);
    c.put(1, 1); c.put(4, 1);
    expect(c.get(2)).toBe(-1);
    expect(c.get(1)).toBe(1);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { capacity: 1, ops: [] }, { capacity: 2, ops: ['get 5', 'put 1 1', 'nonsense', 'get 1'] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
