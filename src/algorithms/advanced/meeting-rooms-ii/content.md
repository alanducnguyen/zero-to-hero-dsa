## Bài toán

Cho danh sách cuộc họp `[start, end)`. Tìm **số phòng họp ít nhất** để tổ chức tất cả mà không có hai cuộc họp trùng giờ trong cùng một phòng. Cuộc họp kết thúc lúc `t` và cuộc khác bắt đầu lúc `t` **không** trùng (dùng chung phòng được).

Ví dụ `[[0,30],[5,10],[15,20]]` ⇒ 2: cuộc `0-30` chiếm một phòng suốt, `5-10` và `15-20` dùng chung phòng thứ hai. Đây là LeetCode 253 – một trong những câu hỏi được Google, Meta, Amazon hỏi nhiều nhất về intervals.

## Ý tưởng / Trực giác

Hãy đóng vai lễ tân: các cuộc họp tới theo **thứ tự giờ bắt đầu**. Khi một cuộc họp mới tới, bạn chỉ cần hỏi: "Phòng nào **trống sớm nhất**? Nó đã trống chưa?"

- Nếu phòng trống sớm nhất đã rảnh (`giờ kết thúc ≤ start`) ⇒ giao phòng đó, không cần mở thêm.
- Nếu ngay cả phòng trống sớm nhất vẫn bận ⇒ **mọi** phòng đều bận ⇒ bắt buộc mở phòng mới.

Câu hỏi "giờ kết thúc nhỏ nhất trong các phòng đang dùng" là việc của **min-heap**: lấy min O(1), thêm/xoá O(log n). Kích thước heap = số phòng đang được dùng; kích thước lớn nhất từng đạt chính là đáp án.

## Thuật toán từng bước

1. Sắp xếp cuộc họp theo `start` tăng dần.
2. Heap rỗng, `rooms = 0`.
3. Với mỗi cuộc họp `[start, end]`:
   - Nếu heap không rỗng và `heap.min ≤ start` ⇒ `popMin` (tái sử dụng phòng đó).
   - `push(end)` – phòng được giao bận tới `end`.
   - `rooms = max(rooms, heap.size)`.
4. Trả `rooms`.

Vì mỗi bước chỉ pop **tối đa một** phần tử, heap có thể còn chứa các phòng đã rảnh – không sao, vì ta chỉ cần biết có phòng trống hay không, và kích thước heap không bao giờ vượt quá số phòng thực sự cần. Thực tế `rooms` cuối cùng luôn bằng `heap.size` cuối cùng (heap không bao giờ co lại), nhưng `max` giúp code rõ ý.

Tab **Debug**: mảng trên cùng là các cuộc họp đã sắp xếp (tím = đang xét, xám = đã xếp phòng), timeline vẽ từng cuộc họp theo thời gian, cây bên dưới là min-heap giờ kết thúc.

## Chứng minh đúng

**Cận dưới:** gọi `k` là số cuộc họp chồng lấn nhiều nhất tại một thời điểm `t`. Rõ ràng cần ít nhất `k` phòng.

**Thuật toán dùng đúng `k` phòng:** heap chỉ tăng kích thước khi cuộc họp mới bắt đầu lúc `start` mà `heap.min > start`. Bất biến: mọi giờ kết thúc trong heap thuộc các cuộc họp **khác nhau** đã bắt đầu ≤ `start` (do sắp xếp). Nếu min > `start` thì tất cả đều kết thúc sau `start` ⇒ tại thời điểm `start` có `heap.size + 1` cuộc họp diễn ra đồng thời ⇒ `heap.size + 1 ≤ k`. Vậy kích thước heap không bao giờ vượt `k`.

Kết hợp hai chiều ⇒ đáp án = `k` = độ chồng lấn tối đa.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n log n) | Sắp xếp O(n log n) + n lần push/pop heap O(log n) |
| Bộ nhớ | O(n) | Heap tối đa n phần tử + bản sao đã sắp xếp |
| Two-pointer (chronological) | O(n log n) | Sắp xếp riêng mảng start và end |

## Tradeoff

- **Min-heap ↔ hai mảng start/end đã sắp xếp:** cách hai con trỏ (sweep line) không cần heap, hằng số nhỏ hơn, nhưng **mất thông tin** cuộc họp nào ở phòng nào. Heap mở rộng được sang Meeting Rooms III (gán phòng cụ thể).
- **Heap ↔ difference array:** nếu thời gian là số nguyên nhỏ (≤ 10⁶), cộng `+1` tại start, `-1` tại end rồi prefix sum ⇒ O(n + T), không cần sắp xếp.
- **Sắp theo start (bắt buộc):** sắp theo end sẽ sai – thuật toán tham lam dựa trên việc xử lý theo trình tự thời gian bắt đầu.
- **`≤` ↔ `<`:** `heap.min ≤ start` coi đầu mút chạm nhau là không trùng. Đổi sang `<` nếu đề nói khoảng đóng `[start, end]`.

## Lợi / Hại

**Lợi**
- Đơn giản, O(n log n), dễ chứng minh.
- Heap trực tiếp mô hình hoá "phòng trống sớm nhất" – dễ mở rộng (gán phòng, ưu tiên phòng số nhỏ).
- Có thể xử lý dạng streaming nếu cuộc họp đến theo thứ tự start.

**Hại**
- Phải sắp xếp trước – không hợp khi dữ liệu không có thứ tự và đến liên tục.
- Heap tự viết dài dòng trong JS (không có PriorityQueue chuẩn).

## Use case thực tế

- **Lập lịch phòng họp / lớp học / phòng mổ:** tính tài nguyên tối thiểu.
- **Cloud autoscaling:** số máy cần đồng thời cho các job có giờ bắt đầu/kết thúc biết trước.
- **Hệ điều hành / thread pool:** số worker tối thiểu để không job nào phải chờ.
- **Sân bay:** số cổng/gate cần cho lịch máy bay (Minimum Platforms).
- **Phân tích log:** số kết nối/session đồng thời lớn nhất (peak concurrency).

## Lỗi thường gặp

1. Quên sắp xếp, hoặc sắp theo `end`.
2. Dùng `<` thay `≤` (hoặc ngược lại) ⇒ sai với cuộc họp chạm đầu mút.
3. Dùng max-heap hoặc mảng thường rồi `Math.min(...)` mỗi lần ⇒ O(n²).
4. Sort bằng `sort()` không có comparator ⇒ JS so sánh như chuỗi (`10 < 9`).
5. Pop **tất cả** phòng đã rảnh rồi lấy `heap.size` sai thời điểm – đúng nhưng cần cẩn thận cập nhật `rooms` sau push.

## Biến thể

- **252 Meeting Rooms:** chỉ hỏi một người có dự được tất cả không ⇒ sắp xếp, kiểm tra cặp liền kề.
- **2402 Meeting Rooms III:** hai heap (phòng trống theo số phòng, phòng bận theo giờ kết thúc), trì hoãn cuộc họp.
- **1094 Car Pooling:** sweep line / difference array với sức chứa.
- **731/732 My Calendar II/III:** đếm độ chồng lấn động với TreeMap hoặc segment tree.
- **Minimum Platforms (GFG):** y hệt, sắp xếp riêng arrival/departure.
