## Cách trình bày trong phỏng vấn

1. Hỏi rõ: khoảng là `[start, end)` hay `[start, end]`? Cuộc họp chạm đầu mút có dùng chung phòng không?
2. Quy bài toán: "Số phòng tối thiểu = số cuộc họp chồng lấn nhiều nhất tại một thời điểm."
3. Đưa ra cách tham lam: sắp theo start, min-heap giờ kết thúc; giải thích "nếu phòng rảnh sớm nhất còn bận thì mọi phòng đều bận".
4. Viết code; trong JS nói rõ cần tự cài heap (hoặc dùng `@datastructures-js/priority-queue` nếu được phép).
5. Nêu O(n log n) / O(n), rồi chủ động đưa cách thay thế hai con trỏ (sắp xếp riêng start và end).

## Câu hỏi follow-up thường gặp

- **Không dùng heap được không?** Sắp riêng mảng `starts` và `ends`; duyệt `starts`, nếu `starts[i] < ends[j]` thì `rooms++`, ngược lại `j++`. O(n log n), O(n).
- **Cần biết cuộc họp nào ở phòng nào?** Lưu `[end, roomId]` trong heap; khi pop, gán `roomId` đó cho cuộc họp mới.
- **Thời gian là số nguyên nhỏ?** Difference array + prefix sum, O(n + T).
- **Cuộc họp đến dạng stream, cần trả số phòng hiện tại?** TreeMap (start +1, end −1) và tính max prefix, hoặc segment tree với lazy propagation (My Calendar III).
- **Khoảng đóng `[start, end]`?** Đổi điều kiện `heap.min ≤ start` thành `<`.
- **Tại sao phải sắp theo start, không theo end?** Tham lam giả định mọi cuộc họp trong heap đã bắt đầu trước cuộc họp đang xét; sắp theo end phá vỡ điều đó.
- **Chứng minh tối ưu?** Cận dưới = độ chồng lấn tối đa; heap chỉ lớn lên khi có đúng `size + 1` cuộc họp đồng thời.

## Checklist nhận diện pattern

- Intervals + "tối thiểu tài nguyên", "số phòng/máy/gate", "peak concurrency" ⇒ sort by start + min-heap hoặc sweep line.
- "Phần tử kết thúc sớm nhất trong tập đang hoạt động" ⇒ min-heap theo end.
- Chỉ cần con số, không cần gán ⇒ hai mảng start/end + hai con trỏ.
- Thời gian nhỏ, rời rạc ⇒ difference array.

## Bài luyện tập liên quan

- 252 Meeting Rooms, 253 Meeting Rooms II, 2402 Meeting Rooms III (Hard).
- 56 Merge Intervals, 57 Insert Interval, 435 Non-overlapping Intervals.
- 1094 Car Pooling, 732 My Calendar III.
- 1851 Minimum Interval to Include Each Query (Hard), 2406 Divide Intervals Into Minimum Number of Groups.
