## Cách trình bày trong phỏng vấn

1. Hỏi: có cạnh âm không? Có cần phát hiện chu trình âm? Có giới hạn số cạnh? Nếu "không âm" ⇒ Dijkstra; nếu có ⇒ Bellman-Ford.
2. Giải thích vì sao Dijkstra sai với cạnh âm bằng ví dụ 3 đỉnh (chốt sớm một đỉnh rồi có đường âm ngắn hơn).
3. Định nghĩa `d_k` theo số cạnh, nêu "đường ngắn nhất ≤ V−1 cạnh", viết 2 vòng lặp lồng nhau.
4. Thêm vòng kiểm tra chu trình âm và dừng sớm khi không đổi.
5. O(V·E) / O(V); nhắc SPFA và Johnson nếu được hỏi tối ưu.

## Câu hỏi follow-up thường gặp

- **Vì sao V−1 vòng là đủ?** Đường đơn có tối đa V−1 cạnh; mỗi vòng "mở" thêm ít nhất một cạnh của đường tối ưu.
- **Vòng thứ V còn relax được nghĩa là gì?** Có đường ngắn hơn với ≥ V cạnh ⇒ chứa chu trình, chu trình đó âm.
- **Cheapest Flights Within K Stops?** k+1 vòng Bellman-Ford trên bản sao `dist` (không cập nhật tại chỗ).
- **Đồ thị vô hướng có cạnh âm?** Cạnh âm vô hướng chính là chu trình âm 2 đỉnh ⇒ bài toán vô nghĩa.
- **Đỉnh nào bị ảnh hưởng bởi chu trình âm?** BFS/DFS từ các đỉnh relax được ở vòng V, đánh dấu −∞.
- **So với Floyd–Warshall?** Floyd là mọi cặp O(V³); Bellman-Ford một nguồn O(V·E). Cùng tư tưởng DP relax.
- **Áp dụng cho ràng buộc `x_v − x_u ≤ w`?** Thêm đỉnh ảo nối tới mọi đỉnh với trọng số 0, chạy Bellman-Ford; `dist` là một nghiệm.

## Checklist nhận diện pattern

- "Trọng số âm", "lợi nhuận/chi phí có thể âm", "tỷ giá" ⇒ Bellman-Ford hoặc Floyd.
- "Tối đa k chặng/bước" ⇒ Bellman-Ford k vòng (hoặc Dijkstra trên trạng thái (đỉnh, bước)).
- "Có vòng lặp lời vô hạn không?" ⇒ phát hiện chu trình âm.
- Trọng số không âm và đồ thị lớn ⇒ đừng dùng, chọn Dijkstra.

## Bài luyện tập

- 787 Cheapest Flights Within K Stops (Bellman-Ford k vòng).
- 743 Network Delay Time (so sánh với Dijkstra).
- 1334 Find the City (Floyd hoặc Bellman-Ford từ mỗi đỉnh).
- Bài kinh điển ngoài LeetCode: Arbitrage (UVa 104), Wormholes (UVa 558), SPOJ difference constraints.
