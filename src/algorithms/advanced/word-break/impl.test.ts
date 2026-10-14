import { describe, it, expect } from 'vitest';
import { wordBreak } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('word-break', () => {
  it('decides segmentation', () => {
    expect(wordBreak('leetcode', ['leet', 'code'])).toBe(true);
    expect(wordBreak('applepenapple', ['apple', 'pen'])).toBe(true);
    expect(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])).toBe(false);
    expect(wordBreak('', ['a'])).toBe(true);
    expect(wordBreak('a', [])).toBe(false);
    expect(wordBreak('aaaa', ['aa'])).toBe(true);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { s: 'a', wordDict: [] }, { s: 'ab', wordDict: ['a', 'b'] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
