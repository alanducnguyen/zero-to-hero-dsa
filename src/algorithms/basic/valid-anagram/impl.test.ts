import { describe, it, expect } from 'vitest';
import { isAnagram } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
describe('valid-anagram', () => {
  it('checks', () => {
    expect(isAnagram('anagram', 'nagaram')).toBe(true);
    expect(isAnagram('rat', 'car')).toBe(false);
    expect(isAnagram('rat', 'cart')).toBe(false);
    expect(isAnagram('', '')).toBe(true);
    expect(isAnagram('aab', 'abb')).toBe(false);
  });
  it('trace matches impl', () => { checkModule(mod, [defaultInput(mod), { s: '', t: '' }, { s: 'aab', t: 'abb' }, ...(mod.meta.presets ?? []).map((p) => p.values)]); });
});
