## Bảng so sánh

| Lời giải | Thời gian | Bộ nhớ | Số lượt duyệt | Ghi chú |
|---|---|---|---|---|
| Brute force mọi cặp | O(n²) | O(1) | n(n−1)/2 cặp | n = 10⁵ ⇒ 5·10⁹ phép tính, TLE |
| Mảng max hậu tố | O(n) | O(n) | 2 | Tiền xử lý rõ ràng, dễ chứng minh |
| Một lượt giữ min | O(n) | O(1) | 1 | Greedy / Kadane, đáp án chuẩn |

## Phân tích

**Brute force** thử mọi cặp `(i, j)` với `i < j`. Đúng hiển nhiên nhưng lãng phí: với một ngày bán `j` cố định, ta chỉ quan tâm ngày mua **rẻ nhất** phía trước, vậy mà vẫn duyệt lại toàn bộ. Đây là dấu hiệu "lặp lại cùng một truy vấn min/max trên tiền tố" – có thể ghi nhớ.

**Mảng max hậu tố** đảo góc nhìn: cố định ngày mua `i`, ngày bán tốt nhất là giá **cao nhất** từ `i` trở đi. Tính trước `sufMax` bằng một lượt duyệt ngược (mỗi ô dựa vào ô kế bên – một DP tí hon), rồi một lượt xuôi lấy `max(sufMax[i] − prices[i])`. O(n) thời gian nhưng tốn O(n) bộ nhớ và hai lượt. Kỹ thuật prefix/suffix array này rất đáng giá ở các bài khó hơn (Trapping Rain Water, Product Except Self, bài 123 hai giao dịch).

**Một lượt giữ min** nhận ra rằng nếu duyệt **xuôi** và cố định ngày bán, thứ cần nhớ là min tiền tố – và min tiền tố chỉ cần **một biến**, cập nhật dần khi đi. Mỗi ngày: cập nhật `minPrice`, rồi thử bán. Đây chính là Kadane trên mảng chênh lệch `prices[i] − prices[i−1]`: tổng đoạn con lớn nhất của mảng chênh lệch bằng lợi nhuận lớn nhất.

Tại sao suffix cần mảng còn prefix thì không? Vì ta duyệt xuôi: min tiền tố "có sẵn" ngay khi tới ngày `i`, còn max hậu tố là thông tin tương lai, buộc phải tính trước và lưu lại. Duyệt ngược với max hậu tố một biến cũng cho O(1) – hai cách là đối xứng.

## Xếp hạng

1. **Một lượt giữ min** – O(n)/O(1), một lượt, chạy được trên stream giá real-time.
2. **Max hậu tố** – cùng O(n), dễ chứng minh, nhưng thừa O(n) bộ nhớ.
3. **Brute force** – chỉ để mở đầu.

## Khi nào lời giải "kém" lại thắng

- Cần trả lời nhiều truy vấn "nếu mua ngày i thì lời tối đa bao nhiêu?" ⇒ giữ nguyên mảng `sufMax` để mỗi truy vấn O(1).
- Bài 123 (tối đa 2 giao dịch): ghép mảng lợi nhuận tốt nhất tiền tố + hậu tố là lời giải dễ hiểu nhất.
