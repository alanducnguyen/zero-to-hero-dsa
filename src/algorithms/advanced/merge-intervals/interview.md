## Cách trình bày trong phỏng vấn

1. Hỏi: khoảng đóng hay mở? Chạm đầu mút có gộp không? Input có sắp xếp sẵn không?
2. Nêu ý tưởng "sắp xếp theo start rồi chỉ so với khoảng cuối" và **tại sao** chỉ cần so với khoảng cuối.
3. Code 10 dòng; nhấn mạnh `max` khi gộp.
4. O(n log n) do sắp xếp; O(n) nếu đã sắp xếp.
5. Liên hệ các bài cùng họ – người phỏng vấn thường hỏi tiếp Meeting Rooms II hoặc Insert Interval.

## Câu hỏi follow-up thường gặp

- **Số phòng họp tối thiểu (253)?** Sắp xếp theo start; min-heap chứa end của các cuộc họp đang diễn ra; với mỗi cuộc họp, pop các end ≤ start, push end; đáp án = kích thước heap lớn nhất. Hoặc sweep: tách start (+1) và end (−1), sắp xếp, tính max tổng chạy.
- **Chèn một khoảng vào danh sách đã rời nhau (57)?** Ba pha: thêm các khoảng kết thúc trước newStart; gộp các khoảng chồng vào new; thêm phần còn lại. O(n).
- **Bỏ ít khoảng nhất để không chồng (435)?** Tham lam theo **end**: giữ khoảng kết thúc sớm nhất, bỏ khoảng chồng với nó. Giống Activity Selection.
- **Giao của hai danh sách khoảng (986)?** Two pointers: giao = [max start, min end] nếu hợp lệ; tiến con trỏ có end nhỏ hơn.
- **Khoảng đến liên tục, cần gộp online?** TreeMap theo start: tìm floor/ceiling, gộp với lân cận, O(log n) mỗi lần (Range Module).
- **Tổng độ dài sau gộp?** Cộng `end − start` của kết quả.
- **Khoảng 2D (hình chữ nhật chồng lấn)?** Sweep line theo x + segment tree theo y; hoặc union area bằng tách sự kiện.
- **Nếu không được sắp xếp (O(n) bộ nhớ hạn chế)?** Không có cách tổng quát O(n) không sắp xếp; nếu toạ độ nguyên trong miền nhỏ, dùng difference array / bitset.

## Checklist nhận diện pattern

- "Khoảng", "lịch", "thời gian bắt đầu/kết thúc", "chồng lấn" ⇒ sắp xếp theo start rồi quét.
- "Số tài nguyên cần cùng lúc" ⇒ sweep events hoặc heap theo end.
- "Chọn nhiều nhất không chồng" / "bỏ ít nhất" ⇒ sắp xếp theo end, tham lam.
- "Cập nhật động nhiều lần" ⇒ TreeMap / segment tree.

## Bài luyện tập liên quan

- 56 Merge Intervals → 57 Insert Interval → 252/253 Meeting Rooms I/II.
- 435 Non-overlapping Intervals, 452 Minimum Arrows to Burst Balloons, 986 Interval List Intersections.
- 759 Employee Free Time (Hard), 715 Range Module (Hard), 1288 Remove Covered Intervals.
