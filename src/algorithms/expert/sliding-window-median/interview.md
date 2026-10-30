## Cách trình bày trong phỏng vấn

1. Làm rõ: `k` chẵn thì trả trung bình (kiểu số thực); giá trị có thể là ±2^31 nên cẩn thận tràn số khi cộng.
2. Nêu brute force (sắp mỗi cửa sổ, O(n·k log k)) rồi cải tiến lên **mảng sắp xếp + chèn nhị phân** (O(n·k)). Nhiều người phỏng vấn chấp nhận cách này nếu bạn phân tích đúng.
3. Đề xuất hai heap như bài 295: `low` max-heap, `high` min-heap, trung vị ở đỉnh.
4. Chỉ ra vấn đề: heap không xoá được phần tử giữa. Giải pháp là **xoá trễ** bằng `Map` đếm, kèm bộ đếm kích thước hợp lệ.
5. Viết code theo ba pha mỗi bước: thêm → bỏ (đánh dấu và prune) → cân bằng → đọc trung vị.
6. Chạy tay `[1,3,-1,-3,5]`, k = 3, và nêu độ phức tạp O(n log n), bộ nhớ O(n).

## Câu hỏi follow-up thường gặp

- **Tại sao chỉ cần prune đỉnh?** Ta chỉ đọc và chỉ di chuyển đỉnh, nên phần tử chết ở dưới không bao giờ được dùng cho tới khi nó nổi lên, và khi đó prune sẽ bỏ nó.
- **Tại sao phải đếm `lowSize` riêng?** `heap.size` có tính cả phần tử chết; cân bằng theo nó thì hai nửa hợp lệ lệch nhau và trung vị sai.
- **Giá trị trùng có vấn đề không?** `delayed` đếm theo giá trị nên có thể pop một bản sao khác, nhưng vì cùng giá trị nên kết quả không đổi.
- **Bộ nhớ tệ nhất?** O(n): ví dụ mảng tăng dần làm phần tử chết dồn ở đáy `low` mà không bao giờ lên đỉnh. Nếu cần O(k) thì dùng indexed heap hoặc multiset.
- **Khi nào cách mảng sắp xếp tốt hơn?** Khi `k` nhỏ: `splice` O(k) nhưng thân thiện cache và hằng số nhỏ, code ngắn hơn hẳn.
- **Ngôn ngữ có `TreeMap`/`multiset`?** Dùng hai multiset hoặc một multiset với iterator ở giữa (C++), dịch iterator khi thêm/xoá; được O(log k) và bộ nhớ O(k).
- **Đổi sang percentile 90 thay vì trung vị?** Vẫn hai heap nhưng tỉ lệ kích thước là 9:1; hoặc order-statistics tree.
- **Stream vô hạn, bộ nhớ hạn chế?** Dùng ước lượng xấp xỉ (t-digest, GK sketch) thay vì chính xác.

## Checklist nhận diện pattern

- "Trung vị / phần tử giữa của tập thay đổi động" ⇒ hai heap.
- "Heap nhưng phải xoá phần tử bất kỳ" ⇒ lazy deletion (Map đếm và prune ở đỉnh) hoặc indexed heap.
- "Cửa sổ trượt + thống kê thứ tự (max, min, median, percentile)" ⇒ max/min thì dùng deque, median thì dùng hai heap, thứ tự bất kỳ thì dùng BIT hoặc order-statistics tree.
- Ràng buộc `n ≤ 10^5`, `k` tuỳ ý ⇒ O(n·k) có thể TLE, cần O(n log n).

## Bài luyện tập liên quan

- 295 Find Median from Data Stream → 480 Sliding Window Median (Hard).
- 239 Sliding Window Maximum, 1438 Longest Continuous Subarray With Absolute Diff ≤ Limit.
- 502 IPO, 1825 Finding MK Average (Hard, cùng tư duy nhiều cấu trúc + xoá).
- 2102 Sequentially Ordinal Rank Tracker (hai heap).
