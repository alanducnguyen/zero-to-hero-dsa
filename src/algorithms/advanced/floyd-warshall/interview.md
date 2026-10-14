## Cách trình bày trong phỏng vấn

1. Hỏi rõ: V bao nhiêu? Cần mọi cặp hay một nguồn? Có cạnh âm không? V ≤ ~400 và cần mọi cặp ⇒ Floyd–Warshall.
2. Định nghĩa trạng thái theo **tập đỉnh trung gian** `{0..k}` – đây là ý chấm điểm chính, nói rõ vì sao `k` ở vòng ngoài.
3. Viết 3 vòng `for`, nêu khởi tạo và cách xử lý `∞`.
4. O(V³)/O(V²); so sánh với Dijkstra-mọi-đỉnh cho đồ thị thưa.
5. Chủ động nêu: phát hiện chu trình âm qua `dist[i][i] < 0`, dựng đường qua `next`.

## Câu hỏi follow-up thường gặp

- **Vì sao cập nhật tại chỗ không làm sai?** Trong vòng `k`, `dist[i][k]` và `dist[k][j]` không thể giảm (vì `dist[k][k] = 0`), nên dùng giá trị "mới" hay "cũ" đều như nhau.
- **Đồ thị thưa, V = 10⁵?** Không dùng Floyd; dùng Dijkstra từ từng nguồn cần hỏi, hoặc Johnson nếu có cạnh âm.
- **In đường đi i → j?** Lưu `next[i][j]`; khi cập nhật qua `k`, `next[i][j] = next[i][k]`.
- **Chu trình âm thì sao?** `dist` không còn ý nghĩa; mọi cặp đi qua chu trình đó có thể đánh dấu `−∞`.
- **Chỉ cần "có đường hay không"?** Warshall với bitset: O(V³/64).
- **Truy vấn online nhiều cặp?** Tiền xử lý Floyd một lần, trả lời O(1) – tốt hơn chạy Dijkstra mỗi truy vấn khi số truy vấn lớn.

## Checklist nhận diện pattern

- "Khoảng cách giữa mọi cặp", "thành phố có ít hàng xóm trong ngưỡng nhất", "tỷ giá chuyển đổi gián tiếp" ⇒ all-pairs.
- V nhỏ (≤ vài trăm), E dày, hoặc cần ma trận kết quả để tra cứu nhiều lần.
- Bài hỏi "A suy ra B qua chuỗi quan hệ" ⇒ transitive closure.

## Bài luyện tập

- 1334 Find the City With the Smallest Number of Neighbors (Floyd trực tiếp).
- 399 Evaluate Division (Floyd với phép nhân), 1462 Course Schedule IV (closure).
- 2976 Minimum Cost to Convert String I (Floyd trên 26 ký tự).
- 743 Network Delay Time (so sánh với Dijkstra), 787 Cheapest Flights Within K Stops (Bellman-Ford k vòng).
