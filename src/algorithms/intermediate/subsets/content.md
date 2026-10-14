## Bài toán

Cho mảng `nums` gồm các số **khác nhau**. Trả về tất cả tập con (power set), thứ tự bất kỳ.

`[1, 2, 3]` → `[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]` (8 = 2³ tập).

Subsets (LeetCode 78) là bài backtracking "sạch" nhất: không có điều kiện cắt tỉa, không có đáp án sai, nên rất hợp để học **khung chọn / đệ quy / bỏ chọn** trước khi sang Combination Sum, Permutations, N-Queens.

## Ý tưởng / Trực giác

Xây tập con dần dần: tại mỗi bước quyết định phần tử **kế tiếp** đưa vào. Để không sinh trùng (`[1,2]` và `[2,1]` là cùng tập), quy ước chỉ được chọn phần tử có chỉ số **lớn hơn** phần tử vừa chọn (`start`). Khi đó mỗi tập con tương ứng đúng một đường đi trên cây đệ quy, và **mọi nút** trên cây đều là một tập con hợp lệ ⇒ ghi nhận ngay khi vào hàm.

Cách nhìn khác: mỗi phần tử có 2 lựa chọn chọn/không chọn ⇒ 2ⁿ lá; cách `start` ở trên chỉ là một cách duyệt cây đó không cần nhánh "không chọn" tường minh.

## Thuật toán từng bước

1. `result = []`, `path = []`.
2. `backtrack(start)`: thêm bản sao `path` vào `result`. Với `i = start..n−1`: `path.push(nums[i])`, `backtrack(i + 1)`, `path.pop()`.
3. Gọi `backtrack(0)`, trả về `result`.

Ở tab **Debug**, con trỏ `start` cho biết từ đâu được chọn; ô tím là phần tử vừa chọn, ô đỏ là vừa bỏ chọn; stack `path` là tập con đang xây; call stack hiển thị độ sâu đệ quy.

## Chứng minh đúng

**Đầy đủ:** xét tập con `S = {nums[i₁] < … < nums[iₖ]}` theo chỉ số tăng. Đường đi chọn `i₁` ở tầng 1 (vì `i₁ ≥ 0 = start`), chọn `i₂` ở tầng 2 (vì `i₂ ≥ i₁ + 1`), … tồn tại trên cây và nút cuối có `path = S` được ghi nhận.

**Không trùng:** hai đường đi khác nhau có dãy chỉ số chọn khác nhau; vì chỉ số luôn tăng nghiêm ngặt trong một đường, dãy chỉ số xác định duy nhất tập hợp, nên hai đường khác nhau cho hai tập khác nhau.

**Quay lui đúng:** `pop` ngay sau đệ quy trả về khôi phục `path` về trạng thái trước `push`, nên các nhánh anh em độc lập.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Backtracking | O(n · 2ⁿ) (2ⁿ tập, chép mỗi tập O(n)) | O(n) stack + O(n · 2ⁿ) output |
| Bitmask `0..2ⁿ−1` | O(n · 2ⁿ) | O(1) phụ |
| Lặp mở rộng (cascading) | O(n · 2ⁿ) | O(n · 2ⁿ) |

Không thể tốt hơn O(2ⁿ) vì phải xuất 2ⁿ tập.

## Tradeoff

- Backtracking dễ thêm ràng buộc (tổng ≤ k, độ dài = k, cắt tỉa) – là lý do nó được ưa chuộng hơn bitmask trong phỏng vấn.
- Bitmask gọn nhất (`for mask in 0..2ⁿ`), nhưng chỉ dùng được khi n ≤ ~20 và không cắt tỉa được giữa chừng.
- Cascading (với mỗi phần tử, nhân đôi danh sách hiện có) không đệ quy, dễ hiểu, nhưng tốn bộ nhớ trung gian.

## Lợi / Hại

**Lợi:** khung duy nhất giải được Subsets, Combinations, Combination Sum, Permutations, Palindrome Partitioning chỉ bằng đổi điều kiện ghi nhận và cách chọn. **Hại:** hàm mũ – n ≈ 25 đã là 33 triệu tập; cần cắt tỉa hoặc đổi thuật toán khi chỉ cần một tập thoả.

## Use case thực tế

- Sinh mọi tổ hợp cấu hình để test (feature flags, tham số), fuzzing nhỏ.
- Tìm tập con thoả ràng buộc khi n nhỏ: chọn gói hàng vừa thùng, chia nhóm, bài toán knapsack brute force để kiểm chứng DP.
- Sinh query cho tối ưu hoá join order khi số bảng nhỏ.
- Liệt kê tập quyền (permission sets) để kiểm tra chính sách.

## Lỗi thường gặp

- `result.push(path)` không chép ⇒ mọi phần tử của result cùng trỏ tới một mảng, cuối cùng toàn rỗng.
- Đệ quy `backtrack(start + 1)` thay vì `backtrack(i + 1)` ⇒ sinh trùng và thiếu.
- Quên `pop` ⇒ path phình ra, kết quả sai.
- Với mảng có phần tử trùng (Subsets II) không sort + bỏ qua `nums[i] === nums[i−1]` khi `i > start`.

## Biến thể

- **Subsets II (90):** sort, bỏ qua phần tử trùng ở cùng tầng.
- **Combinations (77):** chỉ ghi nhận khi `path.length === k`; cắt tỉa khi không đủ phần tử còn lại.
- **Combination Sum (39):** cho phép chọn lại (`backtrack(i)`), cắt khi tổng vượt target.
- **Permutations (46):** không dùng `start`, dùng mảng `used`.
- **Bitmask:** `for (mask = 0; mask < 1 << n; mask++)` lấy bit để chọn phần tử.
