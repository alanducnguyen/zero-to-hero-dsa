export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/** Preorder: gốc → trái → phải. */
export function preorder(root: TreeNode | null, out: number[] = []): number[] {
  if (root === null) return out;
  out.push(root.val);
  preorder(root.left, out);
  preorder(root.right, out);
  return out;
}

/** Inorder: trái → gốc → phải (BST cho dãy tăng dần). */
export function inorder(root: TreeNode | null, out: number[] = []): number[] {
  if (root === null) return out;
  inorder(root.left, out);
  out.push(root.val);
  inorder(root.right, out);
  return out;
}

/** Postorder: trái → phải → gốc (xử lý con trước cha). */
export function postorder(root: TreeNode | null, out: number[] = []): number[] {
  if (root === null) return out;
  postorder(root.left, out);
  postorder(root.right, out);
  out.push(root.val);
  return out;
}

/** BFS / level-order: duyệt theo từng tầng bằng queue. */
export function levelOrder(root: TreeNode | null): number[] {
  const out: number[] = [];
  if (root === null) return out;
  const queue: TreeNode[] = [root];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    out.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return out;
}

/** Tạo cây từ mảng level-order kiểu LeetCode, null = không có node. */
export function fromLevelOrder(values: (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] === null) return null;
  const root: TreeNode = { val: values[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;
  for (let head = 0; head < queue.length && i < values.length; head++) {
    const node = queue[head];
    const l = values[i++];
    if (l !== null && l !== undefined) queue.push((node.left = { val: l, left: null, right: null }));
    const r = values[i++];
    if (r !== null && r !== undefined) queue.push((node.right = { val: r, left: null, right: null }));
  }
  return root;
}
