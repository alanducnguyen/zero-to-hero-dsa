## Cách trình bày trong phỏng vấn

1. Làm rõ đề: các số **phân biệt**? Luôn nằm trong `[0, n]`? Thiếu **đúng một**? Được sửa mảng không?
2. Nêu cách dễ: hash set (`O(n)` bộ nhớ) hoặc sắp xếp (`O(n log n)`), rồi đề xuất tối ưu `O(1)` bộ nhớ.
3. Đưa ra tổng Gauss `n(n+1)/2 − sum` và **chủ động nhắc rủi ro tràn int32** – đây là điểm cộng.
4. Chuyển sang XOR: `x ^ x = 0`, `x ^ 0 = x`, giao hoán ⇒ XOR chỉ số `0..n` với mọi giá trị, cặp trùng triệt tiêu.
5. Chạy tay `[3, 0, 1]` ⇒ `3 ^ (0^3) ^ (1^0) ^ (2^1) = 2`. Chốt `O(n)` / `O(1)`.

## Câu hỏi follow-up thường gặp

- **Nếu thiếu hai số?** XOR ra `a ^ b`; lấy bit thấp nhất bằng 1 (`x & -x`) để chia mọi số thành hai nhóm, XOR riêng từng nhóm (giống LC 260). Hoặc dùng tổng và tổng bình phương.
- **Nếu mảng đã sắp xếp?** Binary search tìm chỉ số đầu tiên có `nums[i] != i` – `O(log n)`.
- **Nếu dữ liệu stream rất lớn, không lưu được?** XOR và Gauss đều chạy một lượt với `O(1)` trạng thái – phù hợp stream.
- **Sửa Gauss để không tràn?** Cộng dồn `i − nums[i]` xen kẽ, hoặc dùng `long`.
- **Nếu có số trùng/ngoài khoảng?** XOR không còn đúng; dùng hash set hoặc cyclic sort với kiểm tra biên.

## Checklist nhận diện pattern

- Giá trị nằm trong **đoạn `[0, n]` hoặc `[1, n]`** gắn với chỉ số ⇒ nghĩ tới XOR chỉ số, cyclic sort hoặc đánh dấu âm.
- "Mọi phần tử xuất hiện cặp đôi trừ một" ⇒ XOR toàn bộ.
- Yêu cầu `O(1)` bộ nhớ, không sửa đầu vào ⇒ XOR/tổng toán học.
- Phép cộng có thể tràn ⇒ ưu tiên XOR.

## Bài luyện tập liên quan

- LeetCode 268 – Missing Number.
- LeetCode 136 – Single Number.
- LeetCode 260 – Single Number III.
- LeetCode 448 – Find All Numbers Disappeared in an Array.
- LeetCode 645 – Set Mismatch.
- LeetCode 41 – First Missing Positive.
