## Cách trình bày trong phỏng vấn

1. Làm rõ luật: loại key freq nhỏ nhất, hoà thì loại key lâu không dùng nhất; `put` ghi đè có tính là dùng; `capacity` có thể bằng 0.
2. Nói vì sao cách đơn giản chưa đạt: heap theo `(freq, time)` cho O(log n), quét tìm min cho O(n).
3. Đề xuất ba cấu trúc: `key → {value, freq}`, `freq → ordered set of keys`, `minFreq`. Nhấn mạnh rằng mỗi bucket là một LRU nhỏ.
4. Viết `touch` trước (trái tim của bài), rồi `get` và `put`.
5. Chạy tay ví dụ capacity 2, chỉ ra lúc phá hoà bằng LRU (key 1 và 3 cùng freq 2).
6. Nêu O(1) và giải thích vì sao `minFreq` không bao giờ cần quét lại.

## Câu hỏi follow-up thường gặp

- **Vì sao chỉ cần `minFreq++` mà không phải tìm lại?** Trong `touch`, bucket `minFreq` chỉ rỗng khi key vừa rời nó, và key đó lập tức vào bucket `minFreq + 1`. Khi thêm key mới thì min chắc chắn là 1.
- **Sau khi loại nạn nhân có cập nhật `minFreq` không?** Không cần, vì ngay sau đó key mới đặt `minFreq = 1`.
- **Ngôn ngữ không có ordered set?** Dùng `Map<freq, DoublyLinkedList>` và `Map<key, node>`, giống LRU nhưng có nhiều danh sách.
- **LFU hay LRU cho hệ thống của bạn?** Tuỳ workload: tập key nóng ổn định và có scan thì chọn LFU; xu hướng thay đổi nhanh thì chọn LRU; thực tế nên dùng W-TinyLFU.
- **Key từng hot nay nguội chiếm chỗ mãi?** Thêm decay (chia đôi freq định kỳ) hoặc giới hạn freq tối đa (Redis dùng bộ đếm logarit 8-bit).
- **Đa luồng?** Shard theo hash key, mỗi shard một khoá; hoặc ghi lại sự kiện truy cập vào buffer rồi cập nhật tần suất theo lô (Caffeine).
- **Muốn lấy cả key dùng nhiều nhất?** Giữ thêm `maxFreq` hoặc danh sách bucket có thứ tự như bài 432.

## Checklist nhận diện pattern

- "Eviction theo tần suất, hoà theo thời gian, O(1)" ⇒ bucket theo tần suất + `minFreq`.
- "Tăng/giảm đếm theo bước 1 và cần min/max nhanh" ⇒ bucket theo đếm (không dùng heap), vì đếm chỉ đổi ±1 nên con trỏ min/max chỉ dịch ±1.
- "O(1) + cần thứ tự trong nhóm" ⇒ ordered set / LinkedHashSet / DLL cho mỗi bucket.
- Đã biết LRU ⇒ LFU là "nhiều LRU xếp theo tần suất".

## Bài luyện tập liên quan

- 146 LRU Cache → 460 LFU Cache (Hard).
- 432 All O`one Data Structure (Hard), 895 Maximum Frequency Stack (Hard).
- 1756 Design Most Recently Used Queue, 2034 Stock Price Fluctuation.
