import { describe, it, expect } from 'vitest';
import { LFUCache } from './impl';
import { run } from './node';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('lfu-cache', () => {
  it('leetcode example', () => {
    const c = new LFUCache(2);
    c.put(1, 1); c.put(2, 2);
    expect(c.get(1)).toBe(1);
    c.put(3, 3); // loại 2 (freq 1)
    expect(c.get(2)).toBe(-1);
    expect(c.get(3)).toBe(3);
    c.put(4, 4); // 1 và 3 cùng freq 2 ⇒ loại 1 (LRU)
    expect(c.get(1)).toBe(-1);
    expect(c.get(3)).toBe(3);
    expect(c.get(4)).toBe(4);
  });
  it('update existing key counts as use and does not evict', () => {
    const c = new LFUCache(2);
    c.put(1, 1); c.put(1, 5); c.put(2, 2);
    c.put(3, 3); // 1 có freq 2 ⇒ loại 2
    expect(c.get(1)).toBe(5);
    expect(c.get(2)).toBe(-1);
    expect(c.get(3)).toBe(3);
  });
  it('capacity 0 stores nothing; capacity 1 always evicts', () => {
    const z = new LFUCache(0);
    z.put(1, 1);
    expect(z.get(1)).toBe(-1);
    expect(run({ capacity: 1, ops: ['put 1 1', 'get 1', 'put 2 2', 'get 1', 'get 2'] })).toEqual([null, 1, null, -1, 2]);
  });
  it('matches a naive reference on random ops', () => {
    let seed = 7;
    const rnd = (m: number) => ((seed = (seed * 1103515245 + 12345) % 2 ** 31), seed % m);
    for (let t = 0; t < 500; t++) {
      const cap = 1 + rnd(4);
      const c = new LFUCache(cap);
      const ref = new Map<number, { v: number; f: number; last: number }>();
      let time = 0;
      for (let s = 0; s < 40; s++) {
        const key = rnd(6);
        time++;
        if (rnd(2)) {
          const e = ref.get(key);
          expect(c.get(key)).toBe(e ? e.v : -1);
          if (e) { e.f++; e.last = time; }
        } else {
          const v = rnd(100);
          c.put(key, v);
          const e = ref.get(key);
          if (e) { e.v = v; e.f++; e.last = time; continue; }
          if (ref.size === cap) {
            let victim = -1;
            for (const [k, x] of ref) {
              const b = ref.get(victim);
              if (!b || x.f < b.f || (x.f === b.f && x.last < b.last)) victim = k;
            }
            ref.delete(victim);
          }
          ref.set(key, { v, f: 1, last: time });
        }
      }
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      ...(mod.meta.presets ?? []).map((p) => p.values),
      { capacity: 1, ops: [] },
      { capacity: 2, ops: ['get 5', 'put 1 1', 'nonsense', 'get 1', 'put 2'] },
      { capacity: 3, ops: ['put 1 1', 'put 2 2', 'put 3 3', 'get 1', 'get 1', 'get 2', 'put 4 4', 'get 3', 'get 4', 'put 5 5', 'get 2', 'get 4', 'get 5'] },
    ]);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
