## Phân tích

**Brute force** là điểm xuất phát: rõ ràng đúng, nhưng n = 10⁴ cho 5·10⁷ phép so sánh – vẫn chạy được, n = 10⁵ thì không. Giá trị của nó trong phỏng vấn là *làm rõ bài toán* và cho thấy bạn biết chi phí của việc thử mọi cặp.

**Sort + two pointers** giảm xuống O(n log n) nhờ tính đơn điệu: khi mảng đã sắp xếp, tổng của hai đầu cho biết phải tiến hay lùi. Nhược điểm chí mạng cho bài này: sort làm **mất chỉ số gốc**, phải giữ thêm mảng chỉ số ⇒ vẫn O(n) bộ nhớ, và chậm hơn HashMap. Nó chỉ thắng khi mảng *đã* sắp xếp sẵn (Two Sum II) hoặc khi cần liệt kê *mọi* cặp (3Sum, 4Sum) vì two pointers tránh trùng lặp dễ hơn.

**HashMap một lượt** là đáp án mong đợi: mỗi phần tử hỏi "phần bù đã xuất hiện chưa" trong O(1) kỳ vọng. Đổi O(n) bộ nhớ lấy O(n) thời gian – một đổi chác gần như luôn đáng. Một lượt (thay vì hai lượt: điền map rồi tra) còn tự tránh việc dùng cùng phần tử hai lần.

## Xếp hạng

1. **HashMap** – O(n)/O(n). Chọn mặc định.
2. **Sort + two pointers** – O(n log n)/O(n). Chọn khi mảng đã sắp xếp, bộ nhớ hash không chấp nhận được, hoặc bài mở rộng sang k-sum.
3. **Brute force** – O(n²)/O(1). Chỉ để khởi động hoặc khi n ≤ vài trăm và cần O(1) bộ nhớ tuyệt đối.

## Khi nào thứ hạng đổi

- Mảng đã sắp xếp ⇒ two pointers lên hạng 1 (O(n), O(1)).
- Giá trị trong miền nhỏ (vd 0..10⁵) ⇒ mảng đếm thay HashMap, nhanh hơn về hằng số.
- Hỏi *số lượng* cặp hoặc *mọi* cặp ⇒ HashMap đếm tần suất hoặc sort + two pointers tuỳ yêu cầu về trùng lặp.
