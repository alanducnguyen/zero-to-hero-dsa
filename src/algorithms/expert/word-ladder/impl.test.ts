import { describe, it, expect } from 'vitest';
import { ladderLength } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('word-ladder', () => {
  it('finds shortest transformation length', () => {
    expect(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])).toBe(5);
    expect(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log'])).toBe(0);
    expect(ladderLength('a', 'c', ['a', 'b', 'c'])).toBe(2);
    expect(ladderLength('hot', 'dog', ['hot', 'dog'])).toBe(0);
    expect(ladderLength('cat', 'dog', ['cot', 'cog', 'dig', 'dog'])).toBe(4);
    expect(ladderLength('cold', 'warm', ['cord', 'card', 'ward', 'warm', 'wold', 'word', 'worm', 'corm'])).toBe(5);
    expect(ladderLength('abc', 'abd', [])).toBe(0);
  });
  it('trace matches impl', () => {
    const inputs = [
      defaultInput(mod),
      ...(mod.meta.presets ?? []).map((p) => p.values),
      { beginWord: 'a', endWord: 'c', wordList: ['a', 'b', 'c'] },
      { beginWord: 'hot', endWord: 'dog', wordList: ['hot', 'dog', 'dogs'] },
      { beginWord: 'abc', endWord: 'abd', wordList: [] },
    ];
    checkModule(mod, inputs);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
