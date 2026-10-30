## Cách trình bày trong phỏng vấn

1. Làm rõ: `t` có ký tự lặp không (có – phải đếm số lần)? Phân biệt hoa/thường? Nhiều đáp án cùng độ dài trả cái nào (cái đầu tiên)?
2. Nêu brute force O(m²·k) trong 1 câu, rồi chỉ ra **tính đơn điệu**: cửa sổ hợp lệ thì mọi cửa sổ chứa nó cũng hợp lệ ⇒ sliding window giãn phải/co trái.
3. Giới thiệu `need` + `have/required` để kiểm tra hợp lệ O(1) – đây là điểm người phỏng vấn muốn nghe.
4. Viết code, nhấn mạnh hai ranh giới: `have++` khi `need` chạm **0**, `have--` khi `need` lên **dương**.
5. Chạy tay `ADOBECODEBANC / ABC` vài bước, rồi test biên: `t` dài hơn `s`, không có đáp án, `t = "aa"`.
6. Kết luận O(m + n) thời gian, O(k) bộ nhớ; nêu tối ưu mảng 128 phần tử.

## Câu hỏi follow-up thường gặp

- **Vì sao O(m) dù có vòng while lồng?** `left` chỉ tăng, tối đa m lần trong toàn bộ thuật toán (phân tích khấu hao).
- **Chỉ cần độ dài, s là stream?** Vẫn chạy được nếu giữ buffer cửa sổ hiện tại (deque), vì phải biết ký tự nào rời cửa sổ.
- **Yêu cầu giữ đúng thứ tự của t (subsequence)?** Đó là LC 727 – tính đơn điệu khác, dùng DP O(m·n) hoặc quét xuôi tìm điểm cuối rồi quét ngược thu hẹp.
- **t rất lớn, s rất dài, ít ký tự trùng?** Lọc trước các vị trí của s có ký tự thuộc t, chạy cửa sổ trên danh sách đó.
- **Unicode / emoji?** Duyệt theo code point (`Array.from`), dùng Map thay vì mảng 128.
- **Trả mọi cửa sổ tối thiểu?** Thu thập mọi `(left, right)` có độ dài bằng `bestLen` (reset khi tìm được ngắn hơn).

## Checklist nhận diện pattern

- "Substring/subarray **ngắn nhất** chứa đủ ..." ⇒ cửa sổ co-giãn, co trong `while` khi đã hợp lệ.
- Có yêu cầu "đủ số lượng" theo tần suất ⇒ bảng đếm `need` + biến đếm `have` cho O(1).
- "Dài nhất thoả ..." ⇒ cùng template nhưng co khi **không** hợp lệ, cập nhật best sau khi co.
- Cửa sổ độ dài cố định (anagram, permutation) ⇒ cùng need/have, trượt đều.

## Bài luyện tập liên quan

- 76 Minimum Window Substring (bài này) → 567 Permutation in String → 438 Find All Anagrams.
- 209 Minimum Size Subarray Sum, 3 Longest Substring Without Repeating Characters.
- 30 Substring with Concatenation of All Words, 727 Minimum Window Subsequence, 632 Smallest Range Covering Elements from K Lists.
