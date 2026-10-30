## Kịch bản trình bày (6–8 phút)

1. **Làm rõ đề** (30s): chạm đầu mút có dùng chung phòng? giờ nguyên? miền giá trị? chỉ cần số phòng?
2. **Quy về độ chồng lấn** (1 phút): "Số phòng tối thiểu = số cuộc họp đồng thời nhiều nhất." Đây là câu quan trọng nhất – nói ra trước khi code.
3. **Brute force ý tưởng** (30s): với mỗi thời điểm bắt đầu, đếm số cuộc họp đang diễn ra ⇒ O(n²). Không cần code.
4. **Min-heap** (2 phút): sort theo start; heap giờ kết thúc; đỉnh ≤ start thì pop. Giải thích vì sao chỉ cần so với đỉnh: phòng rảnh sớm nhất còn bận thì mọi phòng đều bận.
5. **Tối giản thành two pointers** (2 phút): "Heap chỉ dùng để hỏi *có phòng nào trả trước start không* – mảng ends đã sort trả lời được, không cần heap." Code 8 dòng.
6. **Phân tích** (30s): cả hai O(n log n) vì sort; vòng quét two pointers O(n).
7. **Nhắc line sweep** (30s): "Nếu giờ là phút trong ngày, mảng diff 1440 ô cho O(n + R), không sort."

## Follow-up thường gặp

- **Meeting Rooms I (LC 252)** – có tham dự được hết không? Sort theo start, kiểm tra cặp kề nhau chồng lấn.
- **Gán phòng cụ thể / phòng nào dùng nhiều nhất (LC 2402)?** Hai heap: phòng trống (theo số phòng) và phòng bận (theo giờ kết thúc).
- **Car Pooling (LC 1094)** – mỗi khoảng có trọng số hành khách: line sweep `diff[from] += k`, `diff[to] -= k`.
- **Chạm đầu mút KHÔNG dùng chung?** Heap: đổi `<=` thành `<`; two pointers: đổi `<` thành `<=`; line sweep: đặt −1 tại `end + 1`.
- **Tại thời điểm nào đông nhất?** Line sweep hoặc two pointers ghi lại start khi rooms đạt kỷ lục.
- **Toạ độ 10⁹?** Không dùng mảng diff; nén toạ độ hoặc TreeMap sự kiện ⇒ O(n log n).
- **Cuộc họp thêm/xoá động, hỏi max liên tục?** Segment tree với lazy propagation trên toạ độ đã nén.

## Lỗi hay gặp khi code

- Sort sự kiện gộp (start, +1)/(end, −1) mà không xử lý hoà: phải để −1 đứng trước +1 tại cùng thời điểm khi đầu mút dùng chung.
- Heap: pop *mọi* phòng đã rảnh thay vì một – vẫn đúng nếu trả `max(size)`, nhưng sai nếu trả size cuối.
- Quên trường hợp mảng rỗng (line sweep gọi `Math.min()` trên mảng rỗng ra `Infinity`).
