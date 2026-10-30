import type { TreeNode } from '../../shared';

/** Inorder lặp với stack tường minh, pop node thứ k là đáp án. O(h + k) thời gian, O(h) bộ nhớ heap, không đệ quy. */
export function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let node = root;
  let count = 0;
  while (node !== null || stack.length > 0) {
    while (node !== null) {
      stack.push(node); // để dành node, đi trái trước vì bên trái nhỏ hơn
      node = node.left;
    }
    node = stack.pop()!; // node nhỏ nhất chưa thăm
    count++;
    if (count === k) return node.val;
    node = node.right;
  }
  return -1;
}
