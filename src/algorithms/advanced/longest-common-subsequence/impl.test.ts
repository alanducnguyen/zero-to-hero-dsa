import { describe, it, expect } from 'vitest';
import { longestCommonSubsequence } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('longest-common-subsequence', () => {
  it('computes LCS length and one valid subsequence', () => {
    expect(longestCommonSubsequence('abcde', 'ace')).toEqual({ length: 3, lcs: 'ace' });
    expect(longestCommonSubsequence('AGGTAB', 'GXTXAYB').length).toBe(4);
    expect(longestCommonSubsequence('abc', 'def')).toEqual({ length: 0, lcs: '' });
    expect(longestCommonSubsequence('', 'abc')).toEqual({ length: 0, lcs: '' });
    expect(longestCommonSubsequence('abcd', 'abcd')).toEqual({ length: 4, lcs: 'abcd' });
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { a: '', b: '' }, { a: 'a', b: 'a' }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
