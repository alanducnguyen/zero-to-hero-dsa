export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/**
 * Lowest Common Ancestor của cây nhị phân (không phải BST) – postorder một lượt.
 * Mỗi node trả về: null nếu cây con không chứa p/q; node p/q nếu gặp; hoặc LCA nếu cả hai nhánh đều có.
 */
export function lowestCommonAncestor(root: TreeNode | null, p: number, q: number): TreeNode | null {
  if (root === null) return null;
  if (root.val === p || root.val === q) return root; // gặp p hoặc q ⇒ báo lên trên
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left !== null && right !== null) return root; // mỗi bên một đứa ⇒ root là LCA
  return left ?? right; // cả hai ở một bên (hoặc không có) ⇒ chuyển tiếp kết quả bên đó
}

/** Tạo cây từ mảng level-order kiểu LeetCode (null = rỗng). */
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
