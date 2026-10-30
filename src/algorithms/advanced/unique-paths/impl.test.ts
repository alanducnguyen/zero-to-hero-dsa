import { describe, it, expect } from 'vitest';
import { uniquePathsWithObstacles } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

const empty = (m: number, n: number) => Array.from({ length: m }, () => new Array<number>(n).fill(0));
/** C(a, b) */
const binom = (a: number, b: number) => {
  let r = 1;
  for (let k = 1; k <= b; k++) r = (r * (a - b + k)) / k;
  return r;
};

describe('unique-paths', () => {
  it('counts paths with obstacles', () => {
    expect(uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]])).toBe(2);
    expect(uniquePathsWithObstacles([[0, 1], [0, 0]])).toBe(1);
    expect(uniquePathsWithObstacles([[1]])).toBe(0);
    expect(uniquePathsWithObstacles([[0]])).toBe(1);
    expect(uniquePathsWithObstacles([[0, 0], [0, 1]])).toBe(0);
    expect(uniquePathsWithObstacles([[0, 0, 1], [0, 1, 0], [1, 0, 0]])).toBe(0);
    expect(uniquePathsWithObstacles([])).toBe(0);
    expect(uniquePathsWithObstacles([[]])).toBe(0);
  });
  it('matches C(m+n-2, m-1) without obstacles', () => {
    for (let m = 1; m <= 6; m++) for (let n = 1; n <= 7; n++) expect(uniquePathsWithObstacles(empty(m, n))).toBe(binom(m + n - 2, m - 1));
    expect(uniquePathsWithObstacles(empty(3, 7))).toBe(28);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), ...(mod.meta.presets ?? []).map((p) => p.values), { grid: [[1]] }, { grid: [[0]] }, { grid: [] }]);
  });
});
