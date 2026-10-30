import { describe, it, expect } from 'vitest';
import { canCompleteCircuit } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

/** brute force O(n²) để đối chiếu */
function brute(gas: number[], cost: number[]): number {
  const n = gas.length;
  for (let s = 0; s < n; s++) {
    let tank = 0;
    let ok = true;
    for (let k = 0; k < n; k++) {
      const i = (s + k) % n;
      tank += gas[i] - cost[i];
      if (tank < 0) { ok = false; break; }
    }
    if (ok) return s;
  }
  return -1;
}

describe('gas-station', () => {
  it('finds start station', () => {
    expect(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])).toBe(3);
    expect(canCompleteCircuit([2, 3, 4], [3, 4, 3])).toBe(-1);
    expect(canCompleteCircuit([5], [4])).toBe(0);
    expect(canCompleteCircuit([1], [2])).toBe(-1);
    expect(canCompleteCircuit([0, 0], [0, 0])).toBe(0);
    expect(canCompleteCircuit([5, 1, 2, 3], [4, 2, 1, 3])).toBe(0);
    expect(canCompleteCircuit([3, 1, 1, 5, 2, 4], [4, 2, 3, 1, 3, 1])).toBe(3);
  });
  it('matches brute force on random inputs', () => {
    let seed = 7;
    const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) % 6;
    for (let t = 0; t < 300; t++) {
      const n = 1 + (t % 7);
      const gas = Array.from({ length: n }, rnd);
      const cost = Array.from({ length: n }, rnd);
      const r = canCompleteCircuit(gas, cost);
      // LeetCode đảm bảo nghiệm duy nhất; với input ngẫu nhiên chỉ kiểm tra tồn tại và hợp lệ
      expect(r === -1).toBe(brute(gas, cost) === -1);
      if (r !== -1) {
        let tank = 0;
        for (let k = 0; k < n; k++) { const i = (r + k) % n; tank += gas[i] - cost[i]; expect(tank).toBeGreaterThanOrEqual(0); }
      }
    }
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), ...(mod.meta.presets ?? []).map((p) => p.values), { gas: [5], cost: [4] }, { gas: [1], cost: [2] }]);
  });
});
