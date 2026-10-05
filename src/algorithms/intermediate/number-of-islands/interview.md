## Cách trình bày trong phỏng vấn

1. Nói ngay: "Lưới là đồ thị, đảo là thành phần liên thông; tôi đếm số lần khởi động DFS."
2. Hỏi: 4 hay 8 hướng? Được sửa lưới không? Kích thước tối đa (để quyết định đệ quy hay lặp)?
3. Viết `sink` với điều kiện dừng ở đầu, đánh dấu rồi đệ quy 4 hướng; vòng ngoài đếm.
4. O(m·n) thời gian và bộ nhớ; nêu rủi ro tràn stack và phiên bản stack/BFS.
5. Nêu Union-Find cho phiên bản động như follow-up.

## Phiên bản lặp (tránh tràn stack)

```ts
function sinkIter(grid: number[][], visited: boolean[][], sr: number, sc: number): void {
  const m = grid.length, n = grid[0].length;
  const stack: [number, number][] = [[sr, sc]];
  visited[sr][sc] = true;
  while (stack.length) {
    const [r, c] = stack.pop()!;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
      if (grid[nr][nc] === 0 || visited[nr][nc]) continue;
      visited[nr][nc] = true;       // đánh dấu khi push, không phải khi pop
      stack.push([nr, nc]);
    }
  }
}
```

## Câu hỏi follow-up thường gặp

- **Diện tích đảo lớn nhất?** `sink` trả về 1 + tổng từ 4 hướng.
- **Lưới 10⁴ × 10⁴ toàn đất?** Đệ quy sâu 10⁸ ⇒ tràn; dùng stack/BFS; bộ nhớ visited 10⁸ bit ⇒ dùng bitset hoặc sửa tại chỗ.
- **Thêm đất từng ô, hỏi số đảo sau mỗi lần?** Union-Find: mỗi ô mới là một đảo, union với hàng xóm đất, giảm count mỗi lần union thành công. O(α) mỗi thao tác.
- **Đếm đảo có hình dạng khác nhau?** Ghi lại chuỗi đường đi DFS (hướng + backtrack) chuẩn hoá, bỏ vào Set.
- **Đảo không chạm biên (bị bao quanh)?** Flood fill từ các ô biên trước để loại vùng chạm biên.
- **Song song hoá?** Chia lưới thành dải, đếm trong dải, rồi Union-Find trên các ô biên giữa dải.
- **BFS hay DFS tốt hơn?** Cùng O(m·n). BFS bộ nhớ O(độ rộng frontier), DFS O(độ sâu); với đảo hình rắn DFS tệ, với đảo hình vuông lớn BFS tệ. Chọn theo ràng buộc; BFS không tràn stack.
- **Đất và nước đổi vai (đếm hồ)?** Cùng thuật toán với điều kiện đảo ngược; hồ = vùng nước không chạm biên.

## Checklist nhận diện pattern

- "Vùng liên thông", "đảo", "cụm", "tô màu", "lan ra" trên lưới ⇒ flood fill DFS/BFS.
- "Thêm dần và hỏi số vùng" ⇒ Union-Find.
- "Từ biên vào" (bị bao quanh, nước chảy ra biển) ⇒ flood fill từ biên.
- "Đường ngắn nhất" trên lưới ⇒ BFS, không phải DFS.

## Bài luyện tập liên quan

- 200 Number of Islands → 695 Max Area of Island → 463 Island Perimeter.
- 733 Flood Fill, 130 Surrounded Regions, 417 Pacific Atlantic Water Flow.
- 694 Number of Distinct Islands, 305 Number of Islands II (Hard, Union-Find), 1254 Number of Closed Islands.
