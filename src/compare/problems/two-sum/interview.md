## Kịch bản trình bày (5–7 phút)

1. **Làm rõ đề** (30s): đúng một đáp án? trả chỉ số? có số âm/trùng?
2. **Brute force** (30s): "Thử mọi cặp là O(n²). Với n = 10⁴ vẫn chạy nhưng không mở rộng được." Không cần code.
3. **Nhận xét then chốt** (1 phút): "Với mỗi x tôi chỉ cần biết target − x đã xuất hiện chưa. Đó là câu hỏi membership ⇒ HashMap O(1)."
4. **Code HashMap** (2 phút), nêu vì sao kiểm tra trước rồi mới `set` (tránh dùng chính nó).
5. **Phân tích** (30s): O(n) thời gian, O(n) bộ nhớ, worst case hash O(n) nhưng thực tế không xảy ra.
6. **Nhắc cách khác** (30s): "Nếu mảng đã sắp xếp hoặc cần O(1) bộ nhớ, dùng sort + two pointers O(n log n)."

## Follow-up thường gặp

- **Mảng đã sắp xếp?** Two pointers O(n), O(1) – không cần hash.
- **Có nhiều đáp án, trả về tất cả?** HashMap đếm tần suất, cẩn thận cặp (x, x) và không đếm trùng.
- **3Sum?** Sort + cố định một phần tử + two pointers O(n²); hash cũng O(n²) nhưng khó khử trùng.
- **Dữ liệu là luồng, hỏi "có cặp nào tổng = target" liên tục?** Design: HashMap đếm, `add` O(1), `find` O(n) (LeetCode 170).
- **Giá trị rất lớn, hash bị tấn công va chạm?** Sort + two pointers cho worst case đảm bảo O(n log n).
- **Bộ nhớ O(1) và không được sort tại chỗ?** Chỉ còn brute force – nói rõ đó là tradeoff.
