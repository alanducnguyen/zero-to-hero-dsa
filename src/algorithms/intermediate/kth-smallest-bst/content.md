## Bài toán

Cho gốc `root` của một **Binary Search Tree** (BST) và số nguyên `k`. Trả về giá trị **nhỏ thứ k** (đếm từ 1) trong cây (LeetCode 230).

Ví dụ: chèn lần lượt `[5, 3, 6, 2, 4, 1]` ta được cây gốc 5; với `k = 3` đáp án là `3` vì dãy tăng dần là `1, 2, 3, 4, 5, 6`.

Trong bài học này cây được dựng bằng cách chèn từng giá trị của mảng đầu vào (giá trị trùng bị bỏ qua), giống bài BST Operations. Nếu `k` nằm ngoài `[1, n]`, hàm trả về `-1`.

## Ý tưởng / Trực giác

Tính chất BST: mọi node ở cây con trái **nhỏ hơn** gốc, mọi node ở cây con phải **lớn hơn** gốc. Hệ quả quan trọng nhất: **duyệt inorder (trái → gốc → phải) cho ra các giá trị theo thứ tự tăng dần**. Vậy "phần tử nhỏ thứ k" chính là "node thứ k được thăm trong inorder".

Cách ngây thơ là duyệt inorder toàn bộ vào một mảng rồi lấy phần tử `k − 1`, tốn `O(n)` thời gian và bộ nhớ. Nhưng ta không cần các phần tử sau vị trí k – chỉ cần **dừng sớm**. Với đệ quy, dừng sớm hơi vụng (phải truyền cờ hoặc ném ngoại lệ qua nhiều tầng). Với **stack tường minh**, ta chỉ việc `return` ngay khi đếm tới k.

Hình dung stack như "danh sách tổ tiên đang chờ": khi đi xuống trái, ta để dành node hiện tại vì chưa thể thăm nó trước khi xong cây con trái. Đỉnh stack luôn là node nhỏ nhất chưa thăm.

## Thuật toán từng bước

1. `stack = []`, `node = root`, `count = 0`.
2. Lặp khi `node != null` hoặc stack còn phần tử:
   - **Đi trái tới cùng:** trong khi `node != null`, push `node` rồi `node = node.left`.
   - **Thăm:** `node = stack.pop()`, tăng `count`.
   - Nếu `count == k` ⇒ trả về `node.val`.
   - **Sang phải:** `node = node.right` (cây con phải sẽ được xử lý ở lần lặp sau theo cùng quy tắc).
3. Hết vòng mà chưa tới k ⇒ trả về `-1`.

## Chứng minh đúng

**Bất biến:** tại đầu mỗi lần lặp ngoài, mọi node đã pop được thăm theo đúng thứ tự tăng dần, và tập "node chưa thăm" = cây con gốc `node` ∪ (mỗi node `s` trong stack cùng cây con phải của `s`). Hơn nữa mọi giá trị trong cây con gốc `node` nhỏ hơn mọi node trong stack.

- Đi trái tới cùng: node bị push đều lớn hơn cây con trái của chính nó, nên việc trì hoãn là đúng.
- Khi pop, cây con trái của node đỉnh đã thăm hết (hoặc rỗng) ⇒ nó là giá trị nhỏ nhất còn lại.
- Chuyển sang `node.right`: các giá trị trong cây con phải lớn hơn node vừa thăm nhưng nhỏ hơn mọi tổ tiên còn trong stack (vì chúng nằm trong cây con trái của các tổ tiên đó).

Do đó dãy pop là dãy tăng dần nghiêm ngặt, và node pop thứ k là phần tử nhỏ thứ k.

## Độ phức tạp

| Trường hợp | Thời gian | Bộ nhớ |
|---|---|---|
| Tổng quát | O(h + k) | O(h) |
| Cây cân bằng | O(log n + k) | O(log n) |
| Cây lệch (worst) | O(n) | O(n) |

`h` là chiều cao: trước lần pop đầu tiên ta phải đi xuống tối đa `h` node; sau đó mỗi node được push và pop đúng một lần, ta chỉ pop `k` node.

## Tradeoff

- **Lặp vs đệ quy:** đệ quy ngắn gọn hơn nhưng khó dừng sớm sạch sẽ và có thể tràn call stack với cây lệch sâu. Lặp dài hơn vài dòng nhưng điều khiển hoàn toàn.
- **Stack O(h) vs Morris traversal O(1):** Morris tạm nối con trỏ phải của predecessor để không cần stack, nhưng sửa cây tạm thời (không an toàn khi đa luồng) và code khó đọc hơn.
- **Truy vấn một lần vs nhiều lần:** nếu cây bị sửa liên tục và hỏi k nhiều lần, nên lưu thêm `size` cây con ở mỗi node (order-statistic tree) để trả lời trong `O(h)`.

## Lợi / Hại

**Lợi:** dừng sớm, không cần mảng phụ `O(n)`; cùng một khung dùng được cho BST Iterator, validate BST, two-sum trên BST.

**Hại:** vẫn `O(n)` khi cây lệch hoặc k gần n; phụ thuộc hoàn toàn vào tính chất BST – với cây nhị phân thường cần heap hoặc quickselect.

## Use case thực tế

- **Phân trang trong index B-tree/BST:** "lấy bản ghi thứ k theo thứ tự khoá" (OFFSET trong SQL) đi theo đúng ý tưởng inorder dừng sớm.
- **Iterator/cursor trên cấu trúc có thứ tự** (`TreeMap`, `std::set`): mỗi lần `next()` là một bước pop + đi trái của thuật toán này.
- **Thống kê thứ hạng:** median, percentile trên tập dữ liệu lưu trong cây cân bằng.

## Lỗi thường gặp

- Quên điều kiện `stack.length > 0` trong vòng ngoài ⇒ dừng ngay khi `node` là null dù còn tổ tiên chưa thăm.
- Đếm khi **push** thay vì khi **pop** ⇒ đếm theo preorder, sai thứ tự.
- Nhầm `k` 1-based thành 0-based (lệch một).
- Sau khi pop quên gán `node = node.right` ⇒ vòng lặp vô hạn hoặc bỏ sót cây con phải.
- Với đệ quy: return ở tầng sâu nhưng tầng trên vẫn tiếp tục duyệt vì không kiểm tra kết quả.

## Biến thể

- **LC 94 – Inorder Traversal:** cùng vòng lặp, chỉ ghi lại mọi node pop.
- **LC 173 – BST Iterator:** tách vòng lặp thành `next()` / `hasNext()`, bộ nhớ `O(h)`.
- **Phần tử lớn thứ k:** duyệt reverse inorder (phải → gốc → trái).
- **Follow-up của LC 230:** cây bị insert/delete thường xuyên ⇒ augment mỗi node với kích thước cây con, đi xuống bên trái nếu `k ≤ size(left)`, ngược lại trừ đi và sang phải.
- **LC 653 – Two Sum IV:** hai iterator (inorder xuôi và ngược) như hai con trỏ.
