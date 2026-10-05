## Cách trình bày trong phỏng vấn

1. Nói ngay: "Lưới là đồ thị, mỗi ô là đỉnh, 4 hàng xóm là cạnh trọng số 1 ⇒ đường ngắn nhất không trọng số ⇒ BFS."
2. Nêu bất biến queue theo tầng, giải thích tại sao lần đầu chạm = ngắn nhất.
3. Viết code với mảng `dirs`, kiểm tra biên trong hàm phụ `inBounds`, đánh dấu visited khi đẩy vào.
4. Nêu O(m·n) và lưu ý `shift()` O(n) trong JS – điểm cộng lớn.
5. Chủ động nêu biến thể: nếu có trọng số ⇒ Dijkstra; nếu nhiều nguồn ⇒ multi-source.

## Câu hỏi follow-up thường gặp

- **Trả về đường đi, không chỉ độ dài?** Lưu `parent[r][c]` khi gán dist; từ đích lần ngược về nguồn rồi đảo mảng.
- **Di chuyển 8 hướng?** Thêm 4 hướng chéo vào `dirs`. Số bước vẫn là độ dài đường (LeetCode 1091).
- **Nhiều điểm xuất phát (vd. nhiều ổ dịch)?** Multi-source BFS: đẩy tất cả vào queue ban đầu với dist = 0.
- **Có thể phá tối đa k bức tường?** Trạng thái = (r, c, số tường đã phá); visited 3 chiều. O(m·n·k).
- **Lưới 10⁴ × 10⁴, bộ nhớ hạn chế?** Bidirectional BFS, hoặc A* với heuristic Manhattan; hoặc nén visited bằng bitset.
- **Tại sao không dùng DFS?** DFS không đảm bảo ngắn nhất; phải thử mọi đường ⇒ hàm mũ.
- **Tại sao không Dijkstra luôn cho chắc?** Đúng nhưng thừa log V; BFS O(V+E) nhanh hơn và đơn giản hơn khi cạnh đồng trọng số.
- **Cách tránh `shift()` trong JS?** Con trỏ head trên mảng, hoặc hai stack, hoặc circular buffer.

## Checklist nhận diện pattern

- "Ít bước nhất", "ngắn nhất", "tối thiểu số lần" trên lưới/đồ thị không trọng số ⇒ BFS.
- "Lan toả theo thời gian", "sau bao nhiêu phút" ⇒ multi-source BFS theo tầng.
- "Đếm vùng", "có tồn tại đường" ⇒ DFS hoặc BFS đều được, DFS ngắn hơn.
- "Chuyển từ trạng thái A sang B với ít thao tác nhất" (Word Ladder, Open the Lock) ⇒ BFS trên không gian trạng thái.

## Template BFS theo tầng

```ts
let steps = 0;
while (queue.length > head) {
  const size = queue.length - head;
  for (let i = 0; i < size; i++) {
    const cur = queue[head++];
    if (isTarget(cur)) return steps;
    for (const nb of neighbors(cur)) if (!visited.has(nb)) { visited.add(nb); queue.push(nb); }
  }
  steps++;
}
return -1;
```

## Bài luyện tập liên quan

- 1091 Shortest Path in Binary Matrix, 200 Number of Islands, 695 Max Area of Island.
- 994 Rotting Oranges, 542 01 Matrix (multi-source).
- 127 Word Ladder, 752 Open the Lock (BFS trạng thái).
- 1293 Shortest Path with Obstacles Elimination (Hard), 1162 As Far from Land as Possible.
