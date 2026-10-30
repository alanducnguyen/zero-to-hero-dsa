## Bài toán

Có `n` node mạng đánh số `1..n` và danh sách `times[i] = [u, v, w]`: tín hiệu đi từ `u` tới `v` mất `w` đơn vị thời gian (cạnh **có hướng**, `w ≥ 0`). Node `k` phát tín hiệu ở thời điểm 0. Hỏi sau bao lâu **mọi** node đều nhận được tín hiệu? Nếu có node không bao giờ nhận được, trả về `-1`.

Ví dụ LeetCode: `times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2` ⇒ `2` (node 4 nhận cuối cùng lúc 2).

## Ý tưởng / Trực giác

Tín hiệu lan theo **mọi** đường cùng lúc, nên node `v` nhận tín hiệu lần đầu đúng vào thời điểm = **độ dài đường đi ngắn nhất** từ `k` tới `v`. Cả mạng xong khi node xa nhất nhận được ⇒ đáp án = `max(dist[v])`.

Trọng số không âm và chỉ có một nguồn ⇒ đây chính là bài toán của [Dijkstra](/algo/dijkstra). Nếu bạn chưa học bài đó, hãy xem trước. So với bài Dijkstra gốc, có ba điểm khác:

1. **Đồ thị có hướng:** cạnh `u → v` chỉ thêm vào `adj[u]`. Nhầm thành vô hướng là lỗi sai phổ biến nhất.
2. **Đáp án là một con số:** không cần trả cả mảng `dist`, chỉ cần `max`; nếu `max = ∞` thì trả `-1`.
3. **Priority queue thật:** bài Dijkstra dùng mảng + `sort` để dễ đọc (O(V) mỗi lần lấy min). Ở đây ta tự cài **binary min-heap** – đúng thứ người phỏng vấn mong đợi khi bạn nói "dùng priority queue" trong JavaScript, vốn không có sẵn heap.

## Thuật toán từng bước

1. Dựng `adj[u] = [[v, w], ...]` từ `times` (một chiều).
2. `dist[i] = ∞` cho mọi node, `dist[k] = 0`; `push([0, k])`.
3. Lặp khi heap còn phần tử:
   - `pop()` lấy `[d, u]` có `d` nhỏ nhất (gốc heap, rồi sift-down).
   - Nếu `d > dist[u]` ⇒ bản ghi cũ, bỏ qua (**lazy deletion**).
   - Với mỗi cạnh `u → v` trọng số `w`: nếu `d + w < dist[v]` thì cập nhật `dist[v]` và `push([d + w, v])` (sift-up).
4. `ans = max(dist[1..n])`; trả `-1` nếu `ans = ∞`, ngược lại trả `ans`.

**Binary heap** lưu trên mảng: con của `i` là `2i+1`, `2i+2`; cha là `(i−1) >> 1`. `push` thêm vào cuối rồi đổi chỗ với cha khi nhỏ hơn; `pop` đưa phần tử cuối lên gốc rồi đổi chỗ với con nhỏ hơn. Cả hai O(log size).

## Chứng minh đúng

Bất biến của Dijkstra: khi một node `u` được lấy ra lần đầu với `d = dist[u]`, `d` là khoảng cách ngắn nhất thật. Giả sử có đường ngắn hơn; đường đó phải rời tập đã chốt qua một node `x` chưa chốt với `dist[x] ≤` độ dài đường đó `< d`. Nhưng heap luôn trả `d` nhỏ nhất, nên `x` đã phải được lấy trước `u` – mâu thuẫn. Trọng số `≥ 0` đảm bảo phần đường còn lại không làm tổng giảm.

Lazy deletion không phá tính đúng: bản ghi cũ luôn có `d > dist[u]` nên bị bỏ qua; bản ghi đúng có `d = dist[u]` vẫn nằm trong heap.

Đáp án đúng vì node `v` nhận tín hiệu sớm nhất tại `dist[v]`, và mạng "xong" khi node cuối nhận ⇒ `max`.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Dijkstra + binary heap (bài này) | O(E log E) | O(V + E) |
| Dijkstra + mảng/sort (bài dijkstra) | O(V² log V) (sort mỗi vòng) | O(V + E) |
| Bellman-Ford | O(V·E) | O(V) |
| Floyd-Warshall | O(V³) | O(V²) |

Heap có thể chứa tới E bản ghi do lazy deletion, nên log E; vì E ≤ V² nên log E ≤ 2 log V ⇒ tương đương O(E log V).

## Tradeoff

- **Lazy deletion vs decrease-key:** decrease-key giữ heap ≤ V phần tử nhưng cần map vị trí node → index, code dài và dễ lỗi. Lazy deletion đơn giản hơn, chỉ tốn thêm bộ nhớ.
- **Tự cài heap vs thư viện:** Java/C++/Python có sẵn (`PriorityQueue`, `priority_queue`, `heapq`); JS thì không – phải tự viết hoặc hỏi người phỏng vấn có cho dùng thư viện không.
- **Dijkstra vs Bellman-Ford:** n ≤ 100 trong LeetCode nên cả hai đều qua; Bellman-Ford ngắn hơn nhưng chậm hơn và chỉ cần khi có trọng số âm.

## Lợi / Hại

**Lợi**
- Nhanh, gần tuyến tính với đồ thị thưa.
- Dừng sớm được nếu chỉ cần khoảng cách tới một đích.

**Hại**
- Sai khi có cạnh âm.
- Phải tự cài heap trong JS – thêm 25 dòng code dễ có bug chỉ số.

## Use case thực tế

- **Mạng máy tính:** OSPF tính đường đi ngắn nhất trên từng router; thời gian lan truyền thông báo (gossip, flooding).
- **Hệ thống phân tán:** ước lượng độ trễ tối đa khi broadcast cấu hình tới mọi node.
- **Build system / pipeline:** thời điểm tác vụ cuối hoàn tất khi các bước có độ trễ.
- **Bản đồ / logistics:** thời gian để đội giao hàng phủ hết mọi điểm từ một kho.

## Lỗi thường gặp

- Thêm cạnh hai chiều (coi là vô hướng).
- Quên node đánh số từ 1 ⇒ mảng kích thước `n` thay vì `n + 1`.
- Trả về `max` mà không kiểm tra `∞` ⇒ in ra `Infinity` thay vì `-1`.
- Quên kiểm tra bản ghi cũ ⇒ vẫn đúng nhưng chậm (relax lại từ node đã chốt).
- Sift-down chỉ so với con trái, quên con phải.
- Đánh dấu "đã chốt" lúc push thay vì lúc pop ⇒ sai.

## Biến thể

- **Path with Maximum Probability (1514):** max-heap, nhân xác suất thay vì cộng.
- **Path With Minimum Effort (1631):** trọng số đường = max cạnh thay vì tổng.
- **Cheapest Flights Within K Stops (787):** thêm ràng buộc số bước ⇒ Bellman-Ford K vòng hoặc Dijkstra trên trạng thái (node, stops).
- **Nhiều nguồn phát cùng lúc:** đẩy mọi nguồn vào heap với d = 0 (multi-source Dijkstra).
