## Kịch bản trình bày

1. **Làm rõ đề** (30s): một lần mua, một lần bán, bán sau mua, không lời thì trả 0.
2. **Brute force** (1 phút): mọi cặp `i < j`, O(n²). Nói ngay: "n = 10⁵ thì quá chậm".
3. **Tìm chỗ lãng phí** (1 phút): "Với mỗi ngày mua, tôi chỉ cần giá cao nhất phía sau" ⇒ mảng `sufMax` tính ngược, O(n)/O(n).
4. **Bỏ mảng phụ** (1–2 phút): "Đổi vai trò – cố định ngày bán, cần min phía trước; min tiền tố cập nhật được bằng một biến khi duyệt xuôi." ⇒ O(n)/O(1).
5. **Dry run** `[7, 1, 5, 3, 6, 4]`: min lần lượt 7, 1, 1, 1, 1, 1; best 0, 0, 4, 4, 5, 5 ⇒ 5.
6. **Case biên**: giá giảm dần (trả 0), một phần tử, đáy mới xuất hiện **sau** đỉnh (`[2, 4, 1]` ⇒ 2, không phải 4 − 1).

## Câu hỏi follow-up

- *Nhiều giao dịch?* (122) → cộng mọi chênh lệch dương liên tiếp.
- *Tối đa 2 / k giao dịch?* (123 / 188) → DP trạng thái buy/sell, hoặc ghép tiền tố + hậu tố.
- *Có cooldown / phí?* (309 / 714) → máy trạng thái hold/free.
- *Liên hệ Kadane?* → lợi nhuận = tổng đoạn con lớn nhất của mảng chênh lệch.

## Checklist nhận diện

- "Chọn i < j tối ưu f(a[j]) − g(a[i])" ⇒ duyệt j, giữ tốt nhất của i phía trước.
- Brute force lặp lại truy vấn min/max tiền tố ⇒ thay bằng một biến chạy.
- Cần thông tin "tương lai" ⇒ tiền xử lý mảng hậu tố, hoặc duyệt ngược.

## Bài luyện tập

LeetCode 122, 123, 309, 714, 53 Maximum Subarray, 42 Trapping Rain Water.
