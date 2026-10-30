## Kịch bản trình bày (5–7 phút)

1. **Làm rõ đề** (30s): chạm đầu mút có gộp không? khoảng đóng hay nửa mở? toạ độ lớn cỡ nào? được sort tại chỗ không?
2. **Điều kiện chồng lấn** (30s): "Hai khoảng chồng nhau khi `a.start ≤ b.end` và `b.start ≤ a.end`." Viết ra trước – mọi lời giải đều dựa vào nó.
3. **Brute force** (30s): "Lặp gộp bất kỳ cặp nào chồng nhau tới khi ổn định – O(n³)." Không cần code.
4. **Nhận xét then chốt** (1 phút): "Nếu sắp xếp theo start, khoảng có thể chồng với khoảng hiện tại chỉ có thể là khoảng cuối của kết quả." Vẽ ví dụ `[1,3] [2,6] [8,10]`.
5. **Code sort + quét** (2 phút). Nhấn mạnh `max(last.end, end)` cho trường hợp lồng nhau `[1,10] [2,3]`.
6. **Phân tích** (30s): O(n log n) do sort, quét O(n); bộ nhớ O(n) cho kết quả (O(log n) cho sort nếu được sửa input).
7. **Nhắc line sweep** (30s): "Nếu toạ độ là số nguyên trong miền nhỏ, mảng đếm +1/−1 cho O(n + R) không cần sort – nhưng phải cẩn thận biên chạm đầu mút."

## Follow-up thường gặp

- **Insert Interval (57)**: danh sách đã sort và rời nhau, chèn một khoảng mới ⇒ một lượt O(n): thêm các khoảng kết thúc trước, gộp các khoảng chồng, thêm phần còn lại.
- **Meeting Rooms II (253)**: số phòng tối thiểu = độ phủ lớn nhất ⇒ đúng line sweep (+1/−1, cùng thời điểm thì −1 trước vì `[9,10]` và `[10,11]` không xung đột) hoặc min-heap theo end.
- **Non-overlapping Intervals (435)**: xoá ít nhất để không còn chồng ⇒ greedy sort theo **end**, khác bài này.
- **Khoảng nửa mở `[a, b)`?** Điều kiện thành `start < last.end`; với mảng đếm, −1 đặt ngay tại ô `end` là đúng, không cần nhân đôi.
- **Toạ độ 10⁹ nhưng muốn line sweep?** Nén toạ độ (coordinate compression) – nhưng nén cần sort ⇒ quay về O(n log n).
- **Dữ liệu đến dạng luồng, hỏi tập khoảng đã gộp bất kỳ lúc nào?** TreeMap/cây cân bằng theo start: chèn O(log n) + gộp láng giềng (LeetCode 352 Data Stream as Disjoint Intervals).
- **Song song hoá cho dữ liệu cực lớn?** Chia theo dải toạ độ, mỗi worker sort + gộp, rồi gộp các ranh giới – mỗi phần chỉ có thể dính với phần kề bên.
