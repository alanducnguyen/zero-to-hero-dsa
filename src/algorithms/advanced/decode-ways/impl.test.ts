import { describe, it, expect } from 'vitest';
import { numDecodings } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

function brute(s: string): number {
  if (s.length === 0) return 1;
  let c = 0;
  if (s[0] !== '0') c += brute(s.slice(1));
  if (s.length >= 2 && s[0] !== '0' && Number(s.slice(0, 2)) <= 26) c += brute(s.slice(2));
  return c;
}

describe('decode-ways', () => {
  it('counts decodings', () => {
    expect(numDecodings('12')).toBe(2);
    expect(numDecodings('226')).toBe(3);
    expect(numDecodings('2263')).toBe(3);
    expect(numDecodings('06')).toBe(0);
    expect(numDecodings('0')).toBe(0);
    expect(numDecodings('10')).toBe(1);
    expect(numDecodings('2101')).toBe(1);
    expect(numDecodings('1001')).toBe(0);
    expect(numDecodings('27')).toBe(1);
    expect(numDecodings('111111')).toBe(13);
    expect(numDecodings('')).toBe(0);
  });
  it('matches brute force on random strings', () => {
    for (let t = 0; t < 300; t++) {
      const len = 1 + Math.floor(Math.random() * 10);
      const s = Array.from({ length: len }, () => '0123789'[Math.floor(Math.random() * 7)]).join('');
      expect(numDecodings(s)).toBe(brute(s));
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { s: '' }, { s: '0' }, { s: '30' }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
