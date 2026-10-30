## Bảng so sánh

| Lời giải | Thời gian | Bộ nhớ | Sửa input? | Rủi ro |
|---|---|---|---|---|
| Sort + quét | O(n log n) | O(n) bản sao (hoặc O(1) nếu sort tại chỗ) | Có nếu sort tại chỗ | Chậm nhất |
| HashSet | O(n) | O(n) | Không | Tốn bộ nhớ, hằng số hash |
| Tổng Gauss | O(n) | O(1) | Không | **Tràn số** với int 32-bit |
| XOR | O(n) | O(1) | Không | Không – khó nghĩ ra hơn |

## Phân tích

**Sort + quét** dựa trên quan sát: sau khi sắp xếp, mảng "đủ" phải có `sorted[i] = i`; vị trí lệch đầu tiên là đáp án, và nếu không lệch thì đáp án là `n`. Dễ giải thích nhưng trả giá O(n log n) cho một thông tin chỉ cần O(n). Sort tại chỗ thì phá input – thường không được phép.

**HashSet** bỏ chi phí sort: mỗi câu hỏi "k có mặt?" là O(1). Đây là lời giải tổng quát nhất – vẫn đúng nếu đề đổi thành "tìm mọi số thiếu" hay giá trị không liên tiếp – nhưng tốn O(n) bộ nhớ, đúng thứ follow-up muốn loại.

**Tổng Gauss** khai thác cấu trúc đặc biệt: tập đầy đủ là `0..n`, nên tổng kỳ vọng biết trước là `n(n+1)/2`. Hiệu giữa tổng kỳ vọng và tổng thực chính là số thiếu. O(1) bộ nhớ, một lượt. Điểm yếu: ở Java/C++ `int`, `n(n+1)/2` tràn khi n vượt khoảng 65 535. Sửa bằng `long` hoặc tích lũy `sum += i − nums[i]` để giá trị trung gian luôn nhỏ.

**XOR** dùng ba tính chất `x ^ x = 0`, `x ^ 0 = x`, giao hoán/kết hợp. XOR toàn bộ chỉ số `0..n` với toàn bộ giá trị: mỗi số có mặt xuất hiện hai lần và tự hủy, chỉ số thiếu còn lại. Không bao giờ tràn vì kết quả trung gian không vượt quá số bit của n. Đây là đáp án "chuẩn" mà interviewer bit-manipulation mong đợi.

## Xếp hạng

1. **XOR** – O(n)/O(1), không tràn số, không sửa input.
2. **Gauss** – cùng độ phức tạp, dễ hiểu hơn, nhưng phải nói rõ caveat tràn số (hoặc dùng biến thể trừ dần).
3. **HashSet** – O(n) nhưng tốn bộ nhớ; chọn khi bài tổng quát hơn (nhiều số thiếu, giá trị bất kỳ).
4. **Sort + quét** – chỉ để mở đầu, hoặc khi mảng đã sắp xếp sẵn (lúc đó binary search còn cho O(log n)!).

## Khi nào lời giải "kém" lại thắng

- Mảng **đã sắp xếp**: binary search tìm chỉ số đầu tiên có `nums[i] ≠ i` – O(log n), đánh bại cả XOR.
- Cần trả về **nhiều số thiếu**: Gauss và XOR sụp đổ (chỉ giải được 1–2 ẩn); HashSet hoặc đánh dấu âm tại chỗ thắng.
