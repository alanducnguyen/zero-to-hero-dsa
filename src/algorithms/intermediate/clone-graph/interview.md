## Cách trình bày trong phỏng vấn

1. Làm rõ: "Đồ thị có chu trình không? Liên thông không? `val` có duy nhất không? Input có thể là null?"
2. Nêu khó khăn cốt lõi: node có nhiều đường đi tới + chu trình ⇒ cần **map gốc → bản sao** để vừa chống tạo trùng vừa chống lặp vô hạn.
3. Chọn BFS (tránh tràn stack) hoặc DFS (ngắn gọn) và nói rõ tradeoff.
4. Nhấn mạnh chi tiết ghi điểm: **ghi map ngay khi enqueue**, và luôn nối tới **bản sao** của láng giềng.
5. Chạy tay hình vuông 1–2–3–4–1: chỉ ra lúc xử lý 2, node 1 đã có trong map nên chỉ nối cạnh, không enqueue lại.
6. Phân tích O(V + E) thời gian, O(V) bộ nhớ phụ.

## Câu hỏi follow-up thường gặp

- **Viết bằng DFS đệ quy?** `clone(u)`: nếu `map.has(u)` trả về; tạo `c`, `map.set(u, c)` **trước** khi đệ quy, rồi `c.neighbors = u.neighbors.map(clone)`.
- **Đồ thị 10⁵ node dạng đường thẳng?** DFS đệ quy tràn stack ⇒ BFS hoặc DFS với stack tường minh.
- **Đồ thị không liên thông (cho danh sách mọi node)?** Lặp qua từng node, BFS từ node chưa có trong map.
- **Đồ thị có hướng, có trọng số?** Khung giữ nguyên, sao chép thêm trọng số.
- **Kiểm tra bản sao đúng thế nào?** So sánh danh sách kề và kiểm tra không object nào trùng với bản gốc (identity).
- **Copy List with Random Pointer không dùng map?** Chèn bản sao xen kẽ `A → A' → B → B'`, gán random, rồi tách ra – O(1) bộ nhớ phụ.

## Checklist nhận diện pattern

- "Deep copy", "clone", "sao chép" cấu trúc có **con trỏ** có thể dùng chung / tạo vòng ⇒ HashMap gốc → bản sao.
- Đồ thị có thể có chu trình ⇒ cần tập đã thăm; đánh dấu **lúc enqueue** trong BFS.
- Cần duyệt mọi node đi được từ một điểm ⇒ BFS/DFS.
- Map vừa là "visited" vừa là "lookup" ⇒ một cấu trúc làm hai việc.

## Bài luyện tập liên quan

- LeetCode 133 – Clone Graph
- LeetCode 138 – Copy List with Random Pointer
- LeetCode 1485 – Clone Binary Tree With Random Pointer
- LeetCode 1490 – Clone N-ary Tree
- LeetCode 200 – Number of Islands
- LeetCode 785 – Is Graph Bipartite?
- LeetCode 323 – Number of Connected Components in an Undirected Graph
