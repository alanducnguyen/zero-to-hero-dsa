## Phân tích

**Gộp cặp tới khi ổn định (brute force)** mô phỏng đúng định nghĩa: còn hai khoảng chồng nhau thì gộp chúng. Vì không có thứ tự, sau mỗi lần gộp khoảng mới có thể chồng với khoảng đã xét ⇒ phải quét lại từ đầu. Có tối đa n − 1 lần gộp, mỗi lần quét tới O(n²) cặp ⇒ **O(n³)**. Giá trị duy nhất: chứng minh bạn hiểu điều kiện chồng lấn `a.start ≤ b.end && b.start ≤ a.end`.

**Sort + quét** loại bỏ việc "tìm cặp" nhờ một bất biến: sau khi sắp xếp theo start, nếu khoảng hiện tại không chồng với khoảng cuối của kết quả thì nó cũng không chồng với bất kỳ khoảng nào trước đó (chúng đều kết thúc trước khoảng cuối hoặc đã nằm trong nó). Mỗi khoảng chỉ so **một lần** ⇒ quét O(n), tổng O(n log n) do sort. Không quan tâm toạ độ lớn hay số thực.

**Line sweep đếm** nhìn bài toán từ trục toạ độ thay vì từ các khoảng: mỗi khoảng là sự kiện +1 ở start và −1 ở cuối; prefix sum cho **độ phủ** tại mỗi điểm, vùng có độ phủ > 0 liên tục là một khoảng gộp. Với mảng đếm thì không cần sort ⇒ **O(n + R)**, R = max − min.

Cái bẫy là **biên**. Đặt −1 tại ô `end` thì `[1,4]` và `[4,5]` bị cắt ở 4 (sai); đặt tại `end + 1` thì `[1,2]` và `[3,4]` dính thành `[1,4]` (sai). Cách sạch: **nhân đôi trục** – ô `2x` là điểm x, ô `2x+1` là "ngay sau x" – rồi đặt −1 tại `2·end + 1`. Nếu dùng phiên bản sự kiện (sort các cặp (toạ độ, ±1)), quy tắc tương đương là "cùng toạ độ thì +1 xử lý trước −1" – khi đó lại tốn O(n log n) như sort thường.

## Xếp hạng

1. **Sort + quét** – O(n log n) / O(n). Đúng với mọi miền toạ độ, ngắn, dễ chứng minh. Đáp án mặc định.
2. **Line sweep đếm** – O(n + R) / O(R). Nhanh hơn khi R nhỏ, nhưng phụ thuộc miền giá trị và dễ sai biên.
3. **Gộp cặp tới khi ổn định** – O(n³) / O(n). Chỉ để khởi động.

## Khi nào thứ hạng đổi

- **Miền toạ độ nhỏ, n lớn** (vd 10⁶ cuộc hẹn trong 1440 phút của một ngày): mảng đếm O(n + 1440) đánh bại sort O(n log n) ⇒ line sweep lên hạng 1.
- **Cần thêm thông tin độ phủ** (bao nhiêu khoảng chồng tại một điểm – Meeting Rooms II, Car Pooling): line sweep cho miễn phí, sort + quét phải viết lại.
- **Input đã sắp xếp theo start** (dữ liệu log theo thời gian): bỏ sort ⇒ sort + quét thành O(n), hạng 1 tuyệt đối.
- **Luồng khoảng đến liên tục, cần gộp online**: cả ba đều không hợp – dùng cây cân bằng / TreeMap theo start (LeetCode 352, 715).
