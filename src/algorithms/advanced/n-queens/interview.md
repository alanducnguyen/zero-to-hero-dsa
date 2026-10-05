## Cách trình bày trong phỏng vấn

1. Nói ngay "mỗi hàng một hậu ⇒ chọn cột cho từng hàng ⇒ backtracking theo hàng".
2. Nêu 3 điều kiện xung đột và cách mã hoá đường chéo bằng `row−col`, `row+col` – điểm ghi điểm chính.
3. Viết khung chuẩn: base case → vòng lặp lựa chọn → kiểm tra → chọn → đệ quy → bỏ chọn. Nhấn mạnh **bỏ chọn**.
4. Phân tích: O(n!) lý thuyết, cắt tỉa mạnh thực tế; O(n) bộ nhớ.
5. Nếu được hỏi tối ưu: bitmask, đối xứng, chỉ đếm.

## Khung backtracking tổng quát (thuộc lòng)

```ts
function backtrack(state, choices) {
  if (isGoal(state)) { record(state); return; }
  for (const c of choices(state)) {
    if (!isValid(state, c)) continue;   // cắt tỉa
    apply(state, c);                    // chọn
    backtrack(state, choices);          // đệ quy
    undo(state, c);                     // bỏ chọn – KHÔNG ĐƯỢC QUÊN
  }
}
```

## Câu hỏi follow-up thường gặp

- **Tại sao không cần kiểm tra cùng hàng?** Vì thiết kế đặt đúng 1 hậu mỗi hàng.
- **Tại sao `row−col` và `row+col` xác định đường chéo?** Đi dọc đường chéo `\`, row và col cùng tăng ⇒ hiệu không đổi; đường chéo `/`, một tăng một giảm ⇒ tổng không đổi.
- **Tối ưu bằng bitmask?** `available = ~(cols | d1 | d2) & ((1<<n)−1)`; lấy bit thấp nhất `p = available & -available`; đệ quy với `cols|p`, `(d1|p)<<1`, `(d2|p)>>1`. Nhanh gấp nhiều lần set.
- **Chỉ cần một nghiệm cho n = 1000?** Backtracking vẫn được với heuristic tốt nhưng chậm; dùng công thức xây dựng trực tiếp (có công thức cho mọi n ≥ 4) hoặc min-conflicts.
- **Độ phức tạp chính xác?** Không có biểu thức đóng; chặn trên O(n!), thực tế gần O(n!/c^n).
- **Khác DFS thông thường ở đâu?** Backtracking = DFS trên cây trạng thái ngầm + bỏ chọn để dùng lại bộ nhớ + cắt tỉa.
- **Khi nào dùng backtracking thay vì DP?** Khi cần **liệt kê** nghiệm hoặc bài không có cấu trúc con gối nhau; DP khi chỉ cần giá trị tối ưu và có overlapping subproblems.
- **Song song hoá?** Chia theo cột của hàng 0 cho các luồng; mỗi luồng backtrack độc lập.

## Checklist nhận diện pattern

- "Liệt kê tất cả", "mọi cách", "có tồn tại cách xếp" với ràng buộc ⇒ backtracking.
- n nhỏ (≤ 15–20) trong ràng buộc đề ⇒ gợi ý mạnh cho backtracking/bitmask.
- Có thể kiểm tra ràng buộc **từng phần** (không cần đặt hết mới biết sai) ⇒ cắt tỉa được ⇒ backtracking hiệu quả.

## Bài luyện tập liên quan

- 51 N-Queens → 52 N-Queens II (bitmask).
- 46 Permutations, 47 Permutations II (bỏ trùng), 78 Subsets, 90 Subsets II.
- 39 Combination Sum, 40 Combination Sum II, 77 Combinations.
- 37 Sudoku Solver (Hard), 79 Word Search, 22 Generate Parentheses, 131 Palindrome Partitioning.
