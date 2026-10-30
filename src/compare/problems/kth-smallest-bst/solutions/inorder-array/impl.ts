import type { TreeNode } from '../../shared';

/** Inorder toàn bộ cây vào mảng (BST ⇒ dãy tăng dần) rồi lấy phần tử k − 1. O(n) thời gian, O(n) bộ nhớ. */
export function kthSmallest(root: TreeNode | null, k: number): number {
  const sorted: number[] = [];
  const inorder = (node: TreeNode | null): void => {
    if (node === null) return;
    inorder(node.left);
    sorted.push(node.val); // trái → gốc → phải ⇒ tăng dần
    inorder(node.right);
  };
  inorder(root);
  return k >= 1 && k <= sorted.length ? sorted[k - 1] : -1;
}
