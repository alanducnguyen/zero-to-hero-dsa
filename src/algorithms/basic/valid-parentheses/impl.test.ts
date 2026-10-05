import { describe, it, expect } from 'vitest';
import { isValidParentheses } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('valid-parentheses', () => {
  it('validates', () => {
    expect(isValidParentheses('()[]{}')).toBe(true);
    expect(isValidParentheses('{[()]}')).toBe(true);
    expect(isValidParentheses('')).toBe(true);
    expect(isValidParentheses('([)]')).toBe(false);
    expect(isValidParentheses('(')).toBe(false);
    expect(isValidParentheses(')')).toBe(false);
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { s: '' }, { s: '([)]' }, { s: '((' }, { s: ')' }]);
  });
});
