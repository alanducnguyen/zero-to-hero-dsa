## Phân tích

Mọi cách đều dựa trên một công thức: **nước tại cột i = min(tường cao nhất bên trái, bên phải) − height[i]**. Khác nhau ở cách tính hai tường đó.

**Brute force** quét hai phía cho từng cột: O(n²). Dùng để đặt công thức lên bàn.

**Prefix/suffix max** tiền tính `maxLeft`, `maxRight` bằng hai lượt rồi cộng: O(n), O(n). Đây là cách *dễ giải thích nhất* và đủ để "pass". Nhiều người phỏng vấn hài lòng ở đây nếu bạn chứng minh được công thức.

**Monotonic stack** đổi góc nhìn: thay vì tính theo **cột**, tính theo **lớp ngang**. Mỗi khi gặp cột cao hơn đỉnh stack, nó khép một hố: cộng (min hai tường − đáy) × chiều rộng. O(n), O(n). Lợi thế: hoạt động khi cột đến dần (online), và là cùng cấu trúc với Largest Rectangle in Histogram.

**Two pointers** là tối ưu: O(n), O(1). Ý then chốt: khi `height[left] < height[right]`, bên phải chắc chắn có tường cao hơn `height[left]`, nên mức nước tại `left` chỉ phụ thuộc `leftMax` – không cần biết bên phải chính xác. Khó nhất để chứng minh, dễ nhất để code.

## Xếp hạng

1. **Two pointers** – O(n)/O(1).
2. **Prefix/suffix max** – O(n)/O(n). Chọn khi muốn code chắc chắn đúng và dễ giải thích, hoặc cần nước từng cột.
3. **Monotonic stack** – O(n)/O(n). Chọn khi dữ liệu online hoặc bài liên quan tới "hố"/lớp ngang.
4. **Brute force** – O(n²)/O(1).

## Khi nào thứ hạng đổi

- Phiên bản 2D (Trapping Rain Water II) ⇒ không cách nào ở trên áp dụng; dùng min-heap từ biên (BFS kiểu Dijkstra).
- Cần biết "hố nào, bao nhiêu nước" ⇒ stack cho thông tin theo hố; prefix/suffix cho theo cột.
- Cột có độ rộng ⇒ nhân thêm width; two pointers vẫn O(1).
