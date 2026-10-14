import { describe, it, expect } from 'vitest';
import { groupAnagrams } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
describe('group-anagrams', () => {
  it('groups', () => {
    expect(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])).toEqual([['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]);
    expect(groupAnagrams([''])).toEqual([['']]);
    expect(groupAnagrams([])).toEqual([]);
    expect(groupAnagrams(['ab', 'cd'])).toEqual([['ab'], ['cd']]);
  });
  it('trace matches impl', () => { checkModule(mod, [defaultInput(mod), { words: [] }, { words: ['a'] }, ...(mod.meta.presets ?? []).map((p) => p.values)]); });
});
