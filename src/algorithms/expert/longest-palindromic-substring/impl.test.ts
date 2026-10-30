import { describe, it, expect } from 'vitest';
import { longestPalindrome } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('longest-palindromic-substring', () => {
  it('finds the first longest palindrome', () => {
    expect(longestPalindrome('babad')).toBe('bab');
    expect(longestPalindrome('cbbd')).toBe('bb');
    expect(longestPalindrome('')).toBe('');
    expect(longestPalindrome('a')).toBe('a');
    expect(longestPalindrome('ac')).toBe('a');
    expect(longestPalindrome('aaaa')).toBe('aaaa');
    expect(longestPalindrome('forgeeksskeeg')).toBe('geeksskeeg');
    expect(longestPalindrome('racecar')).toBe('racecar');
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), ...(mod.meta.presets ?? []).map((p) => p.values), { s: '' }, { s: 'a' }, { s: 'abcde' }]);
  });
});
