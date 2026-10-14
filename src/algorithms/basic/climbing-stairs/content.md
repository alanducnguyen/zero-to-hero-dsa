## Bài toán

Cầu thang có `n` bậc. Mỗi bước bạn lên 1 hoặc 2 bậc. Có bao nhiêu cách khác nhau để lên tới đỉnh?

`n = 3` → 3 cách: `1+1+1`, `1+2`, `2+1`. `n = 6` → 13 cách.

Climbing Stairs (LeetCode 70) là bài quy hoạch động đầu tiên hầu hết mọi người gặp. Nó nhỏ nhưng chứa trọn khung tư duy DP: **định nghĩa trạng thái → công thức chuyển → cơ sở → thứ tự tính**.

## Ý tưởng / Trực giác

Đừng hỏi "đi thế nào", hãy hỏi **"bước cuối cùng từ đâu tới?"**. Để đứng ở bậc `i`, bước cuối hoặc là 1 bậc (từ `i−1`) hoặc là 2 bậc (từ `i−2`). Hai nhóm cách này rời nhau (khác bước cuối) và phủ hết mọi cách, nên:

`ways(i) = ways(i−1) + ways(i−2)`

Đó là dãy Fibonacci. Đệ quy thuần tính lại `ways(i−2)` nhiều lần (hàm mũ); DP lưu kết quả vào bảng nên mỗi giá trị tính đúng một lần.

## Thuật toán từng bước

1. `dp[0] = 1` (đứng yên là một cách), `dp[1] = 1`.
2. Với `i = 2..n`: `dp[i] = dp[i−1] + dp[i−2]`.
3. Trả về `dp[n]`.

Ở tab **Debug**, ô tím là `dp[i]` đang tính, hai ô vàng là hai bài con nó phụ thuộc; ô xanh lá là đã chốt. Thử `n = 10` để thấy số cách tăng theo cấp số nhân (tỉ lệ vàng ≈ 1.618).

## Chứng minh đúng

Quy nạp theo `i`. Cơ sở `dp[0]`, `dp[1]` đúng theo định nghĩa. Giả sử `dp[j]` đúng với mọi `j < i`. Tập cách leo tới `i` = (cách leo tới `i−1`, rồi bước 1) ∪ (cách leo tới `i−2`, rồi bước 2). Hai tập rời nhau vì bước cuối khác nhau; mọi cách leo tới `i` nằm trong một trong hai tập. Vậy `|tập| = dp[i−1] + dp[i−2]`.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ |
|---|---|---|
| Đệ quy thuần | O(φⁿ) ≈ O(1.618ⁿ) | O(n) stack |
| Đệ quy + memo (top-down) | O(n) | O(n) |
| Bảng dp (bottom-up) | O(n) | O(n) |
| Hai biến | O(n) | O(1) |
| Luỹ thừa ma trận | O(log n) | O(1) |

## Tradeoff

- Bảng `dp` dễ hiểu và dễ mở rộng (thêm ràng buộc, in ra cách); hai biến tiết kiệm bộ nhớ nhưng mất lịch sử.
- Top-down tự nhiên hơn khi công thức phức tạp; bottom-up không lo tràn stack.
- Với n rất lớn cần luỹ thừa ma trận 2×2 hoặc công thức đóng (Binet, cẩn thận sai số).

## Lợi / Hại

**Lợi:** khung tư duy áp dụng được cho hàng trăm bài đếm cách; code 5 dòng. **Hại:** kết quả tăng hàm mũ nên n ≈ 80 đã vượt `Number.MAX_SAFE_INTEGER`, cần `BigInt` hoặc modulo.

## Use case thực tế

- Đếm cách lát gạch 1×2 lên bảng 2×n (cùng công thức).
- Số chuỗi nhị phân độ dài n không có hai số 1 liền nhau.
- Dự toán số kịch bản trong mô hình có hai lựa chọn mỗi bước (sản phẩm, đường đi).
- Khung cho bài "Decode Ways", "Min Cost Climbing Stairs" trong thực tế là phân tích token/chuỗi.

## Lỗi thường gặp

- Đặt `dp[0] = 0`: làm `dp[2] = 1` sai. `dp[0] = 1` vì "không làm gì" là một cách.
- Đệ quy thuần không memo ⇒ TLE với n ≈ 40.
- Quên trường hợp `n = 0`, `n = 1` khi chỉ dùng hai biến.
- Tràn số với n lớn.

## Biến thể

- **Bước 1, 2, 3 bậc:** `dp[i] = dp[i−1] + dp[i−2] + dp[i−3]` (Tribonacci).
- **Tập bước tuỳ ý `steps`:** `dp[i] = Σ dp[i − s]` – chính là Coin Change II không xét thứ tự / có xét thứ tự.
- **Min Cost Climbing Stairs (746):** `dp[i] = cost[i] + min(dp[i−1], dp[i−2])`.
- **Decode Ways (91):** cùng công thức nhưng mỗi nhánh có điều kiện hợp lệ.
- **Có bậc hỏng:** `dp[i] = 0` tại bậc cấm.
