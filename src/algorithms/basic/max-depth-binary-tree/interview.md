## Cách trình bày trong phỏng vấn

1. Làm rõ định nghĩa: độ sâu tính theo **số node** hay **số cạnh**? Cây rỗng trả về gì (`0`)?
2. Phát biểu đệ quy: `depth(null) = 0`, `depth(x) = 1 + max(depth(x.left), depth(x.right))`. Giải thích vì sao đây là postorder.
3. Viết 3–4 dòng code, chạy tay một cây nhỏ (lá trả 1, cha của lá trả 2…).
4. Chốt `O(n)` thời gian, `O(h)` bộ nhớ – nhấn mạnh trường hợp xấu cây lệch là `O(n)`.
5. Chủ động đề xuất bản BFS theo tầng hoặc DFS lặp nếu lo tràn stack.

## Câu hỏi follow-up thường gặp

- **Viết không đệ quy?** BFS: mỗi vòng xử lý hết một tầng (`size = queue.length`), tăng `depth`. Hoặc DFS với stack chứa `(node, depth)`, cập nhật `best`.
- **Cây có 10⁶ node lệch hẳn một phía?** Đệ quy tràn call stack ⇒ dùng phiên bản lặp.
- **Min depth thì sao?** Không thể dùng `min` đơn thuần – node chỉ có một con không phải lá. BFS dừng ở lá đầu tiên.
- **Kiểm tra cây cân bằng trong O(n)?** Gộp tính chiều cao và kiểm tra `|L − R| ≤ 1` trong một lần đệ quy, trả `−1` để báo mất cân bằng.
- **Cây N-ary / đồ thị DAG?** `1 + max` trên mọi con; với DAG cần memo để tránh tính lại.

## Checklist nhận diện pattern

- Đề hỏi một **thuộc tính của toàn cây** (chiều cao, kích thước, tổng, cân bằng) ⇒ đệ quy bottom-up, kết hợp kết quả hai con.
- Kết quả của cha **phụ thuộc kết quả của con** ⇒ postorder.
- Cần thông tin theo **tầng** hoặc dừng sớm ở node nông nhất ⇒ cân nhắc BFS.
- Cây có thể rất sâu ⇒ chuẩn bị phiên bản lặp.

## Bài luyện tập liên quan

- LeetCode 104 – Maximum Depth of Binary Tree.
- LeetCode 111 – Minimum Depth of Binary Tree.
- LeetCode 110 – Balanced Binary Tree.
- LeetCode 543 – Diameter of Binary Tree.
- LeetCode 559 – Maximum Depth of N-ary Tree.
- LeetCode 124 – Binary Tree Maximum Path Sum.
