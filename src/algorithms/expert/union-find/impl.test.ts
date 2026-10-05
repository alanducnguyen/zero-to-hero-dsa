import { describe, it, expect } from 'vitest';
import { UnionFind } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('union-find', () => {
  it('unions and finds', () => {
    const uf = new UnionFind(5);
    expect(uf.count).toBe(5);
    expect(uf.union(0, 1)).toBe(true);
    expect(uf.union(1, 2)).toBe(true);
    expect(uf.union(0, 2)).toBe(false); // chu trình
    expect(uf.connected(0, 2)).toBe(true);
    expect(uf.connected(0, 3)).toBe(false);
    expect(uf.count).toBe(3);
    uf.union(3, 4);
    expect(uf.count).toBe(2);
  });
  it('path compression flattens', () => {
    const uf = new UnionFind(4);
    uf.parent[1] = 0; uf.parent[2] = 1; uf.parent[3] = 2; // chuỗi thủ công
    expect(uf.find(3)).toBe(0);
    expect(uf.parent[3]).toBe(0);
    expect(uf.parent[2]).toBe(0);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { n: 1, ops: [] }, { n: 3, ops: ['0-1', '9-9', 'abc', '0?1', '1?2'] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
