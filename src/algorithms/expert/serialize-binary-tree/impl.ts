export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/**
 * Serialize and Deserialize Binary Tree (LeetCode 297) – preorder DFS.
 * Mỗi node ghi giá trị, mỗi con rỗng ghi "#" ⇒ chuỗi xác định DUY NHẤT một cây.
 * Ví dụ: cây 1(2, 3(4, 5)) ⇒ "1,2,#,#,3,4,#,#,5,#,#".
 */
export function serialize(root: TreeNode | null): string {
  const out: string[] = [];
  function dfs(node: TreeNode | null): void {
    if (node === null) {
      out.push('#'); // ghi rõ chỗ trống để biết nhánh kết thúc ở đâu
      return;
    }
    out.push(String(node.val)); // gốc trước (preorder)
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return out.join(',');
}

/** Đọc lại theo đúng thứ tự preorder, con trỏ i chỉ tiến (mỗi token tiêu thụ đúng 1 lần). */
export function deserialize(data: string): TreeNode | null {
  const tokens = data.split(',');
  let i = 0;
  function build(): TreeNode | null {
    const t = tokens[i++];
    if (t === '#' || t === undefined) return null; // chỗ trống ⇒ nhánh rỗng
    const node: TreeNode = { val: Number(t), left: null, right: null };
    node.left = build(); // các token kế tiếp mô tả trọn cây con trái
    node.right = build(); // phần còn lại sau đó là cây con phải
    return node;
  }
  return build();
}
