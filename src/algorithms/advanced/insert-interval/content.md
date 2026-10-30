## Bài toán

Cho danh sách `intervals` gồm các khoảng `[start, end]` **đã sắp xếp theo start** và **không chồng lấn**, cùng một khoảng mới `newInterval`. Hãy chèn `newInterval` vào danh sách sao cho kết quả vẫn sắp xếp và không có hai khoảng nào chồng lấn (gộp nếu cần). Đây là LeetCode 57.

Ví dụ: `intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]`, `newInterval = [4,8]` ⇒ `[[1,2],[3,10],[12,16]]`. Khoảng `[4,8]` chạm vào `[3,5]`, `[6,7]`, `[8,10]` nên cả bốn được gộp thành `[3,10]`.

## Ý tưởng / Trực giác

Cách "lười" là thêm `newInterval` vào cuối rồi chạy lại Merge Intervals – đúng, nhưng tốn O(n log n) vì phải sắp xếp, trong khi input **đã sắp xếp sẵn**. Bỏ phí thông tin đó là dấu hiệu bạn chưa đọc kỹ đề.

Trực giác: đặt khoảng mới lên trục số. Mọi khoảng cũ rơi vào đúng **một trong ba vùng**:

1. **Bên trái hoàn toàn** – kết thúc trước khi khoảng mới bắt đầu (`end_i < start`).
2. **Chồng lấn** – chạm vào khoảng mới ở đâu đó.
3. **Bên phải hoàn toàn** – bắt đầu sau khi khoảng mới kết thúc (`start_i > end`).

Vì danh sách đã sắp xếp và rời nhau, ba vùng này là **ba đoạn liên tiếp** trong mảng: trái – giữa – phải. Do đó chỉ cần một con trỏ `i` đi một lượt qua ba vòng `while`.

## Thuật toán từng bước

1. Khởi tạo `result = []`, `[start, end] = newInterval`, `i = 0`.
2. **Pha 1:** trong khi `intervals[i].end < start`, chép `intervals[i]` vào `result`, tăng `i`.
3. **Pha 2:** trong khi `intervals[i].start <= end`, gộp: `start = min(start, intervals[i].start)`, `end = max(end, intervals[i].end)`, tăng `i`.
4. Đẩy `[start, end]` (đã gộp) vào `result`.
5. **Pha 3:** chép toàn bộ phần còn lại vào `result`.
6. Trả `result`.

Hãy để ý điều kiện pha 2 chỉ kiểm tra **một đầu** (`start_i <= end`). Đầu kia (`end_i >= start`) đã được đảm bảo vì pha 1 vừa dừng lại ở chính chỗ đó.

## Chứng minh đúng (loop invariant)

**Bất biến pha 1:** mọi khoảng trong `result` kết thúc trước `start` và giữ nguyên thứ tự gốc. Khi pha 1 dừng ở `i`, ta có `end_i >= start`; vì các khoảng sắp xếp và rời nhau nên `end` tăng dần, mọi khoảng `j ≥ i` cũng có `end_j >= start`.

**Bất biến pha 2:** `[start, end]` là hợp của `newInterval` với mọi khoảng đã duyệt trong pha 2, và các khoảng này đều chồng lấn với nó. Hai khoảng `[a,b]`, `[c,d]` chồng lấn khi và chỉ khi `a <= d` và `c <= b`. Với khoảng `i` trong pha 2: `end_i >= start` (từ pha 1) và `start_i <= end` (điều kiện vòng lặp) ⇒ chồng lấn thật sự. Khi pha 2 dừng, `start_i > end` và mọi khoảng sau đều bắt đầu muộn hơn ⇒ không còn khoảng nào chạm vào `[start, end]`.

**Kết luận:** result = (trái, đã sắp xếp) + (khoảng gộp) + (phải, đã sắp xếp); giữa các nhóm không có chồng lấn ⇒ kết quả sắp xếp và rời nhau.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| 3 pha (bài này) | O(n) | O(n) cho output |
| Thêm vào rồi Merge Intervals | O(n log n) | O(n) |
| Binary search tìm biên + splice | O(log n) tìm, O(n) chép | O(n) |

Mỗi khoảng được xét đúng một lần ⇒ O(n). Output có thể dài n + 1 nên không thể dưới O(n) nếu phải trả mảng mới.

## Tradeoff

- **Linear scan vs binary search:** có thể dùng binary search để tìm vị trí bắt đầu và kết thúc của vùng chồng lấn trong O(log n), nhưng vẫn phải tạo mảng kết quả O(n). Binary search chỉ có lợi khi cấu trúc cho phép sửa tại chỗ (ví dụ `TreeMap` / balanced BST).
- **Tạo mảng mới vs sửa tại chỗ:** sửa tại chỗ bằng `splice` tiết kiệm bộ nhớ nhưng dễ lỗi chỉ số và vẫn O(n) do dịch phần tử.

## Lợi / Hại

**Lợi:**
- O(n), không cần sắp xếp lại.
- Code ngắn, ba vòng while rõ nghĩa, dễ giải thích trên bảng trắng.
- Không làm thay đổi input.

**Hại:**
- Phụ thuộc vào giả định input đã sắp xếp và rời nhau; nếu sai giả định, kết quả sai mà không báo lỗi.
- Nếu phải chèn liên tục nhiều khoảng (stream), mỗi lần O(n) là quá chậm – nên dùng cây cân bằng.

## Use case thực tế

- **Lịch (calendar):** thêm một cuộc họp vào lịch bận đã được gộp sẵn để tính "khung giờ bận".
- **Range lock / quản lý vùng nhớ:** thêm một vùng đã cấp phát vào danh sách vùng rời nhau.
- **Lọc IP / dải cổng:** thêm một dải mới vào danh sách dải cho phép đã chuẩn hoá.
- **Text editor:** gộp vùng chọn (selection) mới với các vùng highlight hiện có.

## Lỗi thường gặp

- Dùng `<` thay vì `<=` ở pha 2 ⇒ `[1,5]` và `[5,7]` (chạm đầu mút) không được gộp. Đọc kỹ đề: đa số coi chạm đầu mút là chồng lấn.
- Chỉ lấy `end = intervals[i].end` thay vì `max` ⇒ sai khi khoảng mới lớn hơn khoảng cũ.
- Quên đẩy khoảng đã gộp vào result khi pha 2 không chạy lần nào (khoảng mới không chạm ai).
- Quên kiểm tra `i < n` trong điều kiện while ⇒ truy cập ngoài mảng.
- Đẩy tham chiếu `intervals[i]` rồi sửa nó sau đó ⇒ làm hỏng input của người gọi.

## Biến thể

- **LeetCode 56 – Merge Intervals:** không có thứ tự sẵn ⇒ sắp xếp rồi quét.
- **Remove Interval (LeetCode 1272):** cùng 3 pha nhưng pha giữa cắt bỏ thay vì gộp.
- **LeetCode 352 – Data Stream as Disjoint Intervals:** chèn liên tục ⇒ dùng `TreeMap` để đạt O(log n) mỗi lần.
- **LeetCode 715 – Range Module:** thêm/xoá/truy vấn dải, tổng quát hoá bài này.
- **Interval List Intersections (LeetCode 986):** hai con trỏ trên hai danh sách đã sắp xếp.
