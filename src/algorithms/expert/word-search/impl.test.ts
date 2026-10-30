import { describe, it, expect } from 'vitest';
import { exist } from './impl';
import mod from './index';
import { runTrace } from '@/engine/runner';
import { checkModule, defaultInput } from '@/engine/testUtils';

const B = ['ABCE', 'SFCS', 'ADEE'];

describe('word-search', () => {
  it('finds words', () => {
    expect(exist(B, 'ABCCED')).toBe(true);
    expect(exist(B, 'SEE')).toBe(true);
    expect(exist(B, 'ABCB')).toBe(false); // không dùng lại ô B
    expect(exist(['AAA', 'AAB'], 'AAAAB')).toBe(true);
    expect(exist(['A'], 'A')).toBe(true);
    expect(exist(['A'], 'AA')).toBe(false);
    expect(exist(['A'], '')).toBe(true);
    expect(exist([], 'A')).toBe(false);
    expect(exist(['AB', 'CD'], 'ABDC')).toBe(true);
    expect(exist(['AB', 'CD'], 'ABCD')).toBe(false); // chéo không tính
  });
  it('restores the board', () => {
    const board = [...B];
    exist(board, 'ABCCED');
    expect(board).toEqual(B);
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      ...(mod.meta.presets ?? []).map((p) => p.values),
      { board: ['A'], word: '' },
      { board: [], word: 'A' },
      { board: ['AB', 'CD'], word: 'ABCD' },
    ]);
  });
  it('default input stays small', () => {
    expect(runTrace(mod, defaultInput(mod)).frames.length).toBeLessThanOrEqual(300);
    for (const p of mod.meta.presets ?? []) expect(runTrace(mod, p.values).frames.length).toBeLessThanOrEqual(300);
  });
});
