import { describe, it, expect } from 'vitest';
import { fromArray, reverseList, toArray } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('reverse-linked-list', () => {
  it('reverses', () => {
    expect(toArray(reverseList(fromArray([1, 2, 3, 4, 5])))).toEqual([5, 4, 3, 2, 1]);
    expect(toArray(reverseList(fromArray([])))).toEqual([]);
    expect(toArray(reverseList(fromArray([1])))).toEqual([1]);
    expect(toArray(reverseList(fromArray([1, 2])))).toEqual([2, 1]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { values: [] }, { values: [7] }, { values: [1, 2] }]);
  });
});
