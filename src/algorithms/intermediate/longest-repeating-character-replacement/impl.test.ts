import { describe, it, expect } from 'vitest';
import { characterReplacement } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

function brute(s: string, k: number): number {
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    const c: Record<string, number> = {};
    let mx = 0;
    for (let j = i; j < s.length; j++) {
      c[s[j]] = (c[s[j]] ?? 0) + 1;
      mx = Math.max(mx, c[s[j]]);
      if (j - i + 1 - mx <= k) best = Math.max(best, j - i + 1);
    }
  }
  return best;
}

describe('longest-repeating-character-replacement', () => {
  it('handles examples and edge cases', () => {
    expect(characterReplacement('ABAB', 2)).toBe(4);
    expect(characterReplacement('AABABBA', 1)).toBe(4);
    expect(characterReplacement('', 3)).toBe(0);
    expect(characterReplacement('A', 0)).toBe(1);
    expect(characterReplacement('ABCD', 0)).toBe(1);
    expect(characterReplacement('ABCD', 10)).toBe(4);
    expect(characterReplacement('AAAABCDEBBB', 2)).toBe(6);
  });
  it('matches brute force on random strings', () => {
    let seed = 7;
    const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
    for (let t = 0; t < 300; t++) {
      const len = Math.floor(rnd() * 12);
      const s = Array.from({ length: len }, () => 'ABC'[Math.floor(rnd() * 3)]).join('');
      const k = Math.floor(rnd() * 4);
      expect(characterReplacement(s, k)).toBe(brute(s, k));
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { s: '', k: 1 }, { s: 'A', k: 0 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
