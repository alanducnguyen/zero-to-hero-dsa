## Cách trình bày trong phỏng vấn

1. Xác định **thông tin chảy hướng nào**: cha→con (pre), con→cha (post), cần thứ tự (in), cần tầng (BFS). Nói lý do chọn trước khi code.
2. Viết hàm đệ quy với base case `null` ở dòng đầu.
3. Nêu O(n) thời gian, O(h) bộ nhớ, và nhắc "nếu cây lệch, h = n; tôi có thể chuyển sang lặp với stack".
4. Với BFS, dùng con trỏ `head` hoặc xử lý theo `size` để trả từng tầng.

## Ba mẫu lặp nên thuộc

```ts
// Inorder lặp
function inorderIter(root: TreeNode | null): number[] {
  const out: number[] = [], st: TreeNode[] = [];
  let cur = root;
  while (cur || st.length) {
    while (cur) { st.push(cur); cur = cur.left; } // đi hết bên trái
    cur = st.pop()!;
    out.push(cur.val);
    cur = cur.right;
  }
  return out;
}

// Preorder lặp: push phải trước, trái sau để trái được pop trước
// Postorder lặp: preorder biến thể (gốc, phải, trái) rồi đảo ngược kết quả

// BFS theo tầng
function levelOrder(root: TreeNode | null): number[][] {
  const res: number[][] = [];
  const q: TreeNode[] = root ? [root] : [];
  let head = 0;
  while (head < q.length) {
    const size = q.length - head, level: number[] = [];
    for (let i = 0; i < size; i++) {
      const n = q[head++]; level.push(n.val);
      if (n.left) q.push(n.left);
      if (n.right) q.push(n.right);
    }
    res.push(level);
  }
  return res;
}
```

## Câu hỏi follow-up thường gặp

- **Viết inorder không đệ quy?** Mẫu trên: đi trái hết, pop, thăm, sang phải.
- **Postorder không đệ quy?** Hai stack, hoặc preorder (gốc, phải, trái) rồi đảo; hoặc một stack với con trỏ `lastVisited`.
- **O(1) bộ nhớ?** Morris traversal: tạo liên kết tạm từ node cực phải của cây con trái về gốc.
- **Validate BST?** Inorder phải tăng ngặt; hoặc preorder truyền khoảng `(min, max)`.
- **Max depth?** Postorder: `1 + max(depth(l), depth(r))`. BFS đếm tầng.
- **Dựng lại cây từ hai thứ tự?** Pre+in: phần tử đầu pre là gốc, tìm trong in để chia trái/phải. Chỉ một thứ tự thì không đủ (trừ khi có null marker).
- **Cây 10⁶ node lệch, đệ quy tràn stack?** Chuyển sang stack tường minh hoặc Morris.
- **Serialize cây?** Preorder với `#` cho null; hoặc BFS kiểu LeetCode.
- **Khác nhau giữa DFS cây và DFS đồ thị?** Đồ thị cần `visited` vì có chu trình; cây thì không.

## Checklist nhận diện pattern

- "Theo tầng", "độ sâu nhỏ nhất", "nhìn từ bên phải", "zigzag" ⇒ BFS.
- "Chiều cao", "cân bằng", "đường kính", "tổng cây con", "xoá" ⇒ postorder (con trước cha).
- "Đường đi từ gốc", "serialize", "sao chép", "truyền giới hạn" ⇒ preorder.
- "BST", "phần tử nhỏ thứ k", "dãy tăng" ⇒ inorder.

## Bài luyện tập liên quan

- 94/144/145 Inorder/Preorder/Postorder Traversal (làm cả đệ quy và lặp), 102 Level Order.
- 104 Maximum Depth, 110 Balanced Binary Tree, 543 Diameter (postorder).
- 98 Validate BST, 230 Kth Smallest in BST (inorder).
- 199 Right Side View, 103 Zigzag, 111 Minimum Depth (BFS).
- 105 Construct from Preorder and Inorder, 297 Serialize and Deserialize (Hard).
