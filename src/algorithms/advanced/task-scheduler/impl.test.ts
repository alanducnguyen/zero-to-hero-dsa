import { describe, it, expect } from 'vitest';
import { leastInterval } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
import { runTrace } from '@/engine/runner';

/** Brute force: tìm kiếm mọi lịch (chọn task sẵn sàng hoặc idle mỗi bước), memo theo trạng thái. */
function brute(tasks: string, n: number): number {
  const keys = [...new Set(tasks)];
  const counts = keys.map((k) => [...tasks].filter((t) => t === k).length);
  const memo = new Map<string, number>();
  const go = (cnt: number[], cool: number[]): number => {
    if (cnt.every((c) => c === 0)) return 0;
    const key = cnt.join(',') + '|' + cool.join(',');
    const hit = memo.get(key);
    if (hit !== undefined) return hit;
    const tick = (c: number[]) => c.map((x) => Math.max(0, x - 1));
    let best = cool.some((c) => c > 0) ? 1 + go(cnt, tick(cool)) : Infinity; // idle chỉ có ích khi có task đang nghỉ
    for (let i = 0; i < cnt.length; i++) {
      if (cnt[i] > 0 && cool[i] === 0) {
        const nc = [...cnt];
        nc[i]--;
        const ncool = tick(cool);
        ncool[i] = n;
        best = Math.min(best, 1 + go(nc, ncool));
      }
    }
    memo.set(key, best);
    return best;
  };
  return go(counts, counts.map(() => 0));
}

describe('task-scheduler', () => {
  it('computes minimum intervals', () => {
    expect(leastInterval('AAABBB', 2)).toBe(8);
    expect(leastInterval('AAABBB', 0)).toBe(6);
    expect(leastInterval('AAAAAABCDEFG', 2)).toBe(16);
    expect(leastInterval('AAABCDEFG', 2)).toBe(9);
    expect(leastInterval('AAABBC', 2)).toBe(7);
    expect(leastInterval('A', 5)).toBe(1);
    expect(leastInterval('', 3)).toBe(0);
    expect(leastInterval('AAA', 3)).toBe(9);
  });
  it('matches brute-force search on random small inputs', () => {
    for (let t = 0; t < 200; t++) {
      const len = 1 + Math.floor(Math.random() * 7);
      const s = Array.from({ length: len }, () => 'ABC'[Math.floor(Math.random() * 3)]).join('');
      const n = Math.floor(Math.random() * 4);
      expect(leastInterval(s, n)).toBe(brute(s, n));
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      { tasks: '', n: 2 },
      { tasks: 'A', n: 0 },
      { tasks: 'ABCDEFGH', n: 1 },
      { tasks: 'AABBCCDD', n: 1 },
      ...(mod.meta.presets ?? []).map((p) => p.values),
    ]);
    const res = runTrace(mod, defaultInput(mod));
    expect(res.frames.length).toBeLessThan(300);
  });
});
