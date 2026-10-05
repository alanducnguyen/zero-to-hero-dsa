export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/** Chèn vào BST: đi trái nếu nhỏ hơn, phải nếu lớn hơn, tới chỗ trống thì tạo node. */
export function insert(root: TreeNode | null, val: number): TreeNode {
  if (root === null) return { val, left: null, right: null };
  if (val < root.val) root.left = insert(root.left, val);
  else if (val > root.val) root.right = insert(root.right, val);
  return root; // bằng ⇒ bỏ qua (không trùng)
}

/** Tìm kiếm: mỗi bước loại một nửa cây. */
export function search(root: TreeNode | null, val: number): boolean {
  let node = root;
  while (node !== null) {
    if (val === node.val) return true;
    node = val < node.val ? node.left : node.right;
  }
  return false;
}

/** Xoá: 0 con ⇒ bỏ; 1 con ⇒ nối con lên; 2 con ⇒ thay bằng successor (min bên phải). */
export function remove(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null) return null;
  if (val < root.val) {
    root.left = remove(root.left, val);
  } else if (val > root.val) {
    root.right = remove(root.right, val);
  } else {
    if (root.left === null) return root.right; // 0 hoặc 1 con
    if (root.right === null) return root.left;
    let succ = root.right; // 2 con: successor = min của cây phải
    while (succ.left !== null) succ = succ.left;
    root.val = succ.val; // chép giá trị successor lên
    root.right = remove(root.right, succ.val); // xoá successor (có tối đa 1 con)
  }
  return root;
}
