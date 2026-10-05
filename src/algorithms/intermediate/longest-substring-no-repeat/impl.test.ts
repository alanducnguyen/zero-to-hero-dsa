import { describe, it, expect } from 'vitest';
import { lengthOfLongestSubstring } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('longest-substring-no-repeat', () => {
  it('computes length', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
    expect(lengthOfLongestSubstring('abba')).toBe(2);
    expect(lengthOfLongestSubstring('')).toBe(0);
    expect(lengthOfLongestSubstring('abcdef')).toBe(6);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { s: '' }, { s: 'abba' }, { s: 'bbbbb' }, { s: 'pwwkew' }]);
  });
});
