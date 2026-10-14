## Kịch bản trình bày

1. **Làm rõ**: bảng chữ cái? phân biệt hoa thường?
2. **Sort** (20s): "Sort cả hai rồi so sánh, O(n log n). Đủ đúng nhưng ta không cần thứ tự, chỉ cần đếm."
3. **Đếm** (1 phút): "Đếm tần suất: cộng theo s, trừ theo t; nếu có giá trị âm hoặc khác 0 ⇒ không phải anagram. O(n)."
4. **Tối ưu bộ nhớ** (30s): "Với a–z dùng mảng 26 thay HashMap ⇒ O(1) bộ nhớ, nhanh hơn về hằng số."
5. **Kiểm tra độ dài trước** để dừng sớm – chi tiết nhỏ nhưng người phỏng vấn để ý.

## Follow-up thường gặp

- **Unicode?** HashMap theo code point; tách chuỗi bằng `[...s]` hoặc `for…of` để không vỡ surrogate pair.
- **Group Anagrams?** Khoá = chuỗi sort hoặc chuỗi đếm 26 số; HashMap khoá → danh sách. O(N·L log L) hoặc O(N·L).
- **Kiểm tra anagram trong cửa sổ trượt (Find All Anagrams in a String)?** Mảng đếm 26 + cửa sổ cố định độ dài |p|, duy trì số ký tự "khớp".
- **Bộ nhớ O(1) với Unicode?** Không có cách tuyến tính; sort tại chỗ O(n log n) là lựa chọn.
- **Chuỗi cực dài không vừa bộ nhớ?** Đếm theo luồng (map nhỏ vì bảng chữ cái nhỏ), không cần giữ chuỗi.
