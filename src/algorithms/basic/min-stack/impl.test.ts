import { describe, it, expect } from 'vitest';
import { MinStack } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';
describe('min-stack', () => {
  it('tracks min', () => {
    const s = new MinStack();
    s.push(5); s.push(3); s.push(7);
    expect(s.getMin()).toBe(3); expect(s.top()).toBe(7);
    s.pop(); expect(s.getMin()).toBe(3);
    s.push(2); expect(s.getMin()).toBe(2);
    s.pop(); s.pop(); expect(s.getMin()).toBe(5);
    s.pop(); expect(s.getMin()).toBeUndefined();
    s.push(2); s.push(2); s.pop(); expect(s.getMin()).toBe(2);
  });
  it('trace matches impl', () => { checkModule(mod, [defaultInput(mod), { ops: [] }, { ops: ['pop', 'getMin', 'top', 'push 1', 'bad'] }, ...(mod.meta.presets ?? []).map((p) => p.values)]); });
});
