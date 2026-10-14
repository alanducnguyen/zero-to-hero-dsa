## Bài toán

Cho đồ thị có trọng số (có thể âm, không có chu trình âm) với `V` đỉnh. Tìm đường đi ngắn nhất giữa **mọi cặp** đỉnh `(i, j)`.

Khác với Dijkstra/Bellman-Ford (một nguồn), Floyd–Warshall trả về cả ma trận `dist[V][V]` trong một lần chạy O(V³), với code chỉ 3 vòng `for`.

## Ý tưởng / Trực giác

Thay vì nghĩ "mở rộng dần từ nguồn", hãy nghĩ theo **tập đỉnh trung gian được phép**. Gọi `d_k[i][j]` là đường ngắn nhất `i → j` chỉ được dùng các đỉnh `{0, …, k}` làm trung gian.

Khi cho phép thêm đỉnh `k`, đường tốt nhất mới hoặc **không đi qua k** (giữ `d_{k-1}[i][j]`), hoặc **đi qua k đúng một lần** (`d_{k-1}[i][k] + d_{k-1}[k][j]`). Vậy:

`d_k[i][j] = min(d_{k-1}[i][j], d_{k-1}[i][k] + d_{k-1}[k][j])`

Đây là DP với "chiều" là `k`, và vì `d[i][k]`, `d[k][j]` không đổi trong vòng `k`, ta cập nhật ngay trên một ma trận.

## Thuật toán từng bước

1. `dist[i][i] = 0`, `dist[u][v] = w` cho mỗi cạnh, còn lại `∞`.
2. Với `k = 0..V−1`, với mọi `i`, `j`: nếu `dist[i][k] + dist[k][j] < dist[i][j]` thì cập nhật.
3. Sau V vòng, `dist` là đáp án. Nếu có `dist[i][i] < 0` ⇒ tồn tại chu trình âm.

Ở tab **Debug**, hàng và cột của `k` được tô xám (bất biến trong vòng), hai ô vàng là `dist[i][k]`, `dist[k][j]`; ô đích chuyển đỏ khi được cập nhật. Để gọn, các bước trivial (`i = k`, `j = k`, `i = j`) được bỏ qua.

## Chứng minh đúng

Quy nạp theo `k`. Với `k = −1` (không trung gian), `dist` là trọng số cạnh trực tiếp – đúng.

Giả sử đúng với `k−1`. Xét đường ngắn nhất `P` từ `i` tới `j` chỉ dùng trung gian trong `{0..k}` (không chu trình âm nên có thể giả sử `P` là đường đơn):
- Nếu `P` không qua `k`: `P` hợp lệ với tập `{0..k−1}` ⇒ độ dài = `d_{k-1}[i][j]`.
- Nếu `P` qua `k` (một lần duy nhất vì đơn): tách thành `i → k` và `k → j`, cả hai chỉ dùng trung gian `{0..k−1}` ⇒ độ dài = `d_{k-1}[i][k] + d_{k-1}[k][j]`.

Min của hai trường hợp chính là công thức. Cập nhật tại chỗ an toàn vì hàng `k` và cột `k` không đổi trong vòng `k` (`dist[k][k] = 0`).

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Floyd–Warshall | O(V³) | O(V²) |
| Dijkstra từ mọi đỉnh (w ≥ 0) | O(V · (V+E) log V) | O(V + E) |
| Johnson (w âm, thưa) | O(V·E + V² log V) | O(V + E) |
| Bellman-Ford từ mọi đỉnh | O(V² · E) | O(V) |

Với đồ thị dày (E ≈ V²), Floyd–Warshall ngang Dijkstra-mọi-đỉnh nhưng hằng số nhỏ hơn nhiều và không cần heap.

## Tradeoff

- V ≤ ~400–500 là ngưỡng thực tế (10⁸ phép tính); vượt quá phải dùng Dijkstra/Johnson.
- Chịu cạnh âm, phát hiện chu trình âm miễn phí; Dijkstra thì không.
- Chỉ trả về độ dài; muốn dựng đường cần thêm ma trận `next[i][j]`.
- O(V²) bộ nhớ: V = 10⁴ là 800 MB cho số thực 64-bit – không khả thi.

## Lợi / Hại

**Lợi:** 5 dòng code, không cấu trúc dữ liệu phụ, trả lời mọi truy vấn `(i, j)` sau này trong O(1), mở rộng sang bao đóng bắc cầu, đường rộng nhất, min-max. **Hại:** O(V³) cứng dù đồ thị thưa; không thể chạy "lười" cho một cặp.

## Use case thực tế

- Bảng khoảng cách giữa mọi điểm giao hàng/kho (V nhỏ) để nạp vào bài toán định tuyến (VRP, TSP).
- Bao đóng bắc cầu (transitive closure): "A có tới được B?" trong hệ phân quyền, phân tích phụ thuộc.
- Mạng máy tính nhỏ: bảng định tuyến toàn cục, phát hiện vòng âm trong arbitrage tiền tệ (log tỷ giá).
- Đồ thị trạng thái game/robot với vài trăm trạng thái.

## Lỗi thường gặp

- Đặt vòng `k` ở **trong** thay vì **ngoài cùng** ⇒ sai (phải cố định tập trung gian trước).
- `∞ + w` tràn số khi dùng `Number.MAX_SAFE_INTEGER` thay vì `Infinity` – trong JS `Infinity + w = Infinity` an toàn; ở C++/Java phải kiểm tra `dist[i][k] != INF`.
- Quên `dist[i][i] = 0` ⇒ không phát hiện được chu trình âm, và vòng `k` sai.
- Nhiều cạnh song song: phải lấy `min`, không ghi đè.

## Biến thể

- **Dựng đường:** `next[i][j] = next[i][k]` khi cập nhật; đi theo `next` để in đường.
- **Transitive closure (Warshall):** thay `min/+` bằng `OR/AND` trên ma trận boolean.
- **Widest path / minimax:** thay `+` bằng `min`, `min` bằng `max` (hoặc ngược lại) – cùng khung semiring.
- **Phát hiện chu trình âm:** sau khi chạy, `dist[i][i] < 0` với i nào đó.
- **Johnson:** reweight bằng Bellman-Ford rồi chạy Dijkstra từ mỗi đỉnh – cho đồ thị thưa có cạnh âm.
