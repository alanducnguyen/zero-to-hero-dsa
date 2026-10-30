import { describe, it, expect } from 'vitest';
import { isPalindrome } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

function brute(s: string): boolean {
  const t = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return t === [...t].reverse().join('');
}

describe('valid-palindrome', () => {
  it('handles examples and edge cases', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    expect(isPalindrome('race a car')).toBe(false);
    expect(isPalindrome('')).toBe(true);
    expect(isPalindrome(' ')).toBe(true);
    expect(isPalindrome('a')).toBe(true);
    expect(isPalindrome('0P')).toBe(false);
    expect(isPalindrome('.,')).toBe(true);
    expect(isPalindrome('ab_a')).toBe(true);
  });
  it('matches brute force on random input', () => {
    const alphabet = 'aAbB01 ,.';
    for (let t = 0; t < 300; t++) {
      const s = Array.from({ length: Math.floor(Math.random() * 10) }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
      expect(isPalindrome(s)).toBe(brute(s));
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { s: '' }, { s: 'a' }, { s: '0P' }, { s: 'aba' }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
