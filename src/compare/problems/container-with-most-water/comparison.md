## Bảng tradeoff

| Lời giải | Thời gian | Bộ nhớ | Đảm bảo | Ghi chú |
|---|---|---|---|---|
| Brute force | Θ(n²) | O(1) | Luôn n(n−1)/2 cặp | Oracle đơn giản để test |
| Brute force + cắt tỉa | Θ(n²) worst (mảng giảm dần), ngẫu nhiên nhanh hơn nhiều | O(1) | Phụ thuộc dữ liệu | Cận trên `height[i] × (j − i)` |
| Hai con trỏ | Θ(n) | O(1) | n − 1 bước | Đáp án mong đợi |

## Phân tích

**Brute force** không khai thác cấu trúc nào: kể cả khi đã có best rất lớn, nó vẫn tính mọi cặp. Trên `[1, 8, 6, 2, 5, 4, 8, 3, 7]` là 36 cặp.

**Cắt tỉa** dùng một cận trên trung thực: với i cố định, diện tích ≤ `height[i] × (j − i)` vì nước không thể cao hơn tường i. Duyệt j từ xa về gần thì cận trên giảm dần, nên lần đầu cận trên ≤ best là có thể `break` cho mọi j còn lại. Trên dữ liệu ngẫu nhiên best tăng nhanh nên đa số hàng bị cắt sớm. Nhưng hãy so preset **Tăng dần** (mỗi i chỉ tính 1 cặp: tường i thấp hơn nên diện tích đầu tiên đã bằng cận trên) với **Giảm dần**: tường i cao còn tường j xa lại thấp ⇒ cận trên `height[i] × (j − i)` luôn lớn hơn diện tích thật nhiều, cắt rất ít. Đo thực tế với n = 4000 giảm dần: ~3,2 triệu/8 triệu cặp vẫn phải tính ⇒ Θ(n²). Không có bảo đảm tốt hơn O(n²) – đây là heuristic, không phải thuật toán tốt hơn về lý thuyết. Ta vẫn xếp nó trên brute force vì không bao giờ chậm hơn (trừ một phép nhân mỗi bước) và thường nhanh hơn rõ rệt.

**Hai con trỏ** biến lập luận cận trên thành **quy tắc loại bỏ**: với cặp (left, right), giả sử `height[left] < height[right]`. Mọi cặp (left, j) với `left < j < right` đều hẹp hơn và mực nước ≤ `height[left]` ⇒ không cặp nào hơn cặp hiện tại. Vậy left đã "dùng hết giá trị", loại nó. Mỗi bước loại một tường ⇒ n − 1 bước, và cặp tối ưu không bao giờ bị loại trước khi được xét.

## Xếp hạng

1. **Hai con trỏ** – O(n)/O(1), đảm bảo.
2. **Brute force + cắt tỉa** – O(1) bộ nhớ, thường nhanh hơn brute force nhưng worst case như nhau.
3. **Brute force** – Θ(n²), chỉ dùng mở đầu hoặc làm oracle.

## Khi nào thứ hạng đổi

- **Cần mọi cặp đạt max, hoặc top-k cặp** ⇒ two pointers không liệt kê được; quay về duyệt (có cắt tỉa) hoặc kỹ thuật khác.
- **Diện tích dùng hàm khác** (vd `height[i] + height[j]` + khoảng cách) ⇒ lập luận loại tường thấp có thể sai; phải chứng minh lại, brute force là chốt an toàn.
- **n nhỏ (≤ 1000), cần code dễ review** ⇒ brute force chấp nhận được và ít rủi ro sai.
- **Ý tưởng "sort theo chiều cao"** (xét tường từ cao xuống thấp, giữ chỉ số min/max đã thấy) cũng đúng và O(n log n), nhưng không hơn two pointers về bất cứ mặt nào nên không đưa vào xếp hạng.
