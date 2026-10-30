import { describe, it, expect } from 'vitest';
import { middleOfLinkedList } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('middle-of-linked-list', () => {
  it('finds middle (second middle when even)', () => {
    expect(middleOfLinkedList([1, 2, 3, 4, 5])).toBe(3);
    expect(middleOfLinkedList([1, 2, 3, 4, 5, 6])).toBe(4);
    expect(middleOfLinkedList([7])).toBe(7);
    expect(middleOfLinkedList([3, 8])).toBe(8);
    expect(middleOfLinkedList([])).toBeNull();
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { values: [] }, { values: [1] }, { values: [1, 2] }, { values: [1, 2, 3, 4, 5, 6] }]);
  });
});
