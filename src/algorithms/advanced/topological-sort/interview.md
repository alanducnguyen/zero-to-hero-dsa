## Cách trình bày trong phỏng vấn

1. Mô hình hoá: "Mỗi task là đỉnh, 'a phải trước b' là cạnh a→b. Cần thứ tự topo; chu trình ⇒ không thể."
2. Nêu Kahn bằng ví dụ môn học/tiên quyết, chỉ rõ indegree và queue.
3. Viết code: xây adjacency + indegree, queue, vòng lặp, kiểm tra `order.length`.
4. O(V + E). Nhắc DFS là cách thay thế và khi nào chọn cái nào.
5. Follow-up thường là: thứ tự nhỏ nhất (heap), số tầng (BFS theo size), in chu trình (DFS).

## Câu hỏi follow-up thường gặp

- **Phát hiện chu trình bằng DFS?** 3 màu: trắng chưa thăm, xám đang trên stack, đen xong. Gặp đỉnh xám ⇒ chu trình. Thứ tự topo = postorder đảo ngược.
- **Kahn hay DFS?** Kahn: không đệ quy, song song, ưu tiên dễ. DFS: in được chu trình, tự nhiên khi chỉ cần phụ thuộc của một đỉnh.
- **Thứ tự từ điển nhỏ nhất?** Min-heap thay queue, O((V + E) log V).
- **Số học kỳ tối thiểu nếu học song song không giới hạn?** Số tầng Kahn = longest path + 1.
- **Đồ thị vô hướng có "topo sort" không?** Không có hướng thì không có khái niệm này; Minimum Height Trees dùng ý tưởng bóc lá.
- **Có nhiều hơn một thứ tự?** Có nếu tại một thời điểm queue có ≥ 2 đỉnh. Kiểm tra "duy nhất" = queue luôn ≤ 1 phần tử (bài Sequence Reconstruction 444).
- **Đồ thị rất lớn, không vừa RAM?** Lưu indegree và danh sách kề trên đĩa; Kahn chỉ cần truy cập tuần tự cạnh của đỉnh đang xử lý.
- **Thêm cạnh làm xuất hiện chu trình – phát hiện nhanh?** Kiểm tra đường đi từ v tới u trước khi thêm u→v (DFS O(V + E)); cấu trúc incremental phức tạp hơn.

## Checklist nhận diện pattern

- "Tiên quyết", "phụ thuộc", "phải xong trước", "thứ tự hợp lệ" ⇒ topological sort.
- "Có thể hoàn thành tất cả không?" ⇒ phát hiện chu trình.
- "Số bước/học kỳ tối thiểu với song song" ⇒ Kahn theo tầng.
- "Suy ra thứ tự ký tự/bảng chữ cái từ các từ đã sắp xếp" ⇒ xây đồ thị + topo sort.

## Template DFS topo (để so sánh)

```ts
function topoDFS(graph: Record<string, string[]>): string[] | null {
  const color: Record<string, 0 | 1 | 2> = {};
  const out: string[] = [];
  const dfs = (u: string): boolean => {
    color[u] = 1;                                   // xám: đang trên đường đi
    for (const v of graph[u] ?? []) {
      if (color[v] === 1) return false;             // gặp xám ⇒ chu trình
      if (!color[v] && !dfs(v)) return false;
    }
    color[u] = 2;
    out.push(u);                                    // postorder
    return true;
  };
  for (const u of Object.keys(graph)) if (!color[u] && !dfs(u)) return null;
  return out.reverse();
}
```

## Bài luyện tập liên quan

- 207 Course Schedule → 210 Course Schedule II → 1136 Parallel Courses.
- 269 Alien Dictionary (Hard), 444 Sequence Reconstruction, 310 Minimum Height Trees.
- 802 Find Eventual Safe States (Kahn trên đồ thị đảo), 1203 Sort Items by Groups (topo hai cấp).
