## Kịch bản trình bày (6–8 phút)

1. **Làm rõ đề** (30s): cây có cân bằng không? k luôn hợp lệ? hỏi một lần hay nhiều lần?
2. **Quan sát then chốt** (30s): "Inorder của BST là dãy tăng dần, nên phần tử nhỏ thứ k là node thứ k được thăm theo inorder."
3. **Cách đơn giản** (30s): "Inorder hết vào mảng rồi lấy `sorted[k − 1]` – O(n) thời gian và bộ nhớ." Không cần code, chỉ nêu để có mốc.
4. **Tối ưu hoá** (1 phút): "Không cần lưu mảng, cũng không cần duyệt hết – đếm khi thăm và dừng ở k. Chi phí là đi xuống h tầng tới min rồi thăm k node: O(h + k)."
5. **Code bản lặp với stack** (2–3 phút), giải thích vì sao không dùng đệ quy: cây có thể lệch, h = n = 10⁴ sát giới hạn call stack. Nói rõ bất biến: *stack chứa các tổ tiên mà cây con trái đang được xử lý, đỉnh là node nhỏ nhất chưa thăm*.
6. **Phân tích** (30s): O(h + k) thời gian, O(h) bộ nhớ; tệ nhất O(n) khi cây lệch.
7. **Nhắc hướng mở rộng** (30s): Morris O(1) bộ nhớ, augmented size cho truy vấn thường xuyên.

## Follow-up thường gặp

- **Cây bị insert/delete thường xuyên và hỏi kth liên tục?** (follow-up chính thức) Lưu `size` cây con ở mỗi node ⇒ truy vấn O(h), cập nhật O(h) trên đường insert/delete; kết hợp cây tự cân bằng để h = O(log n).
- **Không được dùng bộ nhớ phụ?** Morris traversal: thread predecessor → node, O(1) bộ nhớ, nhưng sửa tạm cây và phải gỡ thread nếu dừng sớm.
- **Phần tử lớn thứ k?** Reverse inorder (phải → gốc → trái), hoặc tìm phần tử nhỏ thứ n − k + 1 nếu biết n.
- **Viết BST Iterator `next()`/`hasNext()` O(1) trung bình, O(h) bộ nhớ?** Chính là vòng lặp trên, tách thành hai phương thức (LeetCode 173).
- **Vì sao không dùng heap kích thước k?** Được, O(n log k), nhưng bỏ phí tính chất BST – người phỏng vấn muốn thấy bạn tận dụng thứ tự có sẵn.
- **Cây nhị phân thường (không phải BST)?** Mất tính chất inorder tăng dần ⇒ quay về heap/quickselect O(n).

## Lỗi hay gặp khi code

- Bản đệ quy quên kiểm tra kết quả của lời gọi trái ⇒ vẫn đếm tiếp sau khi đã tìm thấy.
- Điều kiện vòng ngoài chỉ là `stack.length > 0` ⇒ thoát ngay từ đầu vì stack rỗng.
- Đếm khi **đẩy** thay vì khi **pop** ⇒ sai thứ tự (đẩy theo thứ tự đi xuống, không phải tăng dần).
