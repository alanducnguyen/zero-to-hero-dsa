## Bảng so sánh

| Lời giải | Thời gian | Bộ nhớ | Số lần tính hours(k) | Ghi chú |
|---|---|---|---|---|
| Quét tuyến tính | O(n · max) | O(1) | tới max (10⁹) | Nhanh chỉ khi đáp án nhỏ |
| **Binary search [1, max]** ★ | O(n · log max) | O(1) | ⌈log₂ max⌉ ≈ 30 | Đơn giản, chuẩn mực |
| Binary search cận chặt | O(n · log max) worst | O(1) | ≤ log₂(hi − lo + 1), cộng 1 lượt tính sum | Lợi hằng số, không lợi Big-O |

## Phân tích

**Quét tuyến tính** đúng nhưng phí: khi k = 5 không kịp, ta *đã biết* mọi k < 5 cũng không kịp, nhưng thuật toán vẫn đi từng bước. Thú vị là nó dừng tại đáp án, nên chi phí thật là O(n · answer) – rất rẻ khi h lớn (đáp án nhỏ), rất đắt khi h ≈ n (đáp án ≈ max).

**Binary search trên đáp án** khai thác tính đơn điệu: hours(k) không tăng khi k tăng, nên vị từ `hours(k) ≤ h` có dạng sai…sai đúng…đúng. Tìm điểm chuyển cần ⌈log₂ max⌉ lần thử, mỗi lần O(n). Với max = 10⁹ là ~30 · n phép tính.

**Cận chặt** dùng hai bất đẳng thức:

- Cận dưới: ⌈p/k⌉ ≥ p/k ⇒ hours(k) ≥ sum/k ⇒ cần k ≥ ⌈sum/h⌉.
- Cận trên (khi h > n): ⌈p/k⌉ < p/k + 1 ⇒ hours(k) < sum/k + n ⇒ mọi k ≥ ⌈sum/(h − n)⌉ đều kịp.

**Có nhanh hơn về mặt tiệm cận không? Thành thật: không.** Worst case h = n thì cận trên không áp dụng, khoảng vẫn là [⌈sum/n⌉, max] – với một đống rất lớn và các đống nhỏ, độ dài khoảng vẫn Θ(max) ⇒ vẫn Θ(log max) vòng. Lợi ích chỉ là hằng số: khi h ≫ n, hi/lo ≈ h/(h − n) ≈ 1 nên khoảng co về vài giá trị và chỉ cần vài lần thử. Đổi lại phải tính thêm sum (một lượt O(n)), viết thêm công thức phải chứng minh, và rủi ro chia cho 0 khi quên điều kiện h > n. Vì vậy xếp nó **sau** bản [1, max]: trong phỏng vấn, cùng Big-O thì bản dễ chứng minh đúng hơn thắng; cận chặt là điểm cộng khi được hỏi "tối ưu thêm".

## Xếp hạng

1. **Binary search [1, max]** – O(n log max), ngắn, khó sai.
2. **Binary search cận chặt** – cùng Big-O, ít vòng hơn khi h ≫ n, thêm độ phức tạp.
3. **Quét tuyến tính** – O(n · max), TLE với max = 10⁹.

## Khi nào thứ hạng đổi

- **Mỗi lần thử vị từ cực đắt** (vd gọi dịch vụ, mô phỏng lâu) ⇒ cận chặt lên hạng 1: bớt vài lần thử là đáng.
- **Biết chắc đáp án rất nhỏ** (h rất lớn) ⇒ quét tuyến tính O(n · answer) có thể nhanh ngang binary search và đơn giản hơn – hoặc dùng *exponential search* (k = 1, 2, 4, …) rồi binary search: O(n log answer).
- **Giá trị nhỏ, n rất lớn, nhiều truy vấn h khác nhau** ⇒ tiền xử lý hours(k) cho mọi k bằng đếm tần suất + prefix sum (O(max log max) một lần), mỗi truy vấn binary search O(log max) không tốn O(n).
