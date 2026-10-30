## Kịch bản trình bày

1. **Làm rõ đề** (30s): chọn đúng 2 tường, các tường ở giữa không cản nước, `height[i]` có thể bằng 0.
2. **Công thức** (30s): `area = min(h[i], h[j]) × (j − i)` – nói rõ hai yếu tố cạnh tranh: rộng và thấp.
3. **Brute force** (30s): hai vòng lặp, Θ(n²), n = 10⁵ là 5·10⁹ ⇒ không đạt.
4. **Cắt tỉa** (1 phút, tuỳ chọn): "Với i cố định, diện tích ≤ h[i] × (j − i); duyệt j từ xa nên dừng sớm." Thừa nhận ngay: worst case vẫn O(n²), mảng giảm dần là phản ví dụ (cận trên luôn bị tường trái cao thổi phồng).
5. **Hai con trỏ** (2 phút): bắt đầu rộng nhất; luôn dịch tường thấp. Chứng minh loại bỏ: mọi cặp còn lại chứa tường thấp đều hẹp hơn và không cao hơn ⇒ không thể tốt hơn.
6. **Chạy tay** `[1, 8, 6, 2, 5, 4, 8, 3, 7]` ⇒ 8, 49 (left = 1, right = 8), …, kết quả 49.
7. **Chốt**: O(n)/O(1); test biên `[1, 1]`, mọi tường bằng nhau, có tường 0.

## Follow-up thường gặp

- **Hai tường bằng nhau thì dịch bên nào?** Bên nào cũng được: mọi cặp chứa một trong hai đều không hơn; thực tế có thể dịch cả hai.
- **Trapping Rain Water (LC 42)** – khác ở chỗ *mọi* tường đều giữ nước: nước tại i = `min(maxLeft, maxRight) − h[i]`. Cùng two pointers: dịch phía có max nhỏ hơn vì phía đó đã xác định được mực nước.
- **Jump Game II (LC 45)** – cũng là "quét tham lam giữ một biên": tầng BFS ngầm với `end` và `farthest`, thường hỏi cùng nhóm greedy/two pointers.
- **Vì sao không phải sliding window?** Cửa sổ ở đây co từ hai đầu và quyết định dựa trên so sánh hai biên, không phải điều kiện tổng/đếm trong cửa sổ.
- **Trả về chỉ số cặp tối ưu?** Lưu (left, right) khi best cập nhật.
- **Tường có độ dày / bình 3D (LC 407)?** Chuyển sang heap + BFS từ biên.

## Checklist nhận diện

- Tối ưu một hàm của cặp (i, j) dạng `f(min/max của hai đầu) × khoảng cách` ⇒ thử hai con trỏ ngược chiều.
- Có lập luận "phía này đã hết giá trị" ⇒ loại một đầu mỗi bước ⇒ O(n).
- Cận trên rẻ (như `h[i] × width`) ⇒ dùng được cho cắt tỉa ngay cả khi chưa có lời giải tối ưu.

## Bài luyện tập

- LC 11 Container With Most Water, LC 42 Trapping Rain Water, LC 167 Two Sum II, LC 15 3Sum, LC 881 Boats to Save People, LC 407 Trapping Rain Water II.
