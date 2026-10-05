import { describe, it, expect } from 'vitest';
import { DECISION_TREE, PATTERNS, patternById } from './patterns';
import { byId } from './registry';

describe('patterns catalog', () => {
  it('has unique ids and complete sections', () => {
    const ids = PATTERNS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of PATTERNS) {
      expect(p.signals.length).toBeGreaterThanOrEqual(3);
      expect(p.avoid.length).toBeGreaterThanOrEqual(1);
      expect(p.steps.length).toBeGreaterThanOrEqual(2);
      expect(p.template.trim().length).toBeGreaterThan(20);
      expect(p.realWorld.length).toBeGreaterThanOrEqual(2);
      expect(p.leetcode.length).toBeGreaterThanOrEqual(3);
    }
  });
  it('references only existing algorithms', () => {
    for (const p of PATTERNS) for (const id of p.algorithms) expect(byId.has(id), `${p.id} → ${id}`).toBe(true);
  });
  it('decision tree references existing patterns', () => {
    for (const q of DECISION_TREE) for (const o of q.options) for (const pid of o.patterns) expect(patternById.has(pid), pid).toBe(true);
  });
  it('every algorithm belongs to at least one pattern', () => {
    const covered = new Set(PATTERNS.flatMap((p) => p.algorithms));
    const missing = [...byId.keys()].filter((id) => !covered.has(id));
    expect(missing).toEqual([]);
  });
});
