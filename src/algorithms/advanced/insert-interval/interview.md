## Cách trình bày trong phỏng vấn

1. Nhắc lại giả định: input **đã sắp xếp và rời nhau** – hỏi interviewer xác nhận, và hỏi chạm đầu mút (`[1,5]` và `[5,7]`) có tính là chồng lấn không.
2. Nêu cách brute force: thêm vào rồi Merge Intervals, O(n log n). Sau đó nói "nhưng input đã sắp xếp nên ta làm được O(n)".
3. Vẽ trục số, chia ba vùng trái – chồng lấn – phải. Viết ba vòng while với **một** con trỏ `i`.
4. Chạy tay 2 case: khoảng mới không chạm ai, và khoảng mới nuốt tất cả.
5. Kết luận: O(n) thời gian, O(n) bộ nhớ cho output.

## Câu hỏi follow-up thường gặp

- **Tại sao pha 2 chỉ cần kiểm tra `start_i <= end`?** Vì pha 1 đã dừng nghĩa là `end_i >= start`; hai điều kiện đó gộp lại chính là định nghĩa chồng lấn.
- **Làm nhanh hơn O(n) được không?** Tìm biên bằng binary search O(log n), nhưng tạo output vẫn O(n). Chỉ nhanh hơn thật sự nếu lưu trong cây cân bằng (`TreeMap`) và sửa tại chỗ.
- **Nếu phải chèn hàng triệu khoảng liên tục?** Dùng `TreeMap<start, end>`: tìm `floorKey`/`ceilingKey`, gộp và xoá các khoảng bị nuốt – mỗi khoảng chỉ bị xoá một lần ⇒ O(log n) amortized.
- **Nếu input chưa sắp xếp?** Thì đây chính là Merge Intervals – sắp xếp O(n log n) rồi quét.
- **Sửa tại chỗ (in-place) thế nào?** Tìm đoạn `[l, r)` chồng lấn, `splice(l, r - l, merged)`; vẫn O(n) do dịch phần tử.

## Checklist nhận diện pattern

- Đề cho danh sách khoảng **đã sắp xếp, rời nhau** và một thao tác trên một khoảng ⇒ nghĩ tới 3 pha trái – giữa – phải.
- Đề có chữ "insert", "add range", "free slot", "busy time" ⇒ pattern intervals.
- Hai khoảng `[a,b]`, `[c,d]` chồng lấn ⇔ `a <= d && c <= b` – thuộc lòng công thức này.

## Bài luyện tập liên quan

- LeetCode 57 – Insert Interval.
- LeetCode 56 – Merge Intervals.
- LeetCode 1272 – Remove Interval.
- LeetCode 986 – Interval List Intersections.
- LeetCode 352 – Data Stream as Disjoint Intervals.
- LeetCode 715 – Range Module.
