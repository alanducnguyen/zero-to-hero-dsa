## Cách trình bày trong phỏng vấn

1. Nhận diện: "nối tất cả với tổng chi phí nhỏ nhất, không cần đường ngắn nhất" ⇒ MST (không phải Dijkstra).
2. Nêu Kruskal 3 bước; nêu Prim như lựa chọn khác và tiêu chí chọn (thưa/dày).
3. Giải thích **cut property** bằng một câu và vẽ cut – đây là phần ghi điểm.
4. Code: sắp xếp + Union-Find (đã viết ở bài trước, tái sử dụng), dừng sớm.
5. O(E log E); xử lý đồ thị không liên thông.

## Câu hỏi follow-up thường gặp

- **Kruskal hay Prim khi nào?** Thưa (E ≈ V) ⇒ Kruskal; dày (E ≈ V²) ⇒ Prim O(V²) với mảng; cạnh đã sắp xếp ⇒ Kruskal gần tuyến tính; cần streaming từ một nguồn ⇒ Prim.
- **MST có duy nhất không?** Duy nhất nếu trọng số phân biệt; trùng trọng số có thể có nhiều MST cùng tổng.
- **Tại sao Dijkstra không cho MST?** Dijkstra tối ưu khoảng cách từ nguồn (shortest path tree); tổng cạnh có thể lớn hơn MST. Ví dụ tam giác 1-1-1.5: SPT từ A dùng hai cạnh 1; cũng là MST ở đây, nhưng với hình vuông cạnh 1 và đường chéo 1.9, SPT và MST khác nhau.
- **Trọng số âm?** Vẫn đúng; MST chỉ dùng thứ tự.
- **n điểm trên mặt phẳng, cạnh là khoảng cách Manhattan (1584)?** O(n²) cạnh ⇒ Kruskal O(n² log n) hoặc Prim O(n²) với mảng (tốt hơn); hoặc giảm số cạnh bằng Delaunay/8-hướng.
- **Thêm một cạnh mới vào MST đã có?** Tìm cạnh nặng nhất trên đường đi giữa hai đầu trong cây (O(V) hoặc LCA); nếu nặng hơn cạnh mới ⇒ thay.
- **Cạnh bắt buộc phải có?** Union chúng trước, rồi chạy Kruskal cho phần còn lại.
- **Dùng MST để clustering?** Bỏ k − 1 cạnh nặng nhất của MST ⇒ k cụm với khoảng cách giữa cụm lớn nhất (single-linkage).
- **Đồ thị có hướng?** MST không áp dụng; bài tương ứng là minimum arborescence (Chu–Liu/Edmonds), phức tạp hơn nhiều.

## Checklist nhận diện pattern

- "Nối tất cả / liên thông toàn bộ với chi phí nhỏ nhất" ⇒ MST (Kruskal/Prim).
- "Đường đi ngắn nhất từ A" ⇒ Dijkstra, không phải MST.
- "Chia thành k cụm sao cho khoảng cách giữa cụm lớn nhất" ⇒ Kruskal dừng sớm.
- "Có cạnh nào bắt buộc / thừa trong mọi MST" ⇒ chạy Kruskal với cạnh ép/loại.
- "Đường đi với cạnh lớn nhất nhỏ nhất (bottleneck)" ⇒ MST hoặc binary search + Union-Find.

## Bài luyện tập liên quan

- 1584 Min Cost to Connect All Points, 1135 Connecting Cities, 1168 Optimize Water Distribution (thêm đỉnh ảo).
- 1489 Critical and Pseudo-Critical Edges (Hard), 1724 Checking Existence of Edge Length Limited Paths II.
- 778 Swim in Rising Water (bottleneck), 1631 Path With Minimum Effort (bottleneck / Union-Find).
