## Kịch bản trình bày (5–8 phút)

1. **Làm rõ đề** (30s): có giá trị trùng? `pop`/`getMin` trên stack rỗng? giới hạn bộ nhớ?
2. **Brute force** (30s): "Quét stack khi `getMin` là O(n); giữ một biến min thì sai sau khi pop đúng phần tử min." Câu thứ hai mới là điểm mấu chốt – nói ra cho người phỏng vấn thấy bạn hiểu vì sao bài khó.
3. **Nhận xét then chốt** (1 phút): "Stack chỉ đổi ở đỉnh ⇒ min của phần bên dưới cố định. Lưu min theo từng mức là đủ."
4. **Code stack cặp** (2 phút) – ngắn và chắc chắn đúng.
5. **Tối ưu bộ nhớ** (1–2 phút): chuyển sang hai stack, `mins` chỉ nhận `x ≤ min`; giải thích vì sao phải `≤`.
6. **Nhắc mẹo độ lệch** (30s): "Có thể còn O(1) bộ nhớ phụ bằng cách lưu x − min, nhưng phải dùng long để tránh tràn – tôi không chọn cách này cho production."

## Follow-up thường gặp

- **Max Stack (LeetCode 716) – thêm `popMax()`?** Hai stack không đủ vì `popMax` xoá giữa stack. Dùng danh sách liên kết đôi + TreeMap (giá trị → danh sách node) ⇒ O(log n) mỗi thao tác; hoặc hai heap với xoá lười.
- **Min Queue / min trên cửa sổ trượt?** Queue bằng hai min-stack (amortized O(1)), hoặc deque đơn điệu (Sliding Window Maximum, LeetCode 239).
- **Thread safety?** Các thao tác ghi hai chỗ (`data` và `mins`) phải nguyên tử – một mutex bao cả hai; stack cặp dễ làm lock-free hơn vì mỗi lần push/pop chỉ đổi một ô (Treiber stack với node mang sẵn min).
- **Nếu là LFU/LRU-style design khác?** Cùng tư duy: kết hợp cấu trúc có sẵn với thông tin phụ được duy trì tăng dần thay vì tính lại.
- **Vì sao không dùng heap?** Heap cho getMin O(1) nhưng `pop` của stack là xoá phần tử tuỳ ý trong heap ⇒ O(log n) và phức tạp hơn hẳn.

## Lỗi hay mắc

- Dùng `<` thay vì `≤` khi đẩy vào `mins` ⇒ sai khi min trùng lặp.
- So sánh bằng `==` trên `Integer` trong Java (so tham chiếu ngoài khoảng −128..127) khi kiểm tra đỉnh `mins`.
- Cách độ lệch: tính `top` sai khi `d < 0` (đỉnh là `min`, không phải `min + d`), hoặc quên khôi phục `min` khi pop.
