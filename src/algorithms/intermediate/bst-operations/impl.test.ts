import { describe, it, expect } from 'vitest';
import { insert, remove, search, type TreeNode } from './impl';
import { toLevelOrder } from './node';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('bst-operations', () => {
  it('insert/search/delete', () => {
    let root: TreeNode | null = null;
    for (const v of [8, 3, 10, 1, 6, 14, 4]) root = insert(root, v);
    expect(toLevelOrder(root)).toEqual([8, 3, 10, 1, 6, null, 14, null, null, 4]);
    expect(search(root, 6)).toBe(true);
    expect(search(root, 7)).toBe(false);
    root = remove(root, 3); // 2 con ⇒ successor 4
    expect(toLevelOrder(root)).toEqual([8, 4, 10, 1, 6, null, 14]);
    root = remove(root, 8); // gốc 2 con ⇒ successor 10
    expect(toLevelOrder(root)).toEqual([10, 4, 14, 1, 6]);
    root = remove(root, 1); // lá
    root = remove(root, 99); // không có
    expect(toLevelOrder(root)).toEqual([10, 4, 14, null, 6]);
    expect(remove(null, 1)).toBeNull();
  });
  it('trace matches impl', () => {
    checkModule(mod, [defaultInput(mod), { ops: [] }, { ops: ['delete 1', 'search 1', 'insert 5', 'insert 5', 'delete 5', 'bogus'] }, ...(mod.meta.presets ?? []).map((p) => p.values)]);
  });
});
