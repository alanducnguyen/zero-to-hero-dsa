import { describe, it, expect } from 'vitest';
import { editDistance } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('edit-distance', () => {
  it('computes levenshtein', () => {
    expect(editDistance('horse', 'ros')).toBe(3);
    expect(editDistance('intention', 'execution')).toBe(5);
    expect(editDistance('', 'abc')).toBe(3);
    expect(editDistance('abc', '')).toBe(3);
    expect(editDistance('abc', 'abc')).toBe(0);
    expect(editDistance('', '')).toBe(0);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { a: '', b: '' }, { a: 'a', b: 'b' }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
