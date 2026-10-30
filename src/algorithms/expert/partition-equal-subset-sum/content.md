## Bài toán

Cho mảng `nums` gồm các số nguyên dương. Hỏi có thể chia `nums` thành **hai tập con** (mỗi phần tử thuộc đúng một tập) sao cho tổng hai tập bằng nhau không?

Ví dụ: `[1, 5, 11, 5]` ⇒ `true` vì `{1, 5, 5}` và `{11}` đều có tổng 11. `[1, 2, 3, 5]` ⇒ `false`: tổng 11 lẻ, không thể chia đôi.

## Ý tưởng / Trực giác

Gọi `total` là tổng mảng. Nếu hai tập bằng nhau thì mỗi tập có tổng `total / 2`. Ngược lại, nếu tìm được **một** tập con có tổng `target = total / 2` thì phần còn lại tự động cũng có tổng `target`. Vậy bài toán quy về **Subset Sum**: có tập con nào tổng đúng bằng `target` không?

Đây là **0/1 knapsack** dạng boolean: mỗi số là một món đồ, "trọng lượng" là giá trị của nó, ta chỉ hỏi có xếp vừa khít balo sức chứa `target` hay không, và **mỗi món chỉ dùng tối đa một lần**.

Gọi `dp[i][j]` = có thể chọn từ `i` số đầu một tập con tổng `j`. Công thức: `dp[i][j] = dp[i-1][j] || dp[i-1][j - num]`. Hàng `i` chỉ phụ thuộc hàng `i-1`, nên nén về **một mảng** `dp[j]`, với điều kiện duyệt `j` **giảm dần**.

## Thuật toán từng bước

1. Tính `total`. Nếu lẻ ⇒ trả về `false`.
2. `target = total / 2`; tạo `dp[0..target]` toàn `false`, đặt `dp[0] = true` (tập rỗng).
3. Với mỗi `num` trong `nums`:
   - Cho `j` chạy từ `target` **xuống** `num`: nếu `dp[j - num]` thì đặt `dp[j] = true`.
   - Nếu `dp[target]` đã `true` ⇒ trả về `true` sớm.
4. Trả về `dp[target]`.

## Chứng minh đúng

**Bất biến:** sau khi xử lý `k` số đầu, `dp[j] = true` ⇔ tồn tại tập con của `k` số đầu có tổng `j`.

- Ban đầu (k = 0) chỉ có tập rỗng, tổng 0 ⇒ chỉ `dp[0]` true. Đúng.
- Khi thêm số `num`: tập con tổng `j` của `k+1` số đầu hoặc **không** chứa `num` (đã có trong `dp[j]` cũ), hoặc **chứa** `num` và phần còn lại là tập con tổng `j - num` của `k` số đầu (tức `dp[j - num]` **cũ**).

**Vì sao phải duyệt ngược?** Khi `j` giảm dần, lúc cập nhật `dp[j]` ta đọc `dp[j - num]` với `j - num < j` – ô này **chưa** bị sửa trong lượt hiện tại, nên nó vẫn là giá trị của hàng `k` (cũ). Nếu duyệt `j` tăng dần, `dp[j - num]` có thể vừa được bật **bởi chính `num`**, nghĩa là ta dùng `num` hai lần. Ví dụ `[1, 3]`, target 2: duyệt xuôi bật `dp[1]` rồi dùng nó bật `dp[2]` ⇒ kết luận sai `true`. Duyệt xuôi chính là **unbounded knapsack** (Coin Change).

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| DP 2 chiều | O(n·S) | O(n·S) |
| DP 1 chiều duyệt ngược | O(n·S) | O(S) |
| Bitset (dịch bit rồi OR) | O(n·S / w) | O(S / w) |
| Vét cạn mọi tập con | O(2ⁿ) | O(n) |

Với `S = total / 2`. Đây là thuật toán **giả đa thức**: phụ thuộc giá trị số chứ không chỉ số lượng phần tử.

## Tradeoff

- **1 chiều vs. 2 chiều:** 1 chiều tiết kiệm bộ nhớ nhưng mất khả năng truy vết tập con cụ thể (cần bảng 2 chiều hoặc mảng cha).
- **DP vs. vét cạn/meet-in-the-middle:** khi giá trị rất lớn nhưng n nhỏ (n ≤ 40), meet-in-the-middle O(2^(n/2)) tốt hơn DP theo tổng.
- **Bitset:** dùng `BigInt` hoặc mảng số 32-bit để xử lý 32–64 tổng một lúc, nhanh hơn hằng số lớn.

## Lợi / Hại

**Lợi**
- Code rất ngắn, bộ nhớ O(S).
- Dừng sớm khi tổng lẻ hoặc khi `dp[target]` bật.
- Khuôn mẫu dùng lại cho mọi bài 0/1 knapsack.

**Hại**
- Chậm khi tổng lớn (S cỡ 10⁷ trở lên).
- Không áp dụng trực tiếp khi có số âm (chỉ số `j - num` âm) – cần dịch offset.
- Chỉ trả lời có/không, không cho biết tập con.

## Use case thực tế

- **Cân tải:** chia công việc có thời lượng cho hai máy sao cho cân bằng (Last Stone Weight II là phiên bản "chênh lệch nhỏ nhất").
- **Tài chính:** kiểm tra một nhóm hoá đơn có khớp đúng số tiền thanh toán không (subset sum).
- **Chia đội:** chia người chơi thành hai đội cân bằng điểm số.

## Lỗi thường gặp

- Duyệt `j` tăng dần ⇒ dùng một số nhiều lần.
- Quên kiểm tra tổng lẻ, rồi `total / 2` ra số thực làm hỏng kích thước mảng.
- Quên `dp[0] = true` ⇒ không ô nào bật được.
- Để vòng `j` chạy xuống dưới `num` ⇒ chỉ số âm.
- Dùng DFS không memo ⇒ O(2ⁿ), TLE.

## Biến thể

- **Target Sum (LC 494):** đếm số cách gán dấu ± ⇒ quy về đếm số tập con tổng `(total + target) / 2` (dp đếm thay vì boolean).
- **Last Stone Weight II (LC 1049):** tìm tổng tập con lớn nhất ≤ total/2.
- **Partition to K Equal Sum Subsets (LC 698):** k > 2 thì không còn DP 1 chiều đơn giản – dùng backtracking hoặc bitmask DP.
- **Coin Change II (LC 518):** unbounded ⇒ duyệt `j` **tăng** dần.
