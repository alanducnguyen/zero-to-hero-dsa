import type { TreeNode } from '../../shared';

/** Inorder đệ quy, đếm node khi thăm và dừng ngay ở node thứ k. O(h + k) thời gian, O(h) call stack. */
export function kthSmallest(root: TreeNode | null, k: number): number {
  let count = 0;
  let result = -1;
  const inorder = (node: TreeNode | null): boolean => {
    if (node === null) return false;
    if (inorder(node.left)) return true; // đã tìm thấy bên trái ⇒ cắt mọi nhánh còn lại
    count++;
    if (count === k) { result = node.val; return true; }
    return inorder(node.right);
  };
  inorder(root);
  return result;
}
