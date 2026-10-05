## Bài toán

Cho cây nhị phân, liệt kê giá trị các node theo một trong bốn thứ tự:
- **Preorder:** gốc → trái → phải.
- **Inorder:** trái → gốc → phải.
- **Postorder:** trái → phải → gốc.
- **Level-order (BFS):** từng tầng, trái sang phải.

Gần như **mọi** bài về cây trong phỏng vấn (max depth, validate BST, path sum, LCA, serialize, diameter…) đều là một trong bốn cách duyệt này cộng thêm vài dòng logic. Thuộc cách duyệt, và quan trọng hơn là hiểu **khi nào dùng cái nào**, là điều kiện tiên quyết cho vòng onsite Amazon/Microsoft.

## Ý tưởng / Trực giác

Cây là cấu trúc **đệ quy**: một cây = gốc + cây con trái + cây con phải. Vì vậy duyệt cây tự nhiên là đệ quy: "xử lý gốc, duyệt trái, duyệt phải" – chỉ khác nhau ở **thời điểm xử lý gốc**:
- Trước hai con (pre): hữu ích khi cần thông tin từ cha truyền xuống con (sao chép cây, serialize, path).
- Giữa hai con (in): với BST cho dãy **tăng dần** – đó là định nghĩa của BST.
- Sau hai con (post): cần kết quả từ con trước khi tính cha (chiều cao, kích thước, xoá cây, tính biểu thức).

BFS thì khác hẳn: không đệ quy, dùng **queue** để xử lý theo tầng – cần khi hỏi "tầng", "gần gốc nhất", "nhìn từ bên phải".

## Thuật toán từng bước

**DFS (đệ quy):** `f(node)`: nếu `null` trả về; theo thứ tự tương ứng: `visit(node)`, `f(left)`, `f(right)`.

**BFS:** queue = `[root]`; lặp: lấy đầu queue, thăm, đẩy con trái rồi con phải vào cuối.

Tab **Debug**: chọn kiểu duyệt bằng preset; node tím đang xử lý, node xanh lá đã thăm, node vàng là con sắp đệ quy vào; call stack bên phải cho DFS, queue cho BFS. Preset "Cây lệch phải" cho thấy DFS tốn O(n) stack.

## Chứng minh đúng

**DFS thăm mỗi node đúng một lần:** quy nạp theo kích thước cây con: cây rỗng – 0 lần; cây gốc `r`: `visit(r)` được gọi đúng 1 lần trong `f(r)`, và theo giả thiết mỗi node trong hai cây con được thăm đúng 1 lần bởi `f(left)`/`f(right)`; hai cây con không giao nhau.

**Thứ tự:** mọi node trong cây con trái được thăm trong `f(left)`, cây con phải trong `f(right)`; vị trí của `visit(r)` so với hai lời gọi quyết định pre/in/post.

**BFS theo tầng:** bất biến: queue chứa các node theo độ sâu không giảm, tối đa hai độ sâu liên tiếp `d, d+1`. Lấy node độ sâu `d` ra, đẩy con độ sâu `d+1` vào cuối ⇒ bất biến giữ ⇒ node thăm theo thứ tự độ sâu, trong cùng độ sâu theo thứ tự trái–phải (do cha trái được xử lý trước cha phải).

## Độ phức tạp

| | Thời gian | Bộ nhớ | Giải thích |
|---|---|---|---|
| DFS đệ quy | O(n) | O(h) | h = chiều cao; O(log n) cây cân bằng, O(n) cây lệch |
| DFS stack tường minh | O(n) | O(h) | Tránh tràn call stack |
| BFS | O(n) | O(w) | w = độ rộng lớn nhất, tới n/2 với cây hoàn chỉnh |
| Morris traversal | O(n) | O(1) | Sửa tạm con trỏ phải, phục hồi sau |

## Tradeoff

- **Đệ quy ↔ Lặp với stack:** đệ quy ngắn, rõ; lặp tránh tràn stack (JS giới hạn ~10⁴ frame) và cho phép tạm dừng (iterator). Phỏng vấn: viết đệ quy, nói được cách lặp; inorder lặp là câu hỏi phổ biến.
- **DFS ↔ BFS:** DFS tốn O(h), BFS tốn O(w). Cây sâu và hẹp ⇒ BFS tiết kiệm; cây rộng và nông ⇒ DFS tiết kiệm. Cần "ngắn nhất tới lá" ⇒ BFS dừng sớm.
- **Thứ tự nào?** Thông tin chảy từ **cha xuống con** ⇒ preorder (truyền tham số). Từ **con lên cha** ⇒ postorder (trả giá trị). Cần **thứ tự sắp xếp** của BST ⇒ inorder.
- **Morris O(1) bộ nhớ ↔ thay đổi cây tạm thời:** không dùng được với cây chỉ đọc hoặc đa luồng.

## Lợi / Hại

**Lợi**
- O(n), framework thống nhất cho mọi bài cây.
- Đệ quy khớp cấu trúc dữ liệu ⇒ code ngắn và dễ chứng minh.

**Hại**
- Đệ quy sâu có thể tràn stack với cây lệch lớn.
- BFS tốn bộ nhớ với cây rộng.
- Thứ tự duyệt không khôi phục được cây nếu chỉ có một thứ tự (cần pre+in hoặc post+in, hoặc pre với null marker).

## Use case thực tế

- **Compiler:** AST – postorder để sinh code/tính giá trị (con trước cha), preorder để in cây cú pháp.
- **Hệ thống file:** `du` tính dung lượng thư mục là postorder; `find` liệt kê là preorder.
- **Render UI:** cây DOM/React – render theo preorder, layout tính kích thước theo postorder.
- **Database B-tree / BST:** inorder cho range scan có thứ tự.
- **Serialize / deserialize cây:** preorder với marker null (LeetCode 297).
- **Garbage collection, dependency graph:** DFS đánh dấu; BFS cho "tầng" (generation, độ sâu phụ thuộc).
- **Game AI:** minimax duyệt cây trò chơi là postorder (điểm của con quyết định cha).

## Lỗi thường gặp

1. Nhầm vị trí `visit` giữa pre/in/post.
2. BFS: đẩy con phải trước con trái ⇒ sai thứ tự trong tầng.
3. Dùng `queue.shift()` O(n) với cây lớn.
4. Quên base case `null` ⇒ lỗi truy cập `.left` của null.
5. Inorder lặp: push gốc rồi lặp sai – mẫu đúng: đi xuống trái hết, pop, thăm, chuyển sang phải.
6. Dùng biến toàn cục `out` giữa các lần gọi ⇒ kết quả tích luỹ sai ở test tiếp theo.

## Biến thể

- **Inorder lặp với stack** (94 iterative): chuẩn phỏng vấn.
- **BFS theo tầng trả `number[][]`** (102): lặp theo `size` của queue.
- **Zigzag (103), Right Side View (199):** BFS với biến đổi nhỏ.
- **Morris traversal:** O(1) bộ nhớ dùng threaded tree.
- **Dựng cây từ preorder + inorder (105)** hoặc postorder + inorder (106).
- **DFS trên cây n-ary / đồ thị:** cùng khung, thêm `visited` với đồ thị.
