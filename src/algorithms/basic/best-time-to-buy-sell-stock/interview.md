## Cách trình bày trong phỏng vấn

1. Diễn đạt lại: tìm `max(prices[j] − prices[i])` với `i < j`, chặn dưới 0. Nêu brute force O(n²).
2. Câu hỏi then chốt: "Nếu bán hôm nay thì nên mua ngày nào?" ⇒ ngày rẻ nhất trước đó ⇒ chỉ cần nhớ `minPrice`.
3. Viết code một vòng lặp, nhấn mạnh thứ tự: so với đáy cũ rồi mới cập nhật đáy (đảm bảo mua trước bán).
4. Chạy tay `[7, 1, 5, 3, 6, 4]` ⇒ 5 và `[7, 6, 4, 3, 1]` ⇒ 0.
5. Chốt O(n) thời gian, O(1) bộ nhớ; nhắc liên hệ Kadane để ghi điểm.

## Câu hỏi follow-up thường gặp

- **Trả về ngày mua/bán?** Lưu `minIdx`; khi cập nhật `best` thì ghi `buy = minIdx`, `sell = i`.
- **Liên hệ với Kadane?** Lợi nhuận = tổng đoạn con của `diff[k] = p[k] − p[k−1]`; reset khi gặp đáy mới ≡ Kadane reset khi tổng âm.
- **Được giao dịch nhiều lần?** LC 122: cộng mọi chênh lệch dương liên tiếp.
- **Tối đa 2 hoặc k giao dịch?** DP trạng thái `buy1, sell1, buy2, sell2` (LC 123) hoặc mảng `k` (LC 188).
- **Dữ liệu stream vô hạn?** Lời giải đã là online: mỗi giá mới O(1), không lưu lịch sử.
- **Muốn bán khống (short) một lần?** Đối xứng: theo dõi `maxPrice` và `maxPrice − prices[j]`.

## Checklist nhận diện pattern

- Cần tối ưu một cặp `(i, j)` với `i < j` mà giá trị chỉ phụ thuộc `f(a[j]) − g(a[i])` ⇒ duyệt `j`, giữ "tốt nhất của `g` ở bên trái" trong một biến.
- Đề nói "một lần mua, một lần bán" / "chênh lệch lớn nhất có thứ tự" ⇒ running min.
- Khi thấy "tổng đoạn con lớn nhất" sau khi biến đổi sang mảng chênh lệch ⇒ Kadane.

## Bài luyện tập liên quan

- LeetCode 121 – Best Time to Buy and Sell Stock.
- LeetCode 122 – Best Time to Buy and Sell Stock II.
- LeetCode 53 – Maximum Subarray.
- LeetCode 2016 – Maximum Difference Between Increasing Elements.
- LeetCode 123 – Best Time to Buy and Sell Stock III.
