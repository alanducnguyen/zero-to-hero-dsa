import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PRESETS } from './presets';
import { generate } from './scenario';
import { simulate } from './simulate';

function run(scenarioId: string) {
  const sc = PRESETS.find((p) => p.id === scenarioId)!;
  const frames = [];
  const gen = simulate(sc);
  let r = gen.next();
  while (!r.done) { frames.push(r.value); r = gen.next(); if (frames.length > 4000) throw new Error('too many frames'); }
  return { frames, output: r.value as string[], source: generate(sc).source };
}

describe('event loop simulator', () => {
  it('classic order', () => {
    expect(run('classic-order').output).toEqual(['start', 'end', 'nextTick', 'promise', 'timeout', 'immediate']);
  });
  it('nextTick vs promise nesting', () => {
    expect(run('nexttick-vs-promise').output).toEqual(['sync', 't1', 't2', 'p1', 'p2', 'promise trong t1', 'tick trong p1']);
  });
  it('inside io: immediate before timeout', () => {
    expect(run('inside-io').output).toEqual(['start', 'end', 'io done', 'immediate', 'timeout']);
  });
  it('blocking delays timer but order holds', () => {
    expect(run('blocking').output).toEqual(['start', 'end', 'timer 100ms']);
  });
  it('many timers by due then registration', () => {
    expect(run('many-timers').output).toEqual(['sync', 't10a', 't10b', 't30', 't50']);
  });
  it('microtask starvation', () => {
    expect(run('microtask-starvation').output).toEqual(['sync', 'p1', 'p2', 'p3', 'timeout']);
  });
  it('multi iteration', () => {
    expect(run('multi-iteration').output).toEqual(['sync', 'A', 'B (immediate trong A)', 'C (timeout trong A)']);
  });
  it('frames reference valid lines', () => {
    for (const p of PRESETS) {
      const { frames, source } = run(p.id);
      const n = source.split('\n').length;
      expect(frames.length).toBeGreaterThan(3);
      for (const fr of frames) { expect(fr.line).toBeGreaterThanOrEqual(1); expect(fr.line).toBeLessThanOrEqual(n); }
    }
  });
  it('matches real Node output for deterministic presets', () => {
    const dir = mkdtempSync(join(tmpdir(), 'evloop-'));
    for (const p of PRESETS) {
      const { output, source } = run(p.id);
      const file = join(dir, `${p.id}.js`);
      writeFileSync(file, source);
      const real = execFileSync(process.execPath, [file], { encoding: 'utf8' }).trim().split('\n');
      if (p.nondeterministic) {
        const swapped = [...output];
        const i = swapped.indexOf('timeout'), j = swapped.indexOf('immediate');
        [swapped[i], swapped[j]] = [swapped[j], swapped[i]];
        expect([output, swapped]).toContainEqual(real);
      } else {
        expect(real, p.id).toEqual(output);
      }
    }
  });
});
