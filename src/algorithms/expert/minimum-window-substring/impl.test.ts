import { describe, it, expect } from 'vitest';
import { minWindow } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('minimum-window-substring', () => {
  it('finds minimal window', () => {
    expect(minWindow('ADOBECODEBANC', 'ABC')).toBe('BANC');
    expect(minWindow('a', 'a')).toBe('a');
    expect(minWindow('a', 'aa')).toBe('');
    expect(minWindow('ab', 'b')).toBe('b');
    expect(minWindow('ABCDE', 'XY')).toBe('');
    expect(minWindow('AABBCAB', 'AAB')).toBe('AAB');
    expect(minWindow('abcxxxxab', 'cab')).toBe('abc');
    expect(minWindow('', 'a')).toBe('');
    expect(minWindow('abc', '')).toBe('');
    expect(minWindow('aaflslflsldkalskaaa', 'aaa')).toBe('aaa');
  });
  it('trace matches impl', () => {
    const inputs = [defaultInput(mod), ...(mod.meta.presets ?? []).map((p) => p.values), { s: '', t: 'a' }, { s: 'a', t: '' }, { s: 'bba', t: 'ab' }];
    checkModule(mod, inputs);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
