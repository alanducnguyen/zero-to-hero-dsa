## Kịch bản trình bày (6–8 phút)

1. **Làm rõ đề** (30s): có số âm/0 không? đếm hay liệt kê? mảng con phải liên tiếp và khác rỗng?
2. **Brute force** (30s): "Thử mọi (i, j), cộng lại – O(n³). Dễ thấy cộng dồn khi kéo dài j cho O(n²)." Nói, không cần code.
3. **Loại sliding window** (30s): "Vì có số âm nên tổng không đơn điệu theo độ dài cửa sổ – không biết khi nào co trái." Nêu phản ví dụ ngắn. Người phỏng vấn rất hay chờ câu này.
4. **Nhận xét then chốt** (1 phút): "Tổng nums[i..j] = P[j+1] − P[i]. Cần P[i] = P[j+1] − k. Với mỗi j chỉ cần biết *bao nhiêu* tiền tố trước đó bằng sum − k ⇒ HashMap đếm tần suất."
5. **Code** (2 phút): nhấn mạnh `freq = {0: 1}` và thứ tự tra-rồi-ghi.
6. **Phân tích + test** (1 phút): O(n)/O(n); chạy tay `[1,1,1], k=2` và `[0,0], k=0` (đáp án 3).

## Follow-up thường gặp

- **Toàn số dương?** Sliding window O(1) bộ nhớ.
- **Độ dài lớn nhất có tổng k** (LeetCode 325)? Map lưu *chỉ số đầu tiên* của mỗi tiền tố thay vì tần suất.
- **Tổng chia hết cho k** (LeetCode 974)? Lưu `((sum % k) + k) % k` – cẩn thận modulo số âm.
- **Số 0 và 1 bằng nhau** (LeetCode 525)? Đổi 0 thành −1, tìm mảng con tổng 0.
- **Trên cây, đường đi xuống có tổng k** (LeetCode 437)? Cùng kỹ thuật, nhớ backtrack (giảm tần suất) khi rời nút.
- **Ma trận con tổng k** (LeetCode 1074)? Cố định cặp hàng rồi áp dụng bài này cho mảng cột: O(rows² · cols).

## Lỗi hay gặp khi code trên bảng

- Quên `{0: 1}` ⇒ thiếu các mảng con bắt đầu từ chỉ số 0.
- Ghi `freq[sum]` trước khi tra ⇒ k = 0 đếm thừa mảng con rỗng.
- Dùng sliding window hoặc `break` khi `sum > k` ⇒ sai với số âm.
