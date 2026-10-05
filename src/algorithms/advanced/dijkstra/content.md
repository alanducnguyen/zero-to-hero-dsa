## Bài toán

Cho đồ thị có trọng số cạnh **không âm** và đỉnh nguồn `s`. Tìm khoảng cách ngắn nhất từ `s` tới **mọi** đỉnh.

Dijkstra là thuật toán đồ thị quan trọng nhất trong thực tế: Google Maps, định tuyến OSPF/IS-IS trong Internet, Uber/Grab tính giá chuyến, game pathfinding. Trong phỏng vấn, nó xuất hiện ở vòng onsite dưới dạng ngụy trang: "thời gian tín hiệu lan khắp mạng", "đường đi ít tốn sức nhất qua địa hình", "xác suất lớn nhất".

## Ý tưởng / Trực giác

BFS giải được khi mọi cạnh bằng nhau vì queue đảm bảo "lấy ra theo khoảng cách tăng dần". Với trọng số khác nhau, một queue FIFO không giữ được thứ tự đó – nhưng **priority queue (min-heap) theo khoảng cách tạm** thì có.

Hình dung nước chảy từ nguồn với tốc độ 1 đơn vị/giây dọc theo cạnh: nước tới đỉnh nào đầu tiên, thời điểm đó chính là khoảng cách ngắn nhất, và từ lúc đó nước bắt đầu lan tiếp từ đỉnh ấy. Dijkstra mô phỏng "sự kiện nước tới đỉnh" theo thứ tự thời gian bằng priority queue.

**Tham lam:** đỉnh chưa chốt có khoảng cách tạm nhỏ nhất ⇒ khoảng cách đó là **cuối cùng**, vì mọi đường khác tới nó phải đi qua đỉnh chưa chốt khác (có khoảng cách tạm ≥) rồi cộng thêm trọng số ≥ 0.

## Thuật toán từng bước

1. `dist[v] = ∞` ∀v, `dist[s] = 0`. Đẩy `(s, 0)` vào min-heap.
2. Khi heap không rỗng: lấy `(u, d)` nhỏ nhất.
   - Nếu `u` đã chốt ⇒ bỏ qua (bản ghi cũ).
   - Chốt `u`.
   - Với mỗi cạnh `(u, v, w)`: nếu `d + w < dist[v]` ⇒ `dist[v] = d + w`, đẩy `(v, d + w)`.
3. Trả `dist`.

Tab **Debug**: nhãn dưới mỗi đỉnh là `dist` tạm, đỉnh xanh lá đã chốt, cạnh vàng đang xét, cạnh đỏ vừa relax. Bảng `dist[]` và priority queue cập nhật theo từng bước. Code minh hoạ dùng `sort` + `shift` cho dễ đọc; bản production thay bằng heap (xem bài Heap).

## Chứng minh đúng

**Bất biến:** với mọi đỉnh đã chốt `u`, `dist[u]` = khoảng cách ngắn nhất thật `δ(s,u)`. Với đỉnh chưa chốt `v`, `dist[v]` = độ dài đường ngắn nhất từ `s` tới `v` mà **chỉ đi qua các đỉnh đã chốt** (trừ `v`).

Khi chốt `u` có `dist[u]` nhỏ nhất trong các đỉnh chưa chốt: giả sử có đường `P` ngắn hơn tới `u`. `P` phải rời tập đã chốt lần đầu tại cạnh `(x, y)` với `x` đã chốt, `y` chưa chốt. Theo bất biến, `dist[y] ≤ δ(s,x) + w(x,y) ≤ len(P) < dist[u]`, mâu thuẫn với việc `u` có `dist` nhỏ nhất. (Bước `≤ len(P)` dùng trọng số không âm: phần còn lại của `P` từ `y` tới `u` không âm.)

Sau khi chốt `u` và relax các cạnh đi ra, bất biến cho các đỉnh chưa chốt được khôi phục.

## Độ phức tạp

| Cài đặt | Thời gian | Khi nào dùng |
|---|---|---|
| Mảng, tìm min tuyến tính | O(V²) | Đồ thị dày (E ≈ V²) |
| Binary heap, lazy deletion | O((V+E) log V) | Mặc định trong phỏng vấn và thực tế |
| Fibonacci heap | O(E + V log V) | Lý thuyết; hằng số lớn |
| Bộ nhớ | O(V + E) | Danh sách kề + heap (heap có thể chứa O(E) bản ghi với lazy deletion) |

Code minh hoạ trong bài dùng `sort` mỗi vòng ⇒ O(E · V log V); mục đích là dễ debug. Tab Phỏng vấn có phiên bản heap.

## Tradeoff

- **Trọng số âm:** Dijkstra **sai** (tham lam không còn đúng). Dùng Bellman-Ford O(VE) hoặc SPFA; phát hiện chu trình âm cũng bằng Bellman-Ford.
- **Lazy deletion ↔ decrease-key:** đẩy bản ghi mới và bỏ qua bản cũ (đơn giản, heap có thể tới O(E) phần tử) so với cập nhật khoá trong heap (cần indexed heap, phức tạp hơn, O(V) phần tử).
- **Một nguồn ↔ mọi cặp:** chạy Dijkstra V lần O(V·E log V) tốt với đồ thị thưa; Floyd-Warshall O(V³) đơn giản với đồ thị nhỏ/dày.
- **Dijkstra ↔ A\*:** A* = Dijkstra + heuristic nhất quán; với một đích cụ thể trên bản đồ, A* thăm ít đỉnh hơn hàng chục lần.
- **Dừng sớm:** nếu chỉ cần tới đích `t`, return ngay khi chốt `t`.

## Lợi / Hại

**Lợi**
- Tối ưu, O((V+E) log V), áp dụng cho đồ thị có hướng lẫn vô hướng.
- Nền tảng cho A*, định tuyến mạng, contraction hierarchies.

**Hại**
- Không hỗ trợ trọng số âm.
- Cần priority queue – JS không có sẵn, phải tự viết heap.
- Trên đồ thị cực lớn (bản đồ châu lục) cần tiền xử lý (CH, ALT) vì Dijkstra thuần quá chậm cho truy vấn thời gian thực.

## Use case thực tế

- **Định tuyến Internet:** OSPF và IS-IS chạy Dijkstra trên bản đồ link-state của mỗi router.
- **Bản đồ & gọi xe:** Google Maps, Uber (ước lượng ETA), kết hợp A*/CH.
- **Mạng xã hội:** khoảng cách có trọng số (độ mạnh quan hệ).
- **Chip design:** định tuyến dây trên lưới với chi phí khác nhau.
- **Game:** pathfinding NPC trên navmesh với chi phí địa hình.
- **Hệ thống phân tán:** chọn replica gần nhất theo độ trễ.

## Lỗi thường gặp

1. Dùng với trọng số âm.
2. Không bỏ qua bản ghi stale ⇒ relax lại từ đỉnh đã chốt, sai hoặc chậm.
3. Đánh dấu visited khi **đẩy vào** heap (như BFS) ⇒ **sai** với trọng số, vì có thể tìm được đường ngắn hơn sau.
4. Khởi tạo `dist` thiếu đỉnh chỉ xuất hiện ở đầu `to` của cạnh (đồ thị có hướng).
5. Dùng `Array.sort` + `shift` trong production ⇒ O(E·V log V).

## Biến thể

- **Dijkstra với đích:** dừng khi chốt đích.
- **A\*:** ưu tiên `dist + h(v)`, `h` không vượt quá thực tế (admissible).
- **Đường đi "min-max" (Path With Minimum Effort):** thay phép cộng bằng `max(d, w)`.
- **Xác suất lớn nhất:** nhân thay cộng, max-heap (hoặc dùng −log).
- **K bước dừng (Cheapest Flights Within K Stops):** Dijkstra trên trạng thái (đỉnh, số bước) hoặc Bellman-Ford giới hạn k vòng.
- **Bellman-Ford / SPFA:** trọng số âm. **Floyd-Warshall:** mọi cặp.
