## Bài toán

Cho lưới `m × n`, ô `0` đi được, ô `1` là tường. Từ góc trên trái `(0,0)` đi 4 hướng, tìm **số bước ít nhất** để tới góc dưới phải `(m-1, n-1)`. Trả về `-1` nếu không thể.

Bài toán lưới là dạng đồ thị "ngụy trang" phổ biến nhất trong phỏng vấn: Google thích Number of Islands, Amazon thích Rotting Oranges, Meta thích Shortest Path in Binary Matrix. Tất cả đều là BFS/DFS trên lưới, và BFS là lựa chọn duy nhất khi cần **đường đi ngắn nhất không trọng số**.

## Ý tưởng / Trực giác

Hãy tưởng tượng thả một viên đá xuống nước ở ô xuất phát: sóng lan ra **từng vòng** – vòng 1 là các ô cách 1 bước, vòng 2 cách 2 bước… Ô đích được sóng chạm lần đầu ở vòng thứ `d` ⇒ đường ngắn nhất là `d`.

BFS mô phỏng chính xác điều đó bằng **queue (FIFO)**: xử lý hết các ô ở khoảng cách `d` trước khi chạm tới bất kỳ ô nào ở khoảng cách `d+1`. DFS (stack) thì lao sâu một hướng và **không** đảm bảo ngắn nhất.

## Thuật toán từng bước

1. Nếu ô xuất phát hoặc đích là tường ⇒ `-1`.
2. `dist[r][c] = -1` (chưa thăm) cho mọi ô; `dist[0][0] = 0`; queue = `[(0,0)]`.
3. Lặp khi queue không rỗng: lấy ô `(r,c)` đầu queue.
   - Nếu là đích ⇒ trả `dist[r][c]`.
   - Với 4 hàng xóm `(nr,nc)`: bỏ qua nếu ngoài lưới, là tường, hoặc đã thăm; ngược lại `dist = dist[r][c] + 1`, đẩy vào cuối queue.
4. Queue rỗng ⇒ `-1`.

Tab **Debug**: ô tím là ô đang xử lý, ô cyan là ô đang nằm trong queue (frontier), ô xám đã thăm với số bên trong là khoảng cách. Chú ý số trong lưới tăng dần theo "vòng sóng".

## Chứng minh đúng

**Bất biến:** tại mọi thời điểm, queue chứa các ô với khoảng cách không giảm, và chỉ chứa **tối đa hai giá trị** khoảng cách liên tiếp `d, d+1`. Mọi ô đã được gán `dist` đều có `dist` bằng khoảng cách ngắn nhất thật.

- Ban đầu queue = `[start]` với `dist = 0` – đúng.
- Lấy ô có `dist = d` ra, các hàng xóm chưa thăm được gán `d+1` và đẩy vào cuối ⇒ thứ tự vẫn không giảm.
- Một ô được gán `dist` lần đầu bởi ô `u` với `dist[u] = d`. Nếu tồn tại đường ngắn hơn qua ô `w` với `dist[w] < d`, thì `w` đã được lấy ra khỏi queue trước `u` (thứ tự không giảm) và đã gán cho ô đó giá trị `dist[w]+1 ≤ d` – mâu thuẫn với "lần đầu". Vậy `dist` gán lần đầu là ngắn nhất ⇒ **không bao giờ cần cập nhật lại**, khác với Dijkstra.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(m·n) | Mỗi ô vào queue tối đa 1 lần, xét 4 hàng xóm |
| Bộ nhớ | O(m·n) | Mảng `dist` + queue (xấu nhất chứa ~m·n/2 ô) |
| Tổng quát đồ thị | O(V + E) | V đỉnh, E cạnh |

**Lưu ý JS:** `Array.shift()` là O(n) ⇒ queue bằng `shift()` khiến BFS thành O((mn)²). Dùng con trỏ `head` (như code) hoặc deque thật.

## Tradeoff

- **BFS ↔ DFS:** BFS tìm đường ngắn nhất, tốn O(độ rộng) bộ nhớ (lớn với lưới). DFS tốn O(độ sâu), tìm "có đường hay không" / đếm vùng liên thông, nhưng không ngắn nhất.
- **BFS ↔ Dijkstra:** BFS chỉ đúng khi mọi cạnh cùng trọng số. Có trọng số ⇒ Dijkstra (O(E log V)). Trọng số chỉ 0 và 1 ⇒ 0-1 BFS với deque, O(V+E).
- **BFS ↔ A\*:** A\* dùng heuristic (khoảng cách Manhattan) để ưu tiên hướng về đích, thăm ít ô hơn nhiều trong lưới lớn; BFS "mù" nhưng đơn giản và không cần heuristic.
- **Lưu `dist` ↔ `visited` + đếm theo tầng:** mảng `dist` cho biết khoảng cách mọi ô (hữu ích cho nhiều truy vấn); đếm tầng tiết kiệm bộ nhớ hơn khi chỉ cần một đáp án.
- **Dừng sớm:** return ngay khi lấy đích ra khỏi queue (đúng) – không return khi **đẩy** đích vào queue nếu bạn cần `dist` chính xác của các ô khác, nhưng với bài này return lúc đẩy vào cũng đúng và nhanh hơn một chút.

## Lợi / Hại

**Lợi**
- Đảm bảo ngắn nhất, tuyến tính, không đệ quy (không lo tràn stack với lưới 1000×1000).
- Dễ mở rộng: nhiều nguồn (multi-source BFS), 8 hướng, trạng thái phức tạp (vị trí + số chìa khoá).

**Hại**
- Bộ nhớ O(m·n) cho frontier – với không gian trạng thái khổng lồ (Rubik, puzzle) cần bidirectional BFS hoặc IDA*.
- Không xử lý trọng số.

## Use case thực tế

- **Tìm đường trong game / robot:** lưới ô vuông, bản đồ tile.
- **Mạng xã hội:** "bạn của bạn" – số bậc kết nối (LinkedIn 2nd/3rd degree) là BFS theo tầng.
- **Web crawler:** duyệt theo độ sâu link từ trang gốc.
- **Garbage collector (mark phase):** BFS/DFS từ root set đánh dấu object sống.
- **Mạng máy tính:** broadcast, tìm số hop tối thiểu; OSPF dùng Dijkstra nhưng với mạng không trọng số BFS đủ.
- **Phân tích ảnh:** flood fill, connected components, lan toả (Rotting Oranges = mô phỏng lan nhiễm).

## Lỗi thường gặp

1. Dùng `queue.shift()` ⇒ O(n) mỗi lần, TLE với lưới lớn.
2. Đánh dấu visited khi **lấy ra** thay vì khi **đẩy vào** ⇒ một ô bị đẩy nhiều lần, bộ nhớ và thời gian tăng vọt (vẫn đúng kết quả nhưng chậm).
3. Quên kiểm tra ô xuất phát là tường.
4. Kiểm tra biên sai (`>=` vs `>`).
5. Dùng DFS rồi "lấy min" – đúng nhưng O(exponential) trên lưới.

## Biến thể

- **Multi-source BFS:** đẩy tất cả nguồn vào queue với `dist = 0` (Rotting Oranges, 01 Matrix).
- **BFS theo tầng:** `for (let size = queue.length; size > 0; size--)` để biết đang ở tầng nào.
- **0-1 BFS:** trọng số 0/1 ⇒ deque, cạnh 0 đẩy đầu, cạnh 1 đẩy cuối.
- **Bidirectional BFS:** chạy từ cả 2 đầu, giảm O(b^d) xuống O(b^(d/2)) (Word Ladder).
- **BFS trên trạng thái:** đỉnh = (vị trí, trạng thái) như "đã phá k tường" (Shortest Path with Obstacles Elimination).
