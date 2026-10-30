## Kịch bản trình bày (8–10 phút)

1. **Làm rõ đề** (1 phút): 4 hay 8 hướng? Có được sửa lưới không? Kích thước tối đa? Lưới tĩnh hay động?
2. **Mô hình hoá** (30s): "Đây là đếm thành phần liên thông trên đồ thị ngầm – mỗi ô đất là đỉnh, hai ô kề là cạnh. Không cần dựng đồ thị."
3. **Ý tưởng** (1 phút): "Quét từng ô; gặp ô đất chưa thăm ⇒ đảo mới, rồi duyệt toàn bộ đảo để đánh dấu, nhờ vậy không đếm lại."
4. **Code DFS** (3 phút): sao chép lưới (hoặc `visited`), hàm `sink` kiểm tra biên + nước trước, **đánh dấu trước khi đệ quy**.
5. **Phân tích** (30s): mỗi ô chạm O(1) lần ⇒ O(m·n) thời gian; bộ nhớ O(m·n) cho bản sao và **call stack có thể sâu m·n**.
6. **Chủ động nêu rủi ro** (1 phút): "Lưới 300×300 toàn đất ⇒ độ sâu 9·10⁴, có thể tràn stack. Trong production tôi sẽ đổi sang BFS với queue (hoặc DFS với stack tường minh) – code gần như giống hệt, chỉ thay đệ quy bằng vòng lặp."
7. **Nhắc Union-Find** (30s) cho trường hợp lưới động.

## Follow-up thường gặp

- **Không được sửa input?** Dùng bản sao hoặc `visited: boolean[][]`; nói rõ chi phí O(m·n) bộ nhớ.
- **Lưới cực lớn, stack overflow?** BFS với queue (con trỏ `head`, không `shift()`), hoặc DFS lặp với stack.
- **8 hướng?** Thêm 4 hướng chéo vào `dirs` – không đổi độ phức tạp.
- **Number of Islands II (LC 305)** – thêm từng ô đất, trả số đảo sau mỗi lần: Union-Find, mỗi ô mới `count++` rồi union với ≤ 4 hàng xóm là đất; tổng O(k·α).
- **Max Area of Island (LC 695)**: DFS trả về số ô đã chìm.
- **Số đảo có hình dạng khác nhau (LC 694)**: DFS ghi lại chuỗi hướng đi (kể cả bước quay lui) làm chữ ký, đưa vào Set.
- **Lưới không vừa bộ nhớ, đọc theo từng hàng?** Union-Find trên hai hàng liên tiếp (giống thuật toán gán nhãn thành phần liên thông trong xử lý ảnh).
- **Đếm đảo kín (LC 1254) / Surrounded Regions (LC 130)**: flood fill từ biên trước để loại các vùng chạm biên.

## Lỗi hay gặp khi code

- Đánh dấu thăm **sau** khi gọi đệ quy / khi dequeue ⇒ lặp vô hạn hoặc enqueue trùng.
- Đọc `grid[r][c]` trước khi kiểm tra biên ⇒ `undefined` (JS) hoặc IndexOutOfBounds.
- Union-Find: giảm `count` cả khi hai ô đã cùng gốc ⇒ đếm thiếu khi đảo có vòng.
