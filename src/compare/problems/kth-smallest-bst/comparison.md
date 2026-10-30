## Phân tích

Cả ba lời giải dựa trên cùng một sự thật: **inorder (trái → gốc → phải) của BST đi qua các giá trị theo thứ tự tăng dần**. Khác nhau ở chỗ *duyệt bao nhiêu* và *dùng stack nào*.

**Inorder ra mảng** là cách dễ nghĩ nhất: biến cây thành mảng đã sắp xếp rồi lấy `sorted[k − 1]`. Đúng tuyệt đối, nhưng luôn thăm **cả n node** và giữ mảng O(n) – kể cả khi k = 1, đáp án chỉ là node trái cùng. Nó cũng vẫn đệ quy nên mang theo O(h) call stack. Ưu điểm thực sự duy nhất: nếu cây **không đổi** và có nhiều truy vấn k, mảng được tính một lần và mỗi truy vấn sau là O(1).

**Inorder đệ quy dừng sớm** bỏ mảng, chỉ đếm. Khi tới node thứ k, hàm trả `true` và mọi tầng phía trên thấy cờ này thì return ngay ⇒ chỉ đi xuống tối đa h tầng tới node nhỏ nhất rồi thăm k node: **O(h + k)**. Nhược điểm: độ sâu đệ quy bằng chiều cao cây. Với cây lệch (chèn 1, 2, 3, …, 10⁴) h = n và Node.js/V8 mặc định chỉ chịu khoảng 10⁴ khung – sát ngưỡng `RangeError: Maximum call stack size exceeded`. Cờ "found" lan ngược cũng là nguồn bug phổ biến (quên kiểm tra kết quả của lời gọi trái).

**Inorder lặp với stack tường minh** giữ nguyên O(h + k) nhưng đưa stack từ call stack (vài MB, cố định) sang **heap** (chỉ giới hạn bởi RAM). `return` ngay tại chỗ tìm thấy, không cần cờ. Mẫu "đẩy hết nhánh trái → pop → sang phải" chính là **BST Iterator** (LeetCode 173), tái dùng cho hàng loạt bài khác.

## Bảng tóm tắt

| Lời giải | Thời gian | Bộ nhớ | Rủi ro |
|---|---|---|---|
| Inorder ra mảng | O(n) | O(n) + O(h) call stack | Lãng phí khi k nhỏ |
| Đệ quy dừng sớm | O(h + k) | O(h) call stack | Tràn stack khi cây lệch |
| Lặp + stack | O(h + k) | O(h) heap | Code dài hơn chút |

## Xếp hạng

1. **Lặp + stack** – O(h + k), an toàn với cây lệch. Đáp án nên chốt.
2. **Đệ quy dừng sớm** – cùng độ phức tạp, gọn hơn, nhưng phụ thuộc độ sâu call stack.
3. **Inorder ra mảng** – O(n)/O(n), chỉ hợp lý khi cache cho nhiều truy vấn trên cây tĩnh.

## Vượt xa hơn: hai hướng không có trong bảng

- **Morris traversal – O(1) bộ nhớ phụ.** Thay stack bằng cách tạm nối con phải của *predecessor* về node hiện tại ("thread"), đi qua rồi gỡ ra. Thời gian vẫn O(n) tổng (mỗi cạnh đi tối đa ba lần), bộ nhớ O(1). Đổi lại: **sửa tạm cây** – không an toàn khi đa luồng đọc, và nếu return sớm ở node thứ k thì phải nhớ gỡ các thread còn lại, nếu không cây bị hỏng. Nêu được Morris là điểm cộng lớn, nhưng code nó trên bảng dễ sai.
- **Augmented BST – lưu kích thước cây con.** Mỗi node giữ `size = 1 + size(left) + size(right)`. Tìm thứ k: nếu `k ≤ size(left)` đi trái; nếu `k = size(left) + 1` là node hiện tại; ngược lại đi phải với `k − size(left) − 1`. Mỗi truy vấn **O(h)** – O(log n) nếu cây tự cân bằng (AVL/Red-Black/treap) – và insert/delete chỉ cập nhật `size` trên đường đi. Đây là câu trả lời cho follow-up "cây bị sửa liên tục và hỏi k thường xuyên" (order-statistic tree).

## Khi nào thứ hạng đổi

- Cây chắc chắn cân bằng (h ≈ log n) ⇒ đệ quy ngang hàng với bản lặp, chọn bản nào dễ đọc hơn.
- Cây tĩnh, hàng nghìn truy vấn k ⇒ inorder ra mảng một lần rồi trả O(1) mỗi truy vấn lại là tốt nhất.
- Cây động, nhiều truy vấn ⇒ augmented BST vượt cả ba.
- Bộ nhớ cực hạn và được phép sửa cây tạm thời ⇒ Morris.
