import { describe, it, expect } from 'vitest';
import { Trie } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('trie', () => {
  it('insert/search/startsWith', () => {
    const t = new Trie();
    t.insert('apple');
    expect(t.search('apple')).toBe(true);
    expect(t.search('app')).toBe(false);
    expect(t.startsWith('app')).toBe(true);
    t.insert('app');
    expect(t.search('app')).toBe(true);
    expect(t.startsWith('b')).toBe(false);
    expect(t.search('')).toBe(false);
    expect(t.startsWith('')).toBe(true);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { words: [], search: 'a', prefix: '' }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
