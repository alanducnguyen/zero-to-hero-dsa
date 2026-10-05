import { describe, it, expect } from 'vitest';
import { QueueTwoStacks } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('queue-two-stacks', () => {
  it('is FIFO', () => {
    const q = new QueueTwoStacks<number>();
    expect(q.pop()).toBeUndefined();
    q.push(1); q.push(2); q.push(3);
    expect(q.pop()).toBe(1);
    q.push(4);
    expect(q.peek()).toBe(2);
    expect(q.pop()).toBe(2);
    expect(q.pop()).toBe(3);
    expect(q.pop()).toBe(4);
    expect(q.pop()).toBeUndefined();
    expect(q.size).toBe(0);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { ops: [] }, { ops: ['peek', 'push 7', 'garbage', 'peek'] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
