## Cách trình bày trong phỏng vấn

1. Nhận diện: "cần gộp nhóm và hỏi cùng nhóm nhiều lần, cạnh thêm dần" ⇒ nói ngay Union-Find.
2. Vẽ rừng cây, giải thích `find` và `union` cơ bản, rồi nêu hai tối ưu và lý do.
3. Viết class ~20 dòng với path compression đệ quy + union by rank (hoặc size). Nói O(α(n)) ≈ O(1).
4. Áp dụng vào bài: đếm nhóm = `count`; chu trình = `union` trả false; MST = Kruskal.
5. Nêu giới hạn: không xoá cạnh, không đường đi.

## Phiên bản lặp (tránh tràn stack)

```ts
find(x: number): number {
  let root = x;
  while (this.parent[root] !== root) root = this.parent[root];
  while (this.parent[x] !== root) {        // nén đường
    const next = this.parent[x];
    this.parent[x] = root;
    x = next;
  }
  return root;
}
```

## Câu hỏi follow-up thường gặp

- **α(n) là gì?** Hàm Ackermann ngược; ≤ 4 với mọi n < 2^65536. Thực tế coi là hằng số.
- **Chỉ path compression, không rank, có đủ không?** O(log n) amortized, thực tế rất nhanh; nhiều người chỉ viết path compression trong phỏng vấn và nêu rank là tối ưu thêm.
- **Rank vs size?** Cả hai đều giữ chiều cao O(log n); size cho thêm thông tin kích thước nhóm.
- **Đếm số thành phần liên thông của đồ thị?** `count` ban đầu n, giảm mỗi `union` thành công.
- **Phát hiện cạnh thừa (Redundant Connection 684)?** Cạnh đầu tiên làm `union` trả false.
- **Kruskal?** Sắp cạnh tăng dần; thêm cạnh nếu hai đầu khác nhóm; dừng khi đủ n−1 cạnh. O(E log E).
- **Phần tử là chuỗi (email, tên)?** Map chuỗi → chỉ số trước.
- **Xoá cạnh?** Union-Find không hỗ trợ; offline: xử lý ngược thời gian (xoá thành thêm); online: link-cut tree / HDT.
- **DSU trên lưới?** Chỉ số `r * cols + c`; thêm ô mới = union với 4 hàng xóm đã là đất (Number of Islands II).
- **Bài "a/b = 2.0, b/c = 3.0, hỏi a/c?"** Weighted Union-Find với trọng số tích luỹ về gốc.

## Checklist nhận diện pattern

- "Cùng nhóm / liên thông / gộp" với **cạnh thêm dần** hoặc **nhiều truy vấn** ⇒ Union-Find.
- "Số thành phần liên thông", "số tỉnh", "số đảo khi thêm ô" ⇒ Union-Find hoặc DFS.
- "Cạnh làm xuất hiện chu trình", "cây khung nhỏ nhất" ⇒ Union-Find (Kruskal).
- "Gộp các bản ghi trùng thông tin" ⇒ Union-Find trên chỉ số bản ghi.
- Cần đường đi / khoảng cách ⇒ không phải Union-Find, dùng BFS/DFS/Dijkstra.

## Bài luyện tập liên quan

- 547 Number of Provinces, 323 Number of Connected Components, 200 Number of Islands (so với DFS).
- 684 Redundant Connection, 685 Redundant Connection II (có hướng).
- 721 Accounts Merge, 1584 Min Cost to Connect All Points (Kruskal), 1135 Connecting Cities.
- 399 Evaluate Division (weighted), 305 Number of Islands II (Hard), 128 Longest Consecutive Sequence (có thể dùng DSU).
