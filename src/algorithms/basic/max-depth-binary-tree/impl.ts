export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/** Chèn vào BST (bỏ qua giá trị trùng) – chỉ dùng để dựng cây từ mảng đầu vào. */
export function insert(root: TreeNode | null, val: number): TreeNode {
  if (root === null) return { val, left: null, right: null };
  if (val < root.val) root.left = insert(root.left, val);
  else if (val > root.val) root.right = insert(root.right, val);
  return root;
}

/**
 * Maximum Depth of Binary Tree (LC 104) – DFS đệ quy (postorder).
 * Độ sâu của cây = 1 (chính node gốc) + độ sâu lớn hơn trong hai cây con.
 * @param root gốc cây (null = cây rỗng, độ sâu 0)
 * @returns số node trên đường đi dài nhất từ gốc tới một lá
 */
export function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0; // cây rỗng: không có node nào
  const left = maxDepth(root.left); // độ sâu cây con trái
  const right = maxDepth(root.right); // độ sâu cây con phải
  return 1 + Math.max(left, right); // +1 cho chính node hiện tại
}
