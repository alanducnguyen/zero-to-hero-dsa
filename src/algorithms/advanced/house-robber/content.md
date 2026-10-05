## Bài toán

Dãy nhà, nhà thứ `i` có `nums[i]` tiền. Không được lấy hai nhà **kề nhau**. Tìm tổng lớn nhất có thể lấy.

House Robber (LeetCode 198) là bài DP được chọn để dạy vì nó đủ đơn giản để thấy **ba bước chuẩn của DP** (trạng thái – công thức chuyển – cơ sở) nhưng không tầm thường như Fibonacci. Amazon hỏi nó và biến thể vòng tròn (213) rất đều.

## Ý tưởng / Trực giác

**Tham lam sai:** lấy nhà nhiều tiền nhất rồi loại hai bên – `[2, 7, 9, 3, 1]` tham lam lấy 9 rồi 2 = 11, nhưng 2 + 9 + 1 = 12 tốt hơn. Cần xét mọi tổ hợp, nhưng 2ⁿ tổ hợp là quá nhiều.

**Quan sát:** quyết định ở nhà cuối cùng chỉ có 2 khả năng:
- **Bỏ** nhà `i` ⇒ bài toán thành "i−1 nhà đầu".
- **Lấy** nhà `i` ⇒ không được lấy nhà `i−1` ⇒ bài toán thành "i−2 nhà đầu" cộng `nums[i]`.

Hai bài con đó lại có cùng dạng ⇒ định nghĩa `dp[i]` = tiền tối đa từ `i` nhà đầu tiên, và `dp[i] = max(dp[i−1], dp[i−2] + nums[i−1])`. Mỗi `dp[i]` tính một lần, tái sử dụng ⇒ O(n).

## Thuật toán từng bước

1. `dp[0] = 0`, `dp[1] = nums[0]`.
2. Với `i = 2..n`: `dp[i] = max(dp[i−1], dp[i−2] + nums[i−1])`.
3. Trả `dp[n]`.

Tab **Debug**: bảng `dp` điền dần; ô vàng là hai giá trị phụ thuộc, cột tím là nhà đang xét; cuối cùng các nhà xanh lá là một cách chọn tối ưu (truy vết).

## Chứng minh đúng

**Định nghĩa:** `dp[i]` = giá trị tối ưu của bài toán giới hạn trên `nums[0..i)`.

**Cơ sở:** `dp[0] = 0`, `dp[1] = nums[0]` hiển nhiên (giả sử `nums ≥ 0`).

**Quy nạp:** lời giải tối ưu `S` cho `i` nhà đầu hoặc không chứa nhà `i−1` (thì `S` là lời giải hợp lệ cho `i−1` nhà ⇒ `|S| ≤ dp[i−1]`), hoặc chứa nhà `i−1` (thì `S` không chứa nhà `i−2`, phần còn lại của `S` hợp lệ cho `i−2` nhà ⇒ `|S| ≤ dp[i−2] + nums[i−1]`). Vậy `dp[i] ≥ |S|`. Ngược lại cả hai vế trong `max` đều là lời giải hợp lệ ⇒ `dp[i] ≤ |S|`. Suy ra bằng nhau.

Đây là **optimal substructure**: lời giải tối ưu chứa lời giải tối ưu của bài con. Và **overlapping subproblems**: `dp[i−1]` và `dp[i−2]` được dùng lại.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n) | Mỗi `dp[i]` O(1) |
| Bộ nhớ | O(n) | Mảng dp; **O(1)** nếu chỉ giữ 2 biến `prev2`, `prev1` |
| Đệ quy không memo | O(2ⁿ) | Để so sánh – đây là lý do cần DP |

## Tradeoff

- **Bottom-up ↔ Top-down (memo):** top-down viết trực tiếp từ công thức đệ quy, chỉ tính trạng thái cần; bottom-up không đệ quy, dễ tối ưu bộ nhớ, nhanh hơn. Phỏng vấn: nêu đệ quy để suy công thức, viết bottom-up.
- **O(n) mảng ↔ O(1) hai biến:** hai biến đủ cho bài này; mảng cần nếu muốn **truy vết** (nhà nào được chọn) hoặc trả lời nhiều truy vấn tiền tố.
- **Trạng thái "i nhà đầu" ↔ "lấy/không lấy nhà i":** cách thứ hai dùng 2 trạng thái mỗi nhà (`take[i]`, `skip[i]`), tổng quát hơn cho bài có nhiều ràng buộc (ví dụ cooldown trong Stock với cooldown).
- **DP ↔ Greedy:** greedy sai ở đây; DP đảm bảo tối ưu với chi phí O(n) – rẻ, nên không có lý do dùng greedy.

## Lợi / Hại

**Lợi**
- Tuyến tính, O(1) bộ nhớ.
- Mẫu "chọn/không chọn với ràng buộc kề" dùng lại cho nhiều bài: Delete and Earn, Stock với cooldown, Paint House, Decode Ways.

**Hại**
- Chỉ áp dụng khi ràng buộc là **cục bộ** (kề nhau). Ràng buộc toàn cục (tổng số nhà ≤ k) cần thêm chiều trạng thái O(n·k).
- Với `nums` âm, cơ sở và công thức cần sửa (cho phép không lấy gì).

## Use case thực tế

- **Lập lịch không chồng lấn:** chọn ca làm/quảng cáo có lợi nhuận cao nhất mà không trùng khung giờ kề (Weighted Interval Scheduling là bản tổng quát với binary search).
- **Đặt trạm / cell tower:** tối đa phủ sóng với ràng buộc khoảng cách tối thiểu.
- **Tối ưu tài nguyên theo thời gian:** CPU không chạy hai job nặng liên tiếp (nhiệt), chọn job lợi nhất.
- **Nén / mã hoá:** Decode Ways, cắt chuỗi tối ưu đều là DP 1D cùng khung.
- **Tài chính:** chọn giao dịch với "cooldown" bắt buộc.

## Lỗi thường gặp

1. Lệch index giữa `dp[i]` (i nhà) và `nums[i−1]` (nhà thứ i).
2. `dp[1] = max(nums[0], nums[1])` nhưng quên kiểm tra `n = 1` ⇒ truy cập ngoài mảng.
3. Dùng greedy "lấy nhà to nhất".
4. Quên trường hợp mảng rỗng.
5. Biến thể vòng tròn (213): quên rằng nhà đầu và cuối kề nhau ⇒ phải chạy 2 lần (bỏ nhà đầu / bỏ nhà cuối).
6. Tối ưu O(1) nhưng cập nhật sai thứ tự hai biến.

## Biến thể

- **House Robber II (213):** vòng tròn ⇒ `max(rob(nums[1..]), rob(nums[..n−1]))`.
- **House Robber III (337):** trên cây ⇒ DP postorder với 2 trạng thái (lấy/không lấy node).
- **Delete and Earn (740):** gom theo giá trị thành mảng `sum[v]`, rồi House Robber trên chỉ số giá trị.
- **Climbing Stairs (70):** cùng cấu trúc `dp[i] = dp[i−1] + dp[i−2]` (đếm thay vì max).
- **Best Time to Buy and Sell Stock with Cooldown (309):** trạng thái mở rộng (hold / sold / rest).
- **Tối đa k nhà:** thêm chiều `dp[i][k]`.
