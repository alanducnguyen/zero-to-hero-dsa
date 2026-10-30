## Bài toán

Cho gốc `root` của một cây nhị phân. **Độ sâu tối đa** (maximum depth) là số node trên đường đi dài nhất từ gốc xuống một **lá** (node không có con). Hãy trả về giá trị đó (LeetCode 104). Cây rỗng có độ sâu `0`.

Ví dụ: cây `3 → (9, 20 → (15, 7))` có độ sâu `3` (đường `3 → 20 → 15`).

Trong bài học này, cây được dựng bằng cách chèn lần lượt các giá trị đầu vào vào một BST (giá trị trùng bị bỏ qua) để dễ nhập liệu. Thuật toán `maxDepth` **không dùng** tính chất BST – nó đúng với mọi cây nhị phân.

## Ý tưởng / Trực giác

Đây là bài "nhập môn" của tư duy **đệ quy trên cây**: tin rằng hàm đã chạy đúng cho cây con, rồi ghép kết quả ở node hiện tại.

Hãy tự hỏi: "Nếu tôi đứng ở node `X` và **đã biết** độ sâu của cây con trái (`L`) và cây con phải (`R`), độ sâu của cây gốc `X` là bao nhiêu?" Đường dài nhất từ `X` phải đi qua một trong hai con, nên câu trả lời là `1 + max(L, R)` – số `1` chính là node `X`.

Còn trường hợp cơ sở: cây rỗng (`null`) có độ sâu `0`. Nhờ vậy một lá tự động có độ sâu `1 + max(0, 0) = 1` mà không cần xử lý riêng.

Vì phải biết kết quả của **cả hai con trước** rồi mới tính được cha, đây là duyệt **postorder** (trái → phải → gốc). Cách nghĩ "thông tin chảy từ dưới lên" (bottom-up) này dùng lại cho rất nhiều bài: cây cân bằng, đường kính, tổng đường đi lớn nhất.

## Thuật toán từng bước

1. Nếu `root == null` ⇒ trả về `0`.
2. `left = maxDepth(root.left)`.
3. `right = maxDepth(root.right)`.
4. Trả về `1 + max(left, right)`.

Chạy tay với cây chèn từ `[4, 2, 6, 1, 3, 7, 8]`: các lá `1`, `3`, `8` trả về `1`; node `7` có `left = 0`, `right = 1` ⇒ `2`; node `6` có `left = 0`, `right = 2` ⇒ `3`; node `2` ⇒ `2`; gốc `4` ⇒ `1 + max(2, 3) = 4`.

## Chứng minh đúng

Quy nạp mạnh theo số node `n` của cây.

- **Cơ sở** `n = 0`: cây rỗng không có đường đi nào, độ sâu `0` – đúng với base case.
- **Bước quy nạp:** giả sử hàm đúng với mọi cây có ít hơn `n` node. Với cây `n ≥ 1` node gốc `X`, hai cây con đều có ít hơn `n` node nên `left` và `right` là độ sâu đúng của chúng. Mọi đường từ `X` xuống lá đều là `X` nối với một đường từ gốc cây con trái hoặc cây con phải xuống lá (nếu `X` là lá thì cả hai bằng `0` và đường chỉ gồm `X`). Do đó đường dài nhất có `1 + max(left, right)` node.

Hàm dừng vì mỗi lời gọi đệ quy nhận một cây con thật sự nhỏ hơn.

## Độ phức tạp

| | Thời gian | Bộ nhớ (call stack) |
|---|---|---|
| Cây cân bằng | O(n) | O(log n) |
| Cây lệch (như linked list) | O(n) | O(n) |
| Tổng quát | O(n) | O(h), h = chiều cao |

Mỗi node được gọi đúng một lần và làm `O(1)` việc; thêm `n + 1` lời gọi trên con `null` – vẫn `O(n)`.

## Tradeoff

- **DFS đệ quy vs BFS theo tầng:** BFS dùng queue, đếm số tầng; bộ nhớ `O(w)` với `w` là độ rộng lớn nhất (có thể tới `n/2` ở cây đầy đủ). DFS đệ quy dùng `O(h)` – tốt với cây cân bằng, tệ với cây lệch.
- **Đệ quy vs DFS lặp với stack tường minh:** đệ quy ngắn gọn, dễ chứng minh; nhưng cây lệch với `10⁵` node có thể làm **tràn call stack** (JS/Python). Stack tường minh lưu cặp `(node, depth)` tránh được giới hạn này.
- **Bottom-up (trả về giá trị) vs top-down (truyền `depth` xuống, cập nhật biến toàn cục `best` ở lá):** cả hai `O(n)`; bottom-up thuần hàm, không cần trạng thái chung.

## Lợi / Hại

**Lợi:**
- Ba dòng code, phản ánh trực tiếp định nghĩa đệ quy của cây.
- Không cần cấu trúc dữ liệu phụ.
- Là khuôn mẫu cho cả họ bài "tính thuộc tính cây từ dưới lên".

**Hại:**
- Nguy cơ stack overflow với cây rất sâu.
- Luôn duyệt toàn bộ cây – không dừng sớm được (khác với min depth bằng BFS).

## Use case thực tế

- **Giới hạn độ sâu khi parse JSON/XML/AST:** tính độ lồng nhau để chống tấn công "deeply nested payload".
- **Đánh giá cân bằng của cây tìm kiếm** (AVL/Red-Black) trong kiểm thử: chiều cao phải `O(log n)`.
- **Hệ thống file:** độ sâu thư mục lớn nhất; **DOM:** độ sâu cây phần tử ảnh hưởng hiệu năng render.
- **Cây quyết định (decision tree) trong ML:** `max_depth` là siêu tham số chống overfitting.

## Lỗi thường gặp

- **Nhầm độ sâu theo node và theo cạnh:** LC 104 đếm **node**; nhiều tài liệu định nghĩa chiều cao theo **cạnh** (lá = 0, cây rỗng = −1). Hỏi rõ trước khi code.
- Base case trả `1` cho `null` ⇒ kết quả lệch thêm 1.
- Chỉ đi một nhánh (vd. chỉ đi trái) – nhánh dài nhất có thể ở bất kỳ đâu.
- Áp dụng nguyên khuôn này cho **min depth**: `1 + min(L, R)` sai khi một con là `null` (node có một con không phải lá).
- Quên rủi ro tràn stack với input lệch lớn.

## Biến thể

- **LC 111 – Minimum Depth:** chỉ tính min trên các con khác `null`; BFS dừng ở lá đầu tiên là tối ưu.
- **LC 110 – Balanced Binary Tree:** trả về chiều cao hoặc `−1` nếu đã mất cân bằng.
- **LC 543 – Diameter:** tại mỗi node cập nhật `best = max(best, L + R)`, trả về `1 + max(L, R)`.
- **LC 124 – Binary Tree Maximum Path Sum:** cùng khuôn bottom-up, thay độ sâu bằng tổng.
- **LC 559 – Maximum Depth of N-ary Tree:** `1 + max` trên mọi con.
