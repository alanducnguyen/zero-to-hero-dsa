## Bài toán

Cho mảng `nums` gồm `n` số **khác nhau**. Trả về mọi hoán vị (permutation) của `nums` – mọi cách sắp xếp thứ tự các phần tử. Có đúng `n!` hoán vị.

Ví dụ: `nums = [1, 2, 3]` ⇒ `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`.

## Ý tưởng / Trực giác

Hãy tưởng tượng điền `n` ô trống từ trái sang phải. Ô đầu có `n` lựa chọn, ô thứ hai còn `n − 1` (trừ số đã dùng), …, ô cuối còn 1 ⇒ `n · (n−1) · … · 1 = n!` cách. Đây là một **cây quyết định**: mỗi tầng là một vị trí, mỗi nhánh là một số chưa dùng, mỗi lá là một hoán vị hoàn chỉnh.

Backtracking duyệt cây này bằng DFS với ba thao tác: **chọn** (push vào `path`, đánh dấu `used[i] = true`), **đệ quy** xuống tầng tiếp theo, rồi **bỏ chọn** (pop, `used[i] = false`) để thử nhánh anh em.

Khác biệt cốt lõi so với Subsets/Combinations: ở tổ hợp, thứ tự không quan trọng nên ta chỉ xét phần tử **sau** `start` để tránh trùng. Ở hoán vị, `[2, 1]` khác `[1, 2]`, nên ở mỗi tầng ta xét **lại từ đầu mảng** và dùng `used[]` để loại các số đã có trong `path`. Ngoài ra chỉ ghi nhận kết quả ở **lá** (khi `path` đủ `n`), không phải ở mọi nút.

## Thuật toán từng bước

1. Khởi tạo `result = []`, `path = []`, `used = [false] * n`.
2. `backtrack()`:
   - Nếu `path.length == n`: push **bản sao** của `path` vào `result`, return.
   - Với mỗi `i` từ 0 tới `n − 1`:
     - Nếu `used[i]`: bỏ qua.
     - `used[i] = true`, `path.push(nums[i])`.
     - Gọi `backtrack()`.
     - `path.pop()`, `used[i] = false` (khôi phục trạng thái).
3. Gọi `backtrack()` và trả về `result`.

## Chứng minh đúng

- **Mỗi lá là một hoán vị hợp lệ:** `used[]` đảm bảo mỗi chỉ số xuất hiện tối đa một lần trong `path`; `path` có đúng `n` phần tử ⇒ mỗi chỉ số xuất hiện đúng một lần.
- **Không thiếu:** với một hoán vị bất kỳ `σ`, ở tầng `d` phần tử `σ[d]` chưa được dùng (vì các phần tử trước nó khác nó), nên vòng `for` sẽ thử nó ⇒ DFS đi theo đúng đường `σ` tới lá.
- **Không trùng:** hai đường khác nhau từ gốc khác nhau ở tầng đầu tiên chúng rẽ ⇒ hai hoán vị khác nhau ở vị trí đó (vì `nums` phân biệt).
- **Bất biến quay lui:** sau khi `backtrack()` trả về, `path` và `used` trở lại đúng trạng thái trước lời gọi, nên nhánh anh em bắt đầu từ trạng thái sạch.

## Độ phức tạp

| Thành phần | Chi phí |
|---|---|
| Số lá | `n!` |
| Số nút trong cây | `Σ n!/(n−k)!` ≈ `e · n!` |
| Sao chép mỗi kết quả | `O(n)` |
| Tổng thời gian | `O(n · n!)` |
| Bộ nhớ phụ (stack + used + path) | `O(n)` |
| Bộ nhớ output | `O(n · n!)` |

Vì output đã có kích thước `n · n!`, không thuật toán nào nhanh hơn tiệm cận.

## Tradeoff

- **used[] + path (cách này):** dễ hiểu, sinh theo thứ tự từ điển của chỉ số, mở rộng tự nhiên sang Permutations II (bỏ trùng). Tốn thêm `O(n)` cho `used`.
- **Swap tại chỗ:** hoán đổi `nums[start]` với `nums[i]` rồi đệ quy `start + 1`. Không cần `used`, nhưng thứ tự output không còn là từ điển và khó xử lý phần tử trùng.
- **Next Permutation lặp:** sinh hoán vị kế tiếp trong `O(n)` không đệ quy, hợp khi cần stream từng hoán vị theo thứ tự từ điển.
- **Heap's algorithm:** mỗi hoán vị mới chỉ cách hoán vị trước một phép swap – tối ưu số thao tác nhưng khó giải thích trong phỏng vấn.

## Lợi / Hại

**Lợi:** khung tổng quát cho mọi bài "sắp thứ tự"; dễ thêm pruning (cắt nhánh) khi có ràng buộc.

**Hại:** bùng nổ giai thừa – `10! ≈ 3.6 triệu`, `12! ≈ 479 triệu`. Chỉ khả thi khi `n` nhỏ (≈ ≤ 10), hoặc khi pruning cắt được phần lớn cây.

## Use case thực tế

- **Brute-force tối ưu nhỏ:** thử mọi thứ tự ghé thăm cho TSP với vài điểm, lập lịch ít tác vụ.
- **Kiểm thử:** sinh mọi thứ tự xen kẽ sự kiện để tìm race condition (model checking quy mô nhỏ).
- **Giải đố:** Sudoku, N-Queens, cryptarithm – cùng khung chọn/đệ quy/bỏ chọn kèm điều kiện cắt nhánh.

## Lỗi thường gặp

- Push `path` thay vì `[...path]` ⇒ mọi kết quả trỏ cùng một mảng, cuối cùng đều rỗng.
- Quên `used[i] = false` khi quay lui ⇒ nhánh sau thiếu phần tử, mất hoán vị.
- Dùng `path.includes(nums[i])` thay cho `used[]` ⇒ đúng nhưng thêm `O(n)` mỗi lần kiểm tra, và sai khi có phần tử trùng.
- Duyệt từ `start` như Subsets ⇒ chỉ sinh được 1 hoán vị (thứ tự gốc).

## Biến thể

- **LC 47 – Permutations II (có trùng):** sort trước, bỏ qua `nums[i]` nếu `nums[i] == nums[i−1]` và `!used[i−1]`.
- **LC 31 – Next Permutation:** sinh hoán vị kế tiếp tại chỗ.
- **LC 60 – Permutation Sequence:** tìm hoán vị thứ k bằng hệ cơ số giai thừa, không cần sinh hết.
- **LC 784 – Letter Case Permutation, LC 22 – Generate Parentheses:** cùng khung backtracking với tập lựa chọn khác.
