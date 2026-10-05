## Bài toán

Cho danh sách khoảng `[start, end]`, gộp mọi khoảng chồng lấn và trả về danh sách khoảng rời nhau.

`[[1,3],[2,6],[8,10],[15,18]]` → `[[1,6],[8,10],[15,18]]`.

Merge Intervals (LeetCode 56) là bài được Meta hỏi nhiều nhất trong nhóm "intervals", và là nền cho Insert Interval, Meeting Rooms, Non-overlapping Intervals, Employee Free Time. Nó dạy pattern **sắp xếp rồi quét (sweep line)** – một trong những pattern tham lam phổ biến nhất.

## Ý tưởng / Trực giác

Nếu các khoảng **đã sắp xếp theo điểm đầu**, thì khi xét khoảng mới, mọi khoảng trước nó đều bắt đầu sớm hơn. Khoảng mới chỉ có thể chồng với **khoảng cuối cùng của kết quả** (các khoảng trước đó đã kết thúc trước khoảng cuối – nếu không chúng đã được gộp vào nó). Vậy chỉ cần một phép so sánh:
- `start ≤ last.end` ⇒ chồng lấn ⇒ `last.end = max(last.end, end)` (dùng max vì khoảng mới có thể nằm gọn bên trong).
- Ngược lại ⇒ khoảng mới.

Sắp xếp biến bài toán 2D (mọi cặp) thành quét 1D.

## Thuật toán từng bước

1. Sắp xếp theo `start`.
2. `merged = [sorted[0]]`.
3. Với mỗi khoảng tiếp theo: nếu `start ≤ merged.last.end` ⇒ `merged.last.end = max(...)`; ngược lại push.

Tab **Debug**: trục thời gian với mỗi khoảng một hàng – xám đã xử lý, vàng đang xét, cyan chưa xét; các hàng `out` là kết quả, đỏ là khoảng vừa thay đổi. Preset "Chạm đầu mút" `[1,4],[4,5]` kiểm tra điều kiện `≤` (gộp) – nếu đề coi chạm là không chồng, dùng `<`.

## Chứng minh đúng

**Bất biến:** sau khi xử lý `i` khoảng đầu (đã sắp xếp), `merged` là kết quả gộp đúng của chúng: các khoảng rời nhau, sắp xếp, và `merged.last.end` = max end trong số các khoảng thuộc nhóm cuối.

- Khi thêm khoảng `[s, e]` với `s ≥` mọi start trước: nó không thể chồng với khoảng nào trong `merged` ngoài khoảng cuối, vì mọi khoảng trước khoảng cuối có `end < start của nhóm cuối ≤ s`. Nếu `s ≤ last.end` ⇒ chồng (hoặc chạm) ⇒ hợp nhất thành `[last.start, max(last.end, e)]` là đúng (hợp của hai khoảng giao nhau là một khoảng). Nếu `s > last.end` ⇒ rời ⇒ khoảng mới.
- Cuối cùng `merged` là phân hoạch đúng.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n log n) | Sắp xếp; quét O(n) |
| Bộ nhớ | O(n) | Kết quả (+ O(log n) hoặc O(n) cho sắp xếp) |
| Nếu đã sắp xếp | O(n) | Chỉ quét |

## Tradeoff

- **Sắp xếp + quét ↔ Sweep line với sự kiện:** đếm "số khoảng đang mở" (Meeting Rooms II) cần tách thành sự kiện start/end sắp xếp riêng, hoặc heap theo end. Merge chỉ cần sắp xếp theo start.
- **Chạm đầu mút:** `[1,4]` và `[4,5]` gộp hay không tuỳ đề (đóng/mở). Hỏi người phỏng vấn; đổi `≤` thành `<`.
- **Tại chỗ ↔ Mảng mới:** có thể ghi đè vào mảng đã sắp xếp với con trỏ ghi để O(1) phụ (ngoài sắp xếp).
- **Khoảng đến dần (stream):** cần cấu trúc có thứ tự (TreeMap theo start) để chèn O(log n) và gộp lân cận – Insert Interval và Range Module.
- **Interval tree / segment tree:** khi cần truy vấn "khoảng nào chứa điểm x" nhiều lần trên tập tĩnh/động.

## Lợi / Hại

**Lợi**
- Đơn giản, O(n log n), một lượt quét.
- Pattern mở rộng cho hàng chục bài intervals: chèn, đếm phòng, bỏ ít nhất để không chồng, thời gian rảnh, phủ khoảng.

**Hại**
- Cần sắp xếp toàn bộ trước; không online.
- Chỉ 1D; khoảng 2D (hình chữ nhật) cần sweep line + segment tree.

## Use case thực tế

- **Lịch / calendar:** gộp các khung bận, tìm thời gian rảnh, kiểm tra xung đột (Google Calendar "find a time").
- **Đặt phòng / tài nguyên:** số phòng họp tối thiểu, số máy cần thiết, số đường bay.
- **Hệ thống file / bộ nhớ:** gộp các extent/block liền kề, defragment, coalescing free list trong allocator.
- **Mạng:** gộp dải IP (CIDR), danh sách chặn, khoảng cổng.
- **Genomics:** gộp vùng gen chồng lấn (bedtools merge).
- **Đồ hoạ / video:** gộp đoạn cần render lại, khoảng thời gian có sự kiện.
- **Database:** range locking, gộp phân vùng thời gian.

## Lỗi thường gặp

1. Không sắp xếp trước ⇒ sai.
2. `last.end = end` thay vì `max` ⇒ sai khi khoảng mới nằm gọn trong khoảng cũ.
3. Sắp xếp theo end thay vì start (end dùng cho bài "bỏ ít nhất để không chồng").
4. Sửa trực tiếp mảng input khi đề không cho phép.
5. Mảng rỗng ⇒ truy cập `sorted[0]`.
6. Nhầm điều kiện chạm đầu mút.

## Biến thể

- **Insert Interval (57):** chèn vào danh sách đã rời nhau – quét 3 pha (trước, chồng, sau), O(n) không cần sắp xếp.
- **Meeting Rooms (252):** sau sắp xếp, kiểm tra `start < prev.end`.
- **Meeting Rooms II (253):** min-heap theo end hoặc sweep events ⇒ số phòng = max khoảng mở cùng lúc.
- **Non-overlapping Intervals (435):** sắp xếp theo **end**, tham lam giữ khoảng kết thúc sớm nhất.
- **Interval List Intersections (986):** two pointers trên hai danh sách sắp xếp.
- **Employee Free Time (759):** gộp rồi lấy khoảng trống.
- **Range Module (715), My Calendar (729/731/732):** TreeMap / segment tree cho cập nhật động.
