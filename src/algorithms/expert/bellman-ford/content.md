## Bài toán

Cho đồ thị có hướng với trọng số **có thể âm** và đỉnh nguồn `s`. Tìm đường đi ngắn nhất từ `s` tới mọi đỉnh, hoặc báo rằng tồn tại **chu trình âm** tới được từ `s` (khi đó không có "ngắn nhất").

Dijkstra sai với cạnh âm vì nó "chốt" một đỉnh ngay khi lấy ra khỏi heap. Bellman-Ford (1958) không chốt gì cả: cứ relax mọi cạnh, lặp V−1 lần.

## Ý tưởng / Trực giác

Đường đi ngắn nhất (không chu trình âm) là đường đơn, có **tối đa V−1 cạnh**. Gọi `d_k[v]` là đường ngắn nhất tới `v` dùng ≤ k cạnh:

`d_k[v] = min(d_{k-1}[v], min_{(u,v)} d_{k-1}[u] + w(u,v))`

Mỗi vòng relax mọi cạnh một lần thì `dist` ít nhất tốt bằng `d_k`. Sau V−1 vòng, mọi đường ≤ V−1 cạnh đã được xét ⇒ xong. Nếu vòng thứ V **vẫn** cải thiện được, nghĩa là có đường ngắn hơn với ≥ V cạnh ⇒ chứa chu trình, và chu trình đó phải âm.

Đây là DP theo số cạnh, nhưng cập nhật tại chỗ (giống Floyd–Warshall) nên thường hội tụ sớm hơn V−1 vòng.

## Thuật toán từng bước

1. `dist[*] = ∞`, `dist[s] = 0`.
2. Lặp `round = 1..V−1`: với mọi cạnh `(u, v, w)`: nếu `dist[u] + w < dist[v]` thì `dist[v] = dist[u] + w`. Nếu cả vòng không đổi ⇒ dừng sớm.
3. Vòng kiểm tra: còn cạnh relax được ⇒ `negativeCycle = true`.

Ở tab **Debug**, bảng `dist[]` thêm một hàng sau mỗi vòng để thấy giá trị lan dần; cạnh đỏ là cạnh vừa relax thành công, vàng là cạnh xét nhưng không cải thiện.

## Chứng minh đúng

**Bổ đề:** sau vòng k, `dist[v] ≤ d_k[v]` (độ dài đường ngắn nhất ≤ k cạnh). Quy nạp: đường tối ưu ≤ k cạnh tới `v` có cạnh cuối `(u, v)`; phần trước là đường ≤ k−1 cạnh tới `u`, nên trước vòng k `dist[u] ≤ d_{k-1}[u]`; relax `(u, v)` trong vòng k cho `dist[v] ≤ d_{k-1}[u] + w = d_k[v]`.

Đồng thời `dist[v]` luôn là độ dài một đường thực sự từ `s` (bất biến), nên `dist[v] ≥` đường ngắn nhất. Không chu trình âm ⇒ đường ngắn nhất ≤ V−1 cạnh ⇒ sau V−1 vòng `dist[v]` chính xác.

**Chu trình âm:** nếu không có chu trình âm thì sau V−1 vòng không cạnh nào relax được (vì `dist` đã tối ưu). Ngược lại, chu trình âm `c₁→…→c_k→c₁` có tổng trọng số âm; nếu không cạnh nào relax được thì cộng các bất đẳng thức `dist[c_{i+1}] ≤ dist[c_i] + w_i` cho ra `0 ≤ tổng w < 0`, mâu thuẫn.

## Độ phức tạp

| | Thời gian | Bộ nhớ | Cạnh âm | Chu trình âm |
|---|---|---|---|---|
| Bellman-Ford | O(V·E) | O(V) | ✅ | phát hiện |
| SPFA (queue) | O(V·E) xấu nhất, nhanh thực tế | O(V) | ✅ | phát hiện (đếm lần vào queue) |
| Dijkstra + heap | O((V+E) log V) | O(V) | ❌ | ❌ |
| Floyd–Warshall | O(V³) | O(V²) | ✅ | phát hiện (mọi cặp) |

## Tradeoff

- Chậm hơn Dijkstra nhiều trên đồ thị lớn không có cạnh âm – chỉ dùng khi thật sự cần cạnh âm hoặc giới hạn số cạnh.
- Code đơn giản nhất trong họ shortest-path, không cần heap; dễ chạy phân tán (mỗi đỉnh tự relax – nền của giao thức RIP).
- SPFA nhanh trung bình nhưng có test đối kháng kéo về O(V·E); phỏng vấn nên nêu Bellman-Ford chuẩn.

## Lợi / Hại

**Lợi:** đúng với cạnh âm, phát hiện chu trình âm, biến thể "≤ k cạnh" rất tự nhiên (dừng sau k vòng với bản sao `dist`). **Hại:** O(V·E); kết quả khi có chu trình âm cần xử lý thêm (đánh dấu các đỉnh bị ảnh hưởng là −∞).

## Use case thực tế

- **Arbitrage tiền tệ:** cạnh `−log(rate)`; chu trình âm ⟺ chuỗi đổi tiền có lời.
- **Định tuyến distance-vector (RIP):** mỗi router chạy Bellman-Ford phân tán theo bảng của hàng xóm.
- **Ràng buộc hiệu (difference constraints):** hệ `x_v − x_u ≤ w` giải bằng Bellman-Ford; chu trình âm ⟺ vô nghiệm (dùng trong lập lịch, kiểm tra thời gian).
- **Johnson's algorithm:** Bellman-Ford một lần để reweight rồi chạy Dijkstra từ mọi đỉnh.

## Lỗi thường gặp

- Chỉ chạy V−2 vòng hoặc quên vòng kiểm tra thứ V ⇒ bỏ sót chu trình âm.
- Relax từ đỉnh có `dist = ∞`: trong JS `∞ + w = ∞` nên an toàn, nhưng C++/Java với `INT_MAX` sẽ tràn số – phải kiểm tra `dist[u] != INF`.
- Với bài "≤ k cạnh" (LeetCode 787) relax trực tiếp trên `dist` làm một vòng lan nhiều cạnh ⇒ phải relax trên **bản sao** của vòng trước.
- Kết luận "có chu trình âm trong đồ thị" trong khi chỉ phát hiện được chu trình **tới được từ s**.

## Biến thể

- **Giới hạn k cạnh:** chạy k vòng với mảng tạm – Cheapest Flights Within K Stops.
- **SPFA:** chỉ relax từ đỉnh vừa thay đổi (queue); chu trình âm khi một đỉnh vào queue ≥ V lần.
- **Tìm chu trình âm cụ thể:** lưu `parent`, từ đỉnh relax được ở vòng V đi ngược V lần để chắc chắn vào chu trình, rồi đi theo `parent`.
- **Dựng đường:** lưu `parent[v] = u` khi relax.
- **Yen's improvement:** chia cạnh theo thứ tự đỉnh để giảm số vòng xuống ⌈V/2⌉.
