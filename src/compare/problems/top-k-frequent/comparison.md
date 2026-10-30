## Phân tích

Cả ba cách đều bắt đầu bằng **HashMap đếm tần suất – O(n)**, không tránh được vì phải đọc mọi phần tử. Khác biệt nằm ở bước **chọn k giá trị có count lớn nhất** trong m giá trị khác nhau.

**Sort toàn bộ** sắp xếp m cặp (giá trị, count) rồi cắt k đầu: O(m log m), worst case m ≈ n ⇒ O(n log n). Lãng phí vì ta không cần thứ tự của m − k giá trị bị loại. Không đạt yêu cầu follow-up "tốt hơn O(n log n)".

**Min-heap kích thước k** chỉ duy trì k ứng viên tốt nhất. Dùng **min**-heap (không phải max) vì thứ ta cần truy cập nhanh là ứng viên *yếu nhất* – kẻ bị đá ra khi có ứng viên mới. Mỗi giá trị tốn O(log k) ⇒ O(n + m log k). Điểm mạnh thực sự: phần chọn chỉ cần O(k) bộ nhớ và xử lý từng phần tử một ⇒ dùng được cho luồng, cho dữ liệu chia nhiều máy (mỗi máy gửi top-k cục bộ – lưu ý chỉ đúng khi các máy đếm trên các *khoá* rời nhau, xem interview).

**Bucket sort theo count** khai thác ràng buộc mà hai cách trên bỏ qua: count là số nguyên trong `[1, n]`. Khi khoá sắp xếp bị chặn bởi n, dùng nó làm **chỉ số mảng** thay vì so sánh ⇒ phá được chặn dưới Ω(n log n) của sắp xếp so sánh. Quét bucket từ n xuống, dừng khi đủ k ⇒ **O(n)** thời gian và bộ nhớ.

## Xếp hạng

1. **Bucket sort** – O(n) / O(n). Tối ưu tiệm cận, code ngắn. Đáp án mong đợi cho follow-up.
2. **Min-heap kích thước k** – O(n log k) / O(n + k). Gần O(n) khi k nhỏ, và là cách duy nhất trong ba cách chạy được online.
3. **Sort toàn bộ** – O(n log n) / O(n). Mở đầu tốt, nhưng làm thừa việc.

## Khi nào thứ hạng đổi

- **Dữ liệu là luồng / không biết trước n**: bucket cần biết count tối đa và toàn bộ dữ liệu ⇒ heap lên hạng 1 (kết hợp HashMap đếm, hoặc Count-Min Sketch khi số khoá quá lớn).
- **Điểm xếp hạng không phải count nguyên nhỏ** (vd tổng doanh thu, điểm thực): không bucket được ⇒ heap hoặc quickselect O(m) trung bình trên mảng entries.
- **k ≈ m và cần output có thứ tự**: sort toàn bộ đơn giản nhất, chênh lệch hằng số không đáng kể.
- **m rất nhỏ so với n** (ít giá trị khác nhau): mọi cách đều ≈ O(n) vì bước đếm chiếm ưu thế; chọn cách dễ đọc nhất.
