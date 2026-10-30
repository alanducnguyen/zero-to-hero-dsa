## Bài toán

Cho mảng `candidates` gồm các số nguyên dương **khác nhau** và số `target`. Trả về mọi tổ hợp (không trùng) các số trong `candidates` có tổng bằng `target`. **Mỗi số được dùng lại không giới hạn** (LeetCode 39).

Ví dụ: `candidates = [2, 3, 6, 7]`, `target = 7` ⇒ `[[2, 2, 3], [7]]`.

Hai tổ hợp chỉ khác thứ tự (`[2, 3, 2]` và `[2, 2, 3]`) được coi là một. Trong bài học này kết quả trả về theo thứ tự DFS trên mảng đã sort, mỗi tổ hợp là dãy không giảm.

## Ý tưởng / Trực giác

Hãy coi việc xây tổ hợp là đi xuống một **cây quyết định**: mỗi tầng thêm một số vào `path`, giá trị còn thiếu `remain = target − tổng(path)` giảm dần. Khi `remain = 0` ta có một đáp án; khi `remain < 0` nhánh đó vô vọng.

Hai câu hỏi cần trả lời:

1. **Làm sao không sinh trùng?** Ép mỗi tổ hợp được sinh theo đúng **một thứ tự**: dãy chỉ số không giảm. Tầng con chỉ được chọn từ chỉ số `start` trở đi. Vì được dùng lại, ta truyền `i` (không phải `i + 1` như Subsets/Combinations).
2. **Làm sao cắt nhánh sớm?** Sort `candidates` tăng dần. Khi gặp `nums[i] > remain`, mọi `nums[j]` với `j > i` còn lớn hơn ⇒ `break` cả vòng lặp, không chỉ `continue`. Nhờ vậy ta không bao giờ đi vào nhánh có `remain < 0`.

## Thuật toán từng bước

1. `nums = sort(candidates)`, `result = []`, `path = []`.
2. `backtrack(start, remain)`:
   - Nếu `remain == 0`: push **bản sao** `path` vào `result`, return.
   - Với `i` từ `start` tới `n − 1`:
     - Nếu `nums[i] > remain`: `break` (cắt tỉa).
     - `path.push(nums[i])`.
     - `backtrack(i, remain − nums[i])` – vẫn là `i` để được dùng lại.
     - `path.pop()` (quay lui).
3. Gọi `backtrack(0, target)`, trả về `result`.

## Chứng minh đúng

- **Hợp lệ:** một tổ hợp chỉ được ghi khi `remain == 0`, tức tổng `path` đúng bằng `target`.
- **Không trùng:** mọi `path` sinh ra có chỉ số không giảm. Mỗi multiset có đúng một cách viết không giảm ⇒ mỗi tổ hợp xuất hiện tối đa một lần.
- **Không thiếu:** với một tổ hợp hợp lệ, viết nó dưới dạng không giảm `a₁ ≤ a₂ ≤ … ≤ aₘ`. Ở tầng `d`, `a_d ≥ a_{d−1}` nên chỉ số của nó `≥ start`, và `a_d ≤ remain` (vì các số còn lại đều dương) nên không bị cắt tỉa ⇒ DFS đi theo đúng đường đó.
- **Dừng:** mỗi lời gọi đệ quy giảm `remain` ít nhất `min(nums) ≥ 1`, nên độ sâu tối đa là `target / min`.

## Độ phức tạp

| Đại lượng | Giá trị |
|---|---|
| Thời gian (cận trên) | O(n^(T/m + 1)) |
| Độ sâu đệ quy | O(T/m) |
| Bộ nhớ phụ | O(T/m) + output |
| Sort | O(n log n) |

Với `T = target`, `m = min(candidates)`. Cây có độ sâu tối đa `T/m`, mỗi node rẽ tối đa `n` nhánh. Trong thực tế cắt tỉa giảm mạnh số node, nhưng output có thể tự nó lớn theo cấp số mũ nên không thể tốt hơn đáng kể trong worst case. Mỗi lần ghi nhận tốn thêm `O(T/m)` để sao chép `path`.

## Tradeoff

- **Backtracking vs DP:** nếu chỉ cần **đếm** số tổ hợp, DP kiểu coin change `O(n · T)` nhanh hơn rất nhiều. Backtracking cần khi phải **liệt kê** từng tổ hợp.
- **Sort + break vs không sort:** sort tốn `O(n log n)` một lần nhưng cho phép `break` sớm; không sort thì chỉ `continue` hoặc phải đi vào nhánh `remain < 0` rồi mới return.
- **Truyền `remain` vs tính tổng:** truyền `remain` giảm dần tránh phải cộng lại `path` ở mỗi node (`O(1)` thay vì `O(depth)`).

## Lợi / Hại

**Lợi:** code ngắn, khung backtracking chuẩn; cắt tỉa đơn giản mà hiệu quả; sinh kết quả theo thứ tự ổn định, dễ kiểm thử.

**Hại:** độ phức tạp mũ; với `target` lớn so với `min(candidates)` cây rất sâu và output bùng nổ; không xử lý được số 0 hoặc số âm (vòng lặp vô hạn) – cần kiểm tra đầu vào.

## Use case thực tế

- **Đổi tiền / gói hàng:** liệt kê mọi cách ghép mệnh giá hoặc kích thước gói để đạt đúng số lượng.
- **Cấu hình sản phẩm:** chọn các module (được lặp lại) sao cho tổng công suất/chi phí đúng ngân sách.
- **Sinh test case:** liệt kê mọi phân tích của một số để kiểm thử hàm tính toán.

## Lỗi thường gặp

- Truyền `i + 1` thay vì `i` ⇒ mất các tổ hợp dùng lại số (`[2, 2, 3]`).
- Bắt đầu vòng lặp từ `0` thay vì `start` ⇒ sinh trùng hoán vị (`[2, 3, 2]`, `[3, 2, 2]`).
- `break` khi mảng **chưa sort** ⇒ bỏ sót đáp án.
- Push `path` thay vì bản sao `[...path]` ⇒ mọi phần tử trong `result` cùng trỏ tới một mảng đã bị pop rỗng.
- Quên `path.pop()` sau đệ quy ⇒ trạng thái rò sang nhánh anh em.

## Biến thể

- **LC 40 – Combination Sum II:** mỗi số dùng một lần, có trùng ⇒ truyền `i + 1` và bỏ qua `nums[i] == nums[i − 1]` khi `i > start`.
- **LC 216 – Combination Sum III:** chọn đúng `k` số từ 1..9, thêm điều kiện độ dài `path`.
- **LC 377 – Combination Sum IV:** đếm số **dãy có thứ tự** ⇒ DP, không backtracking.
- **LC 322 / 518 – Coin Change:** số đồng xu tối thiểu / số cách ⇒ DP trên `target`.
