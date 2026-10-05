import { describe, it, expect } from 'vitest';
import { buildLPS, kmpSearch } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('kmp', () => {
  it('lps table', () => {
    expect(buildLPS('ababca')).toEqual([0, 0, 1, 2, 0, 1]);
    expect(buildLPS('aabaaa')).toEqual([0, 1, 0, 1, 2, 2]);
    expect(buildLPS('aaaa')).toEqual([0, 1, 2, 3]);
    expect(buildLPS('')).toEqual([]);
  });
  it('search', () => {
    expect(kmpSearch('abababcabababca', 'ababca')).toEqual([2, 9]);
    expect(kmpSearch('aaaaab', 'aaa')).toEqual([0, 1, 2]);
    expect(kmpSearch('abcdef', 'xyz')).toEqual([]);
    expect(kmpSearch('abc', '')).toEqual([]);
    expect(kmpSearch('a', 'a')).toEqual([0]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { text: '', pattern: 'a' }, { text: 'abc', pattern: '' }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
