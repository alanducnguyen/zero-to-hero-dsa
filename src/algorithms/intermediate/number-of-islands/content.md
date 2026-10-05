## Bài toán

Lưới `m × n` gồm `1` (đất) và `0` (nước). Đảo là nhóm ô đất liền nhau theo 4 hướng. Đếm số đảo.

Number of Islands (LeetCode 200) là bài đồ thị được hỏi nhiều nhất ở Amazon và cũng rất phổ biến ở Google, Meta. Nó dạy **cách nhìn lưới như đồ thị** và **flood fill** – kỹ thuật dùng lại cho Max Area, Surrounded Regions, Pacific Atlantic, và cả tô màu trong Paint.

## Ý tưởng / Trực giác

Mỗi ô đất là một đỉnh, hai ô đất kề nhau là một cạnh. Đảo = **thành phần liên thông**. Đếm thành phần liên thông = số lần phải "khởi động" một DFS mới.

Duyệt lưới; gặp ô đất chưa thăm ⇒ đó là một đảo mới, `count++`, rồi **nhấn chìm** cả đảo bằng DFS (đánh dấu mọi ô đất liền nhau đã thăm). Nhờ vậy các ô còn lại của đảo đó không bao giờ bị đếm lần nữa.

## Thuật toán từng bước

1. `count = 0`, `visited` toàn false.
2. Với mỗi ô `(r, c)`: nếu đất và chưa thăm ⇒ `count++`, `sink(r, c)`.
3. `sink(r, c)`: nếu ngoài lưới, là nước, hoặc đã thăm ⇒ return; đánh dấu; đệ quy 4 hướng.

Tab **Debug**: ô cyan là đất chưa thăm, ô xanh lá đã thăm (số bên trong = đảo thứ mấy), ô tím đang xử lý; call stack cho thấy độ sâu đệ quy. Preset "Chéo không nối" chứng minh chéo không tính là kề.

## Chứng minh đúng

**Mỗi đảo được đếm đúng một lần:** `sink` từ một ô đất thăm đúng tập các ô đất **liên thông** với nó (DFS trên thành phần liên thông). Sau đó, mọi ô của đảo đã `visited` ⇒ vòng ngoài không khởi động DFS mới từ chúng. Ô đất của đảo khác không liên thông ⇒ chưa thăm ⇒ sẽ khởi động DFS riêng. Vậy số lần `count++` = số thành phần liên thông.

**Dừng:** mỗi ô chỉ được đánh dấu một lần và chỉ đệ quy khi chưa đánh dấu ⇒ hữu hạn.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(m·n) | Mỗi ô vào `sink` tối đa 1 lần + 4 lần kiểm tra từ hàng xóm |
| Bộ nhớ | O(m·n) | `visited` + stack đệ quy sâu tới m·n (đảo hình rắn) |
| Không dùng `visited` | O(1) phụ | Nếu được phép ghi đè lưới (đổi 1 thành 0) |

## Tradeoff

- **DFS đệ quy ↔ DFS stack ↔ BFS queue:** đệ quy ngắn nhất nhưng tràn stack với lưới 1000×1000 toàn đất (JS giới hạn ~10⁴ frame). Stack tường minh hoặc BFS an toàn. Phỏng vấn: viết đệ quy, nêu rủi ro và cách lặp.
- **Sửa lưới tại chỗ ↔ Mảng `visited`:** sửa tại chỗ tiết kiệm O(m·n) bộ nhớ nhưng phá input – hỏi người phỏng vấn; nhiều hệ thống không cho phép mutate.
- **DFS ↔ Union-Find:** Union-Find thắng khi lưới **thay đổi động** (Number of Islands II: thêm đất dần, mỗi thao tác O(α)). Lưới tĩnh thì DFS đơn giản và nhanh hơn.
- **4 hướng ↔ 8 hướng:** chỉ đổi danh sách hướng; hỏi rõ đề.
- **Lưới cực lớn không vừa RAM:** xử lý theo dải với Union-Find trên biên giữa các dải.

## Lợi / Hại

**Lợi**
- Tuyến tính, code ngắn, ý tưởng tái dùng cho mọi bài "vùng liên thông" trên lưới.
- Dễ mở rộng: tính diện tích, chu vi, đảo chạm biên, đảo có hình dạng khác nhau.

**Hại**
- Đệ quy sâu với đảo lớn.
- Không hỗ trợ cập nhật động (cần Union-Find).

## Use case thực tế

- **Xử lý ảnh:** connected component labeling (đếm vật thể, OCR tách ký tự), công cụ "magic wand" / bucket fill trong Photoshop.
- **Game:** tìm vùng lãnh thổ (Go), minesweeper mở vùng trống, phát hiện nhóm cùng màu (Candy Crush).
- **GIS / bản đồ:** đếm hồ, đảo, vùng ngập từ ảnh vệ tinh.
- **Mạng / hạ tầng:** đếm cụm máy liên thông, phân vùng mạng sau sự cố.
- **Khoa học vật liệu:** percolation – có đường dẫn từ trên xuống dưới không.
- **Phân tích dữ liệu không gian:** clustering đơn giản trên lưới (DBSCAN trên lưới raster).

## Lỗi thường gặp

1. Quên đánh dấu `visited` **trước** khi đệ quy ⇒ lặp vô hạn giữa hai ô kề nhau.
2. Kiểm tra biên sai (`>=` vs `>`), hoặc kiểm tra biên sau khi truy cập `grid[r][c]`.
3. Tính chéo là kề khi đề nói 4 hướng.
4. Đếm trong `sink` thay vì ở vòng ngoài ⇒ đếm từng ô.
5. Sửa lưới input khi đề yêu cầu giữ nguyên.
6. Với lưới chuỗi (`'1'`/`'0'` như LeetCode), so sánh với số 1 ⇒ luôn false.

## Biến thể

- **Max Area of Island (695):** `sink` trả về số ô.
- **Island Perimeter (463):** mỗi cạnh giáp nước/biên cộng 1.
- **Surrounded Regions (130):** flood fill từ biên để đánh dấu vùng "an toàn" trước.
- **Pacific Atlantic Water Flow (417):** DFS ngược từ hai bờ.
- **Number of Distinct Islands (694):** chuẩn hoá hình dạng bằng đường đi DFS.
- **Number of Islands II (305):** Union-Find động.
- **Flood Fill (733):** đổi màu vùng liên thông cùng màu – chính là `sink` với màu.
