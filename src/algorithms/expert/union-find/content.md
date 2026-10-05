## Bài toán

Có `n` phần tử, ban đầu mỗi phần tử một nhóm. Hỗ trợ hai thao tác với số lượng lớn:
- `union(a, b)`: gộp nhóm chứa `a` và nhóm chứa `b`.
- `find(x)` / `connected(a, b)`: `a` và `b` có cùng nhóm không?

Union-Find (còn gọi Disjoint Set Union – DSU) là cấu trúc dữ liệu "nhỏ mà có võ": ~20 dòng code nhưng đạt **gần O(1) amortized** mỗi thao tác. Nó xuất hiện ở Kruskal (cây khung nhỏ nhất), phát hiện chu trình, đếm thành phần liên thông động, Accounts Merge – những bài onsite yêu thích của Google và Meta.

## Ý tưởng / Trực giác

Biểu diễn mỗi nhóm là một **cây**: mỗi phần tử trỏ tới "cha", gốc đại diện cho nhóm. Hai phần tử cùng nhóm ⇔ cùng gốc. `union` = treo gốc cây này dưới gốc cây kia.

Vấn đề: cây có thể thành chuỗi dài ⇒ `find` O(n). Hai mẹo khắc phục:
1. **Union by rank:** luôn treo cây **thấp** dưới cây **cao** ⇒ chiều cao ≤ log n.
2. **Path compression:** sau mỗi `find(x)`, nối thẳng mọi node trên đường đi về gốc ⇒ lần sau chỉ 1 bước.

Kết hợp cả hai, Tarjan chứng minh tổng chi phí m thao tác là O(m·α(n)), với α là hàm Ackermann ngược – α(n) ≤ 4 với mọi n thực tế (kể cả số nguyên tử trong vũ trụ). Thực chất là O(1).

## Thuật toán từng bước

- **Khởi tạo:** `parent[i] = i`, `rank[i] = 0`, `count = n`.
- **find(x):** nếu `parent[x] ≠ x` thì `parent[x] = find(parent[x])`; trả `parent[x]`.
- **union(a, b):** `ra = find(a)`, `rb = find(b)`; nếu bằng ⇒ `false`. Nếu `rank[ra] < rank[rb]` đổi chỗ; `parent[rb] = ra`; nếu rank bằng nhau thì `rank[ra]++`; `count--`.

Tab **Debug**: rừng cây vẽ mũi tên con → cha; mảng `parent[]` và `rank[]` bên dưới. Preset "Chuỗi dài" cho thấy sau `0?5`, path compression làm cả chuỗi phẳng ra.

## Chứng minh đúng

**Bất biến:** hai phần tử cùng nhóm ⇔ cùng gốc. `union` chỉ nối gốc này vào gốc kia ⇒ hợp hai tập; `find` chỉ đổi `parent` của node sang **gốc của chính cây đó** ⇒ không đổi tập hợp. Vậy bất biến giữ sau mọi thao tác.

**Chiều cao ≤ log n với union by rank:** cây rank `r` có ≥ 2ʳ node (quy nạp: rank tăng chỉ khi gộp hai cây cùng rank, mỗi cây ≥ 2ʳ⁻¹). Vậy rank ≤ log₂ n. Path compression không làm rank sai (rank là chặn trên của chiều cao).

**O(α(n)) amortized:** chứng minh của Tarjan dùng phân tích thế năng – vượt phạm vi phỏng vấn; chỉ cần nêu kết quả và trực giác "mỗi lần find làm phẳng đường đi, các lần sau được lợi".

## Độ phức tạp

| Cài đặt | find/union (amortized) | Ghi chú |
|---|---|---|
| Ngây thơ (không tối ưu) | O(n) | Cây suy biến thành chuỗi |
| Chỉ union by rank | O(log n) | |
| Chỉ path compression | O(log n) amortized | Thực tế rất nhanh |
| Cả hai | O(α(n)) ≈ O(1) | Chuẩn |
| Bộ nhớ | O(n) | `parent`, `rank` |

## Tradeoff

- **Union by rank ↔ Union by size:** size (số node) đơn giản hơn, cùng bảo đảm; size còn cho biết kích thước nhóm miễn phí (bài "nhóm lớn nhất").
- **Đệ quy ↔ Lặp trong find:** đệ quy gọn; chuỗi dài 10⁶ trước khi nén có thể tràn stack ⇒ phiên bản lặp hai lượt (tìm gốc, rồi nén) hoặc **path halving** (`parent[x] = parent[parent[x]]` khi đi lên) an toàn hơn.
- **Union-Find ↔ DFS/BFS:** với đồ thị **tĩnh**, DFS O(V + E) đếm thành phần liên thông cũng được. Union-Find thắng khi cạnh **thêm dần** (online) hoặc cần xen kẽ union/query.
- **Không hỗ trợ xoá cạnh:** cần offline (đảo ngược thời gian) hoặc cấu trúc khác (link-cut tree, dynamic connectivity).
- **Mở rộng:** DSU có trọng số (weighted union-find) cho bài "tỉ lệ / chênh lệch giữa hai phần tử"; DSU với rollback cho offline dynamic connectivity.

## Lợi / Hại

**Lợi**
- Gần O(1), bộ nhớ O(n), code 20 dòng.
- Online: xử lý cạnh đến dần.
- Phát hiện chu trình tức thì khi `union` trả `false`.

**Hại**
- Chỉ trả lời "cùng nhóm?" – không cho đường đi, không cho khoảng cách.
- Không xoá cạnh.
- Phần tử phải ánh xạ về chỉ số 0..n−1 (dùng Map cho chuỗi).

## Use case thực tế

- **Kruskal MST:** sắp cạnh theo trọng số, thêm cạnh nếu `union` thành công – thiết kế mạng, clustering.
- **Mạng xã hội / đồ thị tri thức:** gộp tài khoản trùng (Accounts Merge), đếm cộng đồng.
- **Phân tích ảnh:** connected component labeling, flood fill lớn.
- **Mạng máy tính:** kiểm tra liên thông khi thêm link; phát hiện vòng lặp trong cấu hình.
- **Compiler / type inference:** thuật toán unification (Hindley–Milner) dùng union-find để gộp biến kiểu.
- **Percolation (vật lý thống kê), trò chơi Go/Hex:** đếm nhóm quân, kiểm tra kết nối hai biên.
- **Hệ thống phân tán:** phát hiện partition, gộp shard.

## Lỗi thường gặp

1. So sánh `a === b` thay vì `find(a) === find(b)`.
2. `parent[b] = a` thay vì `parent[find(b)] = find(a)` ⇒ phá cây.
3. Quên path compression ⇒ TLE trên test chuỗi dài.
4. Dùng rank như chiều cao thật sau khi nén (rank chỉ là chặn trên – không sao, nhưng đừng "sửa" rank khi nén).
5. Đệ quy find trên chuỗi 10⁶ ⇒ tràn stack; dùng lặp.
6. Không giảm `count` khi gộp thành công, hoặc giảm cả khi `union` trả false.

## Biến thể

- **Union by size:** `size[ra] += size[rb]`.
- **Path halving / splitting:** nén một phần trong find lặp, cùng bảo đảm O(α).
- **Weighted Union-Find:** lưu thêm `diff[x]` = chênh lệch với cha (Evaluate Division 399, Satisfiability of Equality Equations 990).
- **DSU trên lưới:** ô (r, c) → chỉ số `r·cols + c` (Number of Islands II 305).
- **DSU với rollback:** không path compression, lưu stack thay đổi để undo (offline dynamic connectivity).
- **Persistent DSU:** phiên bản hoá cho truy vấn lịch sử.
