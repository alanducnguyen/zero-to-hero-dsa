import { describe, it, expect } from 'vitest';
import { accountsMerge } from './impl';
import { parseAccounts } from './node';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

describe('accounts-merge', () => {
  it('merges LeetCode example', () => {
    expect(
      accountsMerge([
        ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
        ['John', 'johnsmith@mail.com', 'john00@mail.com'],
        ['Mary', 'mary@mail.com'],
        ['John', 'johnnybravo@mail.com'],
      ]),
    ).toEqual([
      ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],
      ['John', 'johnnybravo@mail.com'],
      ['Mary', 'mary@mail.com'],
    ]);
  });
  it('handles transitive merge, duplicates and edge cases', () => {
    expect(accountsMerge([])).toEqual([]);
    expect(accountsMerge([['A', 'x@a', 'x@a']])).toEqual([['A', 'x@a']]);
    expect(accountsMerge([['Ann', 'a', 'b'], ['Ann', 'c', 'd'], ['Ann', 'b', 'c']])).toEqual([['Ann', 'a', 'b', 'c', 'd']]);
    expect(accountsMerge([['Alex', 'a1'], ['Alex', 'a2']])).toEqual([['Alex', 'a1'], ['Alex', 'a2']]);
  });
  it('parses input lines', () => {
    expect(parseAccounts(['John: a@x , b@x', 'bad', ':x', 'Empty:'])).toEqual([['John', 'a@x', 'b@x']]);
  });
  it('trace matches impl', () => {
    const inputs = [defaultInput(mod), ...(mod.meta.presets ?? []).map((p) => p.values), { accounts: [] }, { accounts: ['A:x@a,x@a'] }];
    checkModule(mod, inputs);
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
  });
});
