export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/** Chèn vào BST (bỏ qua giá trị trùng) – dùng để dựng cây từ mảng đầu vào. */
export function insert(root: TreeNode | null, val: number): TreeNode {
  if (root === null) return { val, left: null, right: null };
  if (val < root.val) root.left = insert(root.left, val);
  else if (val > root.val) root.right = insert(root.right, val);
  return root;
}

/**
 * Kth Smallest in BST – inorder lặp với stack tường minh.
 * Inorder của BST cho dãy tăng dần ⇒ node thứ k được pop chính là đáp án.
 * Trả về -1 nếu k nằm ngoài [1, n].
 */
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
    node = node.right; // xong node, chuyển sang cây con phải
  }
  return -1;
}
