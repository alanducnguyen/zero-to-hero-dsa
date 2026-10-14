import { describe, it, expect } from 'vitest';
import { rabinKarp } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('rabin-karp', () => {
  it('finds all occurrences, including overlapping', () => {
    expect(rabinKarp('abracadabra', 'abra')).toEqual([0, 7]);
    expect(rabinKarp('aaaaa', 'aa')).toEqual([0, 1, 2, 3]);
    expect(rabinKarp('hello world', 'xyz')).toEqual([]);
    expect(rabinKarp('abc', '')).toEqual([]);
    expect(rabinKarp('ab', 'abc')).toEqual([]);
    expect(rabinKarp('abc', 'abc')).toEqual([0]);
  });
  it('is correct even with a tiny modulus (many spurious hits)', () => {
    const text = 'abcdabcxabcd';
    for (const mod of [2, 3, 7, 13]) expect(rabinKarp(text, 'abcd', 31, mod)).toEqual([0, 8]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { text: '', pattern: 'a', mod: 101 }, { text: 'a', pattern: 'a', mod: 2 }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
