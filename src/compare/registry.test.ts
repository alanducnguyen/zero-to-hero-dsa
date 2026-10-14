import { describe, expect, it } from 'vitest';
import { PROBLEMS } from './registry';
import { toModule } from './toModule';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('compare registry', () => {
  it('has unique ids and well-formed problems', () => {
    const ids = PROBLEMS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of PROBLEMS) {
      expect(p.solutions.length).toBeGreaterThanOrEqual(3);
      const ranks = p.solutions.map((s) => s.rank).sort((a, b) => a - b);
      expect(ranks).toEqual(p.solutions.map((_, i) => i + 1));
      expect(new Set(p.solutions.map((s) => s.id)).size).toBe(p.solutions.length);
      expect(p.statement.trim().length).toBeGreaterThan(200);
      expect(p.comparison.trim().length).toBeGreaterThan(200);
      expect(p.interview.trim().length).toBeGreaterThan(200);
      expect(p.presets?.length ?? 0).toBeGreaterThanOrEqual(1);
      for (const s of p.solutions) {
        expect(s.pros.length).toBeGreaterThan(0);
        expect(s.cons.length).toBeGreaterThan(0);
      }
    }
  });

  for (const p of PROBLEMS) {
    describe(p.id, () => {
      const inputs = [defaultInput(toModule(p, p.solutions[0])), ...(p.presets ?? []).map((pr) => pr.values)];
      for (const s of p.solutions) {
        it(`${s.id}: trace matches impl`, () => {
          checkModule(toModule(p, s), inputs);
        });
      }
      it('all solutions agree', () => {
        for (const input of inputs) {
          const expected = p.solutions[0].run(structuredClone(input));
          for (const s of p.solutions) expect(s.run(structuredClone(input)), `${s.id} on ${JSON.stringify(input)}`).toEqual(expected);
        }
      });
    });
  }
});
