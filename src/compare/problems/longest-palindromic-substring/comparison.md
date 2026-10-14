## Phân tích

**Brute force** O(n³): n² đoạn, mỗi đoạn kiểm tra O(n). Với n = 1000 là ~10⁹ bước – sát ngưỡng. Chỉ để làm rõ đề.

**DP 2D** định nghĩa `dp[i][j]` = s[i..j] là palindrome; công thức `s[i] === s[j] && dp[i+1][j-1]`. O(n²) thời gian nhưng **O(n²) bộ nhớ** (10⁶ ô với n = 1000 – ổn, nhưng lãng phí). Ưu điểm: bảng dp tái dùng được cho bài khác (Palindrome Partitioning cần đúng bảng này), và tư duy "điền theo độ dài tăng dần" là kỹ năng DP khoảng (interval DP).

**Expand around center** lật góc nhìn: thay vì hỏi "đoạn [i, j] có phải palindrome?", hỏi "palindrome tâm tại c dài bao nhiêu?". 2n−1 tâm, mỗi tâm mở rộng tối đa O(n) ⇒ O(n²) worst case nhưng **O(1) bộ nhớ** và thực tế rất nhanh vì hầu hết tâm dừng sau 1–2 bước. Đây là đáp án mong đợi.

**Manacher** (không trace ở đây) đạt O(n) bằng cách tái dùng thông tin đối xứng của các tâm trước. Nhắc tên là đủ; hiếm phỏng vấn nào yêu cầu code.

## Xếp hạng

1. **Expand around center** – O(n²)/O(1). Mặc định.
2. **DP 2D** – O(n²)/O(n²). Chọn khi cần bảng palindrome cho bước sau (partitioning, đếm palindrome con).
3. **Brute force** – O(n³)/O(1). Chỉ để mở đầu.

## Khi nào thứ hạng đổi

- n = 10⁵ ⇒ chỉ Manacher O(n) (hoặc hashing + nhị phân O(n log n)) chạy được.
- Hỏi "số palindrome con" (Palindromic Substrings) ⇒ expand center đếm được ngay; DP cũng vậy.
- Hỏi "cắt chuỗi thành ít palindrome nhất" ⇒ cần bảng DP 2D, cách DP lên hạng 1.
- Subsequence thay vì substring ⇒ bài khác hoàn toàn (LCS với reverse).
