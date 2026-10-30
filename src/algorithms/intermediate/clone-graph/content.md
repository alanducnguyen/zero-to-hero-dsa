## Bài toán

Cho tham chiếu tới **một node** của đồ thị vô hướng liên thông, mỗi node có `val` và danh sách `neighbors`. Hãy trả về **bản sao sâu (deep copy)**: một đồ thị mới có cùng cấu trúc, nhưng **không node nào của bản sao là object của bản gốc**. Đồ thị có thể có **chu trình** (vd. 1–2–3–4–1).

Ví dụ: danh sách kề `[[2,4],[1,3],[2,4],[1,3]]` (hình vuông) ⇒ bản sao cũng phải có đúng danh sách kề đó, với 4 object mới.

## Ý tưởng / Trực giác

Sao chép một cây thì dễ: đệ quy tạo node con. Đồ thị khó hơn ở hai điểm:

1. **Một node có nhiều đường đi tới** ⇒ nếu cứ gặp là tạo mới, node 3 kề cả 2 và 4 sẽ bị sao thành **hai** bản khác nhau, phá cấu trúc.
2. **Chu trình** ⇒ đi theo neighbors mãi không dừng.

Cả hai được giải bằng **một HashMap `gốc → bản sao`**. Trước khi tạo bản sao, hỏi map: đã có thì dùng lại, chưa có thì tạo và ghi vào. Map đóng hai vai: **tập đã thăm** (chặn lặp vô hạn) và **bảng tra** (khi nối cạnh, tìm đúng bản sao của láng giềng).

Duyệt bằng BFS: queue chứa các node gốc mà bản sao của chúng **chưa được nối đủ cạnh**.

## Thuật toán từng bước

1. Nếu `node = null` ⇒ trả `null`.
2. Tạo bản sao của node đầu, ghi `clones[node]`, đưa `node` vào queue.
3. Khi queue chưa rỗng: lấy `cur` ra. Với mỗi láng giềng `nb` của `cur`:
   - Nếu `nb` chưa có trong map ⇒ tạo bản sao, **ghi map ngay**, rồi enqueue `nb`.
   - Nối `clones[cur].neighbors.push(clones[nb])`.
4. Trả về `clones[node]`.

**Vì sao phải ghi map lúc enqueue chứ không phải lúc dequeue?** Giả sử đồ thị tam giác 1–2–3. Xử lý 1: enqueue 2 và 3. Nếu chỉ đánh dấu khi lấy ra, lúc xử lý 2 ta thấy 3 "chưa thăm" và enqueue 3 lần nữa ⇒ 3 vào queue hai lần, tạo hai bản sao (hoặc nối cạnh hai lần). Với đồ thị dày, số lần enqueue có thể bùng nổ. Ghi ngay khi enqueue giữ bất biến: **mỗi node vào queue đúng một lần, và mọi node trong queue đã có bản sao**.

## Chứng minh đúng

- **Mỗi node gốc có đúng một bản sao:** bản sao chỉ được tạo khi node chưa có trong map, và được ghi ngay ⇒ không bao giờ tạo hai lần.
- **Mọi node đi được đều được sao:** BFS từ node đầu thăm toàn bộ thành phần liên thông; node nào được khám phá đều được tạo bản sao ở bước khám phá.
- **Mọi cạnh được sao đúng:** mỗi node vào queue đúng một lần và khi lấy ra, ta duyệt **tất cả** neighbors của nó, push đúng bản sao tương ứng theo **cùng thứ tự** ⇒ `clones[u].neighbors` là ảnh của `u.neighbors`. Cạnh vô hướng u–v có hai hướng, mỗi hướng được nối khi xử lý đầu tương ứng.
- **Dừng:** queue nhận tối đa V lần push.

## Độ phức tạp

| Trường hợp | Thời gian | Bộ nhớ |
|---|---|---|
| Tốt nhất | O(V + E) | O(V) |
| Trung bình | O(V + E) | O(V) |
| Xấu nhất (đồ thị đầy đủ) | O(V²) = O(V + E) | O(V) |

Mỗi node vào/ra queue một lần (O(V)), mỗi cạnh vô hướng được duyệt hai lần (O(E)). Bộ nhớ phụ: map O(V) + queue O(V) (chưa kể chính bản sao O(V + E), vốn là output).

## Tradeoff

- **BFS vs DFS đệ quy:** DFS đệ quy ngắn gọn hơn (`clone(u)`: nếu có trong map trả về, không thì tạo, ghi map, rồi đệ quy cho neighbors) nhưng có thể **tràn stack** với đồ thị dạng đường dài 10⁵ node. BFS dùng queue trên heap nên an toàn.
- **`queue.shift()` trong JS là O(n)**; với đồ thị lớn nên dùng con trỏ `head` hoặc deque thật.
- **Map theo object vs theo `val`:** LeetCode đảm bảo `val` duy nhất nên có thể dùng mảng `clones[val]` (nhanh hơn); map theo object tổng quát hơn khi giá trị trùng.

## Lợi / Hại

**Lợi:**
- Tuyến tính, xử lý được chu trình, đỉnh nhiều cha, đồ thị dày.
- Cùng khung "map gốc → bản sao" áp dụng cho mọi cấu trúc có con trỏ (list, cây, đồ thị).

**Hại:**
- Tốn O(V) bộ nhớ cho map.
- Chỉ sao chép thành phần liên thông chứa node đầu — đồ thị rời rạc cần lặp qua mọi node.

## Use case thực tế

- **Deep copy object có tham chiếu vòng**: `structuredClone` của trình duyệt, `copy.deepcopy` của Python đều dùng một `memo` map gốc → bản sao đúng như thế.
- **Serialize / snapshot** đồ thị object (undo/redo, lưu trạng thái game, fork trạng thái trong mô phỏng).
- **Garbage collector dạng copying (Cheney)**: sao chép object sống sang vùng nhớ mới bằng BFS, để lại "forwarding pointer" — chính là map gốc → bản sao.
- Nhân bản workflow/DAG, sơ đồ mạng trong công cụ thiết kế.

## Lỗi thường gặp

- **Đánh dấu lúc dequeue** thay vì lúc enqueue ⇒ node vào queue nhiều lần, cạnh bị nhân đôi.
- **Push node gốc vào neighbors của bản sao** (`clone.neighbors.push(nb)`) ⇒ bản sao trỏ ngược về đồ thị gốc, không còn là deep copy.
- Dùng `Set` "đã thăm" riêng và tạo bản sao lúc khác ⇒ không tìm lại được bản sao để nối cạnh.
- Quên case `node = null` hoặc node không có láng giềng.
- DFS đệ quy ghi map **sau** khi đệ quy xong neighbors ⇒ lặp vô hạn trên chu trình.

## Biến thể

- **DFS đệ quy / DFS dùng stack** – cùng map, khác thứ tự duyệt.
- **Copy List with Random Pointer (138)** – cùng ý tưởng map; có thêm mẹo O(1) bộ nhớ bằng cách chèn bản sao xen kẽ.
- **Clone Binary Tree With Random Pointer (1485)**, **Clone N-ary Tree (1490)**.
- Đồ thị có hướng / có trọng số: thêm thông tin cạnh vào bản sao, khung không đổi.
- Đồ thị không liên thông: lặp qua mọi node, bắt đầu BFS từ node chưa có trong map.
