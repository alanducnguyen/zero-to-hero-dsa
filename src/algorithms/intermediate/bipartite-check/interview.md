## Cách trình bày trong phỏng vấn

1. Phát biểu lại: bipartite ⟺ tô được 2 màu ⟺ không có chu trình lẻ. Vẽ tam giác và hình vuông minh hoạ.
2. Nêu ý "màu bị ép buộc": chọn gốc màu 0 thì mọi đỉnh khác trong thành phần bị quyết định.
3. Code BFS với mảng `color` (−1/0/1), lặp qua mọi đỉnh để xử lý đồ thị không liên thông.
4. O(V+E) / O(V); nêu DFS và Union-Find như cách thay thế.
5. Nếu được hỏi: cách trả về chu trình lẻ, hoặc mở rộng sang Possible Bipartition.

## Câu hỏi follow-up thường gặp

- **DFS hay BFS?** Cả hai O(V+E). DFS đệ quy ngắn nhưng có thể tràn stack với 10⁵ đỉnh; BFS an toàn.
- **Đồ thị không liên thông?** Lặp qua mọi đỉnh chưa tô, mỗi thành phần tô độc lập.
- **Làm sao chứng minh "không bipartite ⟺ có chu trình lẻ"?** Chiều thuận: chu trình lẻ không tô được 2 màu. Chiều ngược: nếu BFS mâu thuẫn tại cạnh (u, v) cùng màu thì hai đường BFS tới u, v cùng độ dài chẵn lẻ, nối với (u, v) tạo chu trình lẻ.
- **Union-Find thế nào?** Với mỗi đỉnh u, union tất cả hàng xóm của u với nhau; nếu u cùng tập với hàng xóm nào ⇒ không bipartite.
- **Cạnh thêm dần, hỏi liên tục?** DSU có parity: lưu "khác màu với cha?" trên đường nén.
- **3 màu?** NP-complete; không có thuật toán đa thức tổng quát.

## Checklist nhận diện pattern

- "Chia thành hai nhóm sao cho các cặp xung đột khác nhóm", "tô 2 màu", "chu trình lẻ" ⇒ bipartite check.
- Cần ghép cặp tối đa giữa hai loại đối tượng ⇒ kiểm tra bipartite rồi matching.
- Ràng buộc "khác nhau" nhị phân giữa các biến ⇒ 2-coloring.

## Bài luyện tập

- 785 Is Graph Bipartite? → 886 Possible Bipartition.
- 1042 Flower Planting With No Adjacent (4 màu với bậc ≤ 3, greedy).
- 1129 Shortest Path with Alternating Colors (BFS với trạng thái màu).
- Bài ngoài LeetCode: Hopcroft–Karp maximum bipartite matching.
