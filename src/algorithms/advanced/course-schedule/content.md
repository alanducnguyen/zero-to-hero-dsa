## Bài toán

Có `numCourses` môn học, đánh số `0..numCourses-1`. Mỗi cặp `[a, b]` trong `prerequisites` nghĩa là **phải học b trước a**. Hỏi:

- **LeetCode 207 – Course Schedule:** có thể học hết các môn không?
- **LeetCode 210 – Course Schedule II:** trả về một thứ tự học hợp lệ, hoặc `[]` nếu không tồn tại.

Mô hình hoá: mỗi môn là một đỉnh, mỗi điều kiện là cạnh có hướng `b → a`. Học được hết ⇔ đồ thị **không có chu trình** (DAG). Thứ tự học chính là một **thứ tự topo**.

## Ý tưởng / Trực giác

Bài [Topological Sort (Kahn)](/algo/topological-sort) giải bằng BFS từ "ngoài vào": liên tục bóc các đỉnh có bậc vào 0. Bài này giải bằng **DFS từ "trong ra"**: đi sâu tới tận môn cuối cùng (không ai phụ thuộc), đánh dấu nó xong, rồi lùi dần về.

Quan sát then chốt: khi DFS **hoàn tất** đỉnh `u` (mọi hậu duệ đã xong), `u` phải đứng **trước** mọi hậu duệ trong thứ tự topo. Vậy nếu ghi lại thứ tự hoàn tất (postorder) rồi **đảo ngược**, ta được thứ tự topo.

Còn chu trình? Ta cần biết đỉnh nào **đang nằm trên đường đi hiện tại**. Một mảng `visited` true/false là không đủ: nó không phân biệt "đang đi qua" với "đã xong từ lượt trước". Vì vậy dùng **3 màu**:

- **WHITE** – chưa thăm.
- **GRAY** – đã vào `dfs(u)` nhưng chưa ra; `u` nằm trên stack đệ quy.
- **BLACK** – đã xong hoàn toàn.

Gặp cạnh `u → v` mà `v` đang GRAY ⇒ `v` là tổ tiên của `u` trên đường đi ⇒ có đường `v ⇝ u → v` ⇒ **chu trình** (gọi là back-edge).

## Thuật toán từng bước

1. Dựng danh sách kề: với mỗi `[a, b]`, thêm `a` vào `graph[b]`.
2. Tô mọi đỉnh WHITE; `postorder = []`.
3. Với mỗi đỉnh `u` còn WHITE, gọi `dfs(u)`:
   - Tô `u` GRAY.
   - Với mỗi `v` kề `u`: nếu `v` GRAY ⇒ trả false (chu trình); nếu `v` WHITE ⇒ gọi `dfs(v)`, nếu false thì trả false ngay; nếu `v` BLACK ⇒ bỏ qua.
   - Tô `u` BLACK, đẩy `u` vào `postorder`, trả true.
4. Nếu bất kỳ `dfs` nào trả false ⇒ trả `[]`.
5. Trả `postorder` đảo ngược.

## Chứng minh đúng (loop invariant)

**Bất biến màu:** tại mọi thời điểm, tập đỉnh GRAY chính là các đỉnh trên stack đệ quy, theo thứ tự tạo thành một đường đi trong đồ thị.

**Phát hiện chu trình:** nếu thấy cạnh `u → v` với `v` GRAY, đường đi GRAY cho `v ⇝ u`, cộng cạnh `u → v` thành chu trình. Ngược lại, nếu có chu trình, gọi `v` là đỉnh đầu tiên của chu trình được tô GRAY. Lúc đó mọi đỉnh khác của chu trình còn WHITE, nên chúng đều được thăm trước khi `v` xong (định lý đường trắng – white-path theorem). Đỉnh `w` đứng ngay trước `v` trong chu trình sẽ thấy cạnh `w → v` khi `v` vẫn GRAY ⇒ phát hiện được.

**Thứ tự đúng:** xét cạnh `u → v` bất kỳ khi không có chu trình. Lúc duyệt cạnh này, `v` hoặc WHITE (sẽ xong trong lời gọi con, tức xong trước `u`), hoặc BLACK (đã xong rồi). `v` không thể GRAY. Vậy `v` luôn vào postorder **trước** `u` ⇒ sau khi đảo, `u` đứng trước `v`.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| DFS 3 màu (bài này) | O(V + E) | O(V + E) cho đồ thị + O(V) stack đệ quy |
| Kahn BFS | O(V + E) | O(V + E) + O(V) queue |
| Brute force (thử mọi hoán vị) | O(V! · E) | O(V) |

Mỗi đỉnh vào `dfs` đúng một lần (chỉ khi WHITE), mỗi cạnh được xét đúng một lần.

## Tradeoff

**DFS 3 màu vs Kahn BFS:**

- **Kahn** lặp, không lo tràn stack; dễ mở rộng sang "học theo học kỳ" (mỗi tầng BFS là một học kỳ – LeetCode 1136) hoặc lấy thứ tự nhỏ nhất theo từ điển (thay queue bằng min-heap). Phát hiện chu trình gián tiếp: đếm số đỉnh được xếp.
- **DFS** chỉ ra **chính xác cạnh gây chu trình** (back-edge) – có thể truy ngược stack để in ra chu trình cụ thể, rất hữu ích cho thông báo lỗi kiểu "circular dependency: A → B → C → A". Code đệ quy ngắn, tự nhiên khi đồ thị đã sẵn dạng cây phụ thuộc. Nhược điểm: đệ quy sâu ~V có thể tràn stack với V lớn (~10⁴ trong JS) ⇒ cần chuyển sang stack tường minh.

## Lợi / Hại

**Lợi:**
- Tuyến tính O(V + E).
- Vừa phát hiện chu trình vừa sinh thứ tự trong một lượt.
- Xác định được chu trình cụ thể để báo lỗi.

**Hại:**
- Đệ quy sâu dễ tràn stack.
- Phải nhớ đảo postorder (hoặc dựng đồ thị ngược) – dễ nhầm chiều.
- Khó kiểm soát "thứ tự đẹp" (nhỏ nhất theo từ điển) hơn Kahn.

## Use case thực tế

- **Build system / bundler** (Make, Bazel, webpack): xác định thứ tự build và báo "circular import".
- **Package manager** (npm, pip): giải phụ thuộc, phát hiện vòng phụ thuộc.
- **Spreadsheet:** tính lại ô theo thứ tự phụ thuộc, báo lỗi tham chiếu vòng.
- **Database migration, task scheduler (Airflow DAG):** kiểm tra DAG hợp lệ trước khi chạy.
- **Garbage collector / deadlock detection:** tìm chu trình trong đồ thị chờ (wait-for graph).

## Lỗi thường gặp

- Dùng `visited` 2 trạng thái ⇒ báo chu trình sai cho đồ thị kim cương `0→1, 0→2, 1→3, 2→3` (đỉnh 3 được thăm hai lần qua hai nhánh nhưng không có chu trình).
- Nhầm chiều cạnh: `[a, b]` là `b → a`, không phải `a → b`. Nhầm ⇒ thứ tự bị ngược.
- Quên đảo postorder.
- Quên lặp qua **mọi** đỉnh ở vòng ngoài ⇒ bỏ sót thành phần không liên thông.
- Đẩy `u` vào kết quả lúc **vào** (preorder) thay vì lúc **ra** (postorder) ⇒ sai thứ tự.
- Không bỏ màu GRAY/đánh BLACK đúng chỗ ⇒ phát hiện chu trình giả ở lượt DFS sau.

## Biến thể

- **LeetCode 802 – Find Eventual Safe States:** đỉnh an toàn = đỉnh không chạm tới chu trình; chính là các đỉnh kết thúc BLACK trong DFS 3 màu.
- **LeetCode 1462 – Course Schedule IV:** truy vấn "b có phải tiên quyết của a" ⇒ topo + bitset hoặc Floyd–Warshall bao đóng bắc cầu.
- **LeetCode 269 – Alien Dictionary:** dựng đồ thị từ các cặp từ liền kề rồi topo.
- **LeetCode 630 – Course Schedule III:** thực ra là greedy + heap, không phải đồ thị.
- **DFS lặp (iterative):** dùng stack tường minh kèm chỉ số cạnh đang xét để tránh tràn stack.
