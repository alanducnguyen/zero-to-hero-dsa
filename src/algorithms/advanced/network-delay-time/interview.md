## Cách trình bày trong phỏng vấn

1. Diễn đạt lại: "Thời điểm node v nhận tín hiệu = đường đi ngắn nhất từ k tới v; đáp án = max các khoảng cách đó, ∞ ⇒ -1."
2. Nhận diện: một nguồn, trọng số không âm, đồ thị có hướng ⇒ **Dijkstra**.
3. Nói rõ cấu trúc: danh sách kề một chiều, mảng `dist` kích thước `n + 1`, min-heap `[d, node]` với lazy deletion.
4. Hỏi trước: "JS không có heap sẵn – tôi tự cài binary heap nhé?" rồi viết `push`/`pop` gọn.
5. Edge case: node không tới được, n = 1, cạnh tự vòng, nhiều cạnh song song giữa cùng cặp node.
6. Phân tích O(E log E) thời gian, O(V + E) bộ nhớ; so sánh nhanh với Bellman-Ford.

## Câu hỏi follow-up thường gặp

- **Có cạnh âm thì sao?** Dijkstra sai; dùng Bellman-Ford O(V·E) (hoặc SPFA).
- **Vì sao lấy max chứ không phải tổng?** Tín hiệu lan song song theo mọi nhánh; thời điểm xong là lúc node cuối cùng nhận.
- **Cần trả về đường đi tới node cuối?** Lưu `parent[v] = u` khi relax, truy ngược.
- **Lazy deletion hay decrease-key?** Lazy đơn giản hơn; decrease-key tiết kiệm bộ nhớ nhưng cần map vị trí.
- **Đồ thị dày (E ≈ V²)?** Dijkstra mảng O(V²) không heap có thể nhanh hơn.
- **Dừng sớm được không?** Đếm số node đã chốt; khi đủ n thì node vừa chốt chính là đáp án (d của nó là max).

## Checklist nhận diện pattern

- "Thời gian ngắn nhất", "chi phí nhỏ nhất", trọng số không âm ⇒ Dijkstra.
- "Bao lâu để TẤT CẢ nhận được" ⇒ max của khoảng cách ngắn nhất.
- Trọng số đều bằng 1 ⇒ BFS là đủ; trọng số 0/1 ⇒ 0-1 BFS.
- Có trọng số âm hoặc giới hạn số cạnh ⇒ Bellman-Ford.

## Bài luyện tập

- [LeetCode 743 – Network Delay Time](https://leetcode.com/problems/network-delay-time/)
- [LeetCode 1514 – Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability/)
- [LeetCode 1631 – Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/)
- [LeetCode 787 – Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)
- [LeetCode 1976 – Number of Ways to Arrive at Destination](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/)
