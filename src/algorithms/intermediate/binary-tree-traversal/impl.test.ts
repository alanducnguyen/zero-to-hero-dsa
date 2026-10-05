import { describe, it, expect } from 'vitest';
import { fromLevelOrder, inorder, levelOrder, postorder, preorder } from './impl';
import mod from './index';
import { checkModule, defaultInput } from '@/engine/testUtils';

describe('binary-tree-traversal', () => {
  const t = fromLevelOrder([1, 2, 3, 4, 5, null, 6]);
  it('traversals', () => {
    expect(preorder(t)).toEqual([1, 2, 4, 5, 3, 6]);
    expect(inorder(t)).toEqual([4, 2, 5, 1, 3, 6]);
    expect(postorder(t)).toEqual([4, 5, 2, 6, 3, 1]);
    expect(levelOrder(t)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(preorder(null)).toEqual([]);
    expect(levelOrder(null)).toEqual([]);
    expect(inorder(fromLevelOrder([1, null, 2, null, 3]))).toEqual([1, 2, 3]);
  });
  it('trace matches impl', () => {
    checkModule(mod, [
      defaultInput(mod),
      { tree: [], order: 'preorder' },
      { tree: [], order: 'bfs' },
      { tree: ['7'], order: 'inorder' },
      ...(mod.meta.presets ?? []).map((p) => p.values),
    ]);
  });
});
