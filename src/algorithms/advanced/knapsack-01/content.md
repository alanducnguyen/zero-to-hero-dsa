## Bài toán

Có `n` món, món `i` nặng `w[i]` và đáng giá `v[i]`. Túi chứa tối đa `W`. Chọn tập món (mỗi món **tối đa một lần**) có tổng trọng lượng ≤ `W` và tổng giá trị lớn nhất.

0/1 Knapsack là "mẹ" của một họ bài DP rất lớn: Partition Equal Subset Sum, Target Sum, Last Stone Weight II, Ones and Zeroes… Người phỏng vấn thường không hỏi thẳng knapsack mà hỏi một bài con; nhận ra "đây là knapsack" là một nửa chiến thắng.

## Ý tưởng / Trực giác

Tham lam theo tỉ lệ giá trị/trọng lượng **sai** với 0/1 (chỉ đúng với fractional knapsack): `w = [1, 2, 3], v = [6, 10, 12], W = 5`. Tỉ lệ là 6, 5, 4 nên tham lam lấy món 1 rồi món 2 = 16 và hết chỗ cho món 3; tối ưu là món 2 + món 3 = 22. Vấn đề: lấy một món "tốt" có thể chặn một tổ hợp tốt hơn. Cần xét mọi tổ hợp một cách thông minh.

DP: xét từng món, với mỗi sức chứa `w`, câu hỏi chỉ có hai đáp án: **không lấy** (giữ kết quả của `i−1` món với sức chứa `w`) hoặc **lấy** (giá trị món + kết quả của `i−1` món với sức chứa `w − w[i]`). `dp[i][w] = max(dp[i−1][w], dp[i−1][w−w[i]] + v[i])`.

Điểm then chốt so với Coin Change: **chỉ nhìn hàng `i−1`**, không nhìn hàng `i` ⇒ mỗi món dùng tối đa một lần.

## Thuật toán từng bước

1. `dp[0][w] = 0` ∀w.
2. Với `i = 1..n`, `w = 0..W`: `dp[i][w] = dp[i−1][w]`; nếu `w[i] ≤ w`: `dp[i][w] = max(dp[i][w], dp[i−1][w−w[i]] + v[i])`.
3. Trả `dp[n][W]`. Truy vết: từ `(n, W)` đi lên, nếu `dp[i][w] ≠ dp[i−1][w]` ⇒ món i được lấy, `w −= w[i]`.

Tab **Debug**: bảng dp điền từng ô; ô vàng là "không lấy", ô cyan là "lấy" (hàng trên, cột lùi w[i]). Cuối cùng truy vết tô xanh các món được chọn.

## Chứng minh đúng

**Định nghĩa:** `dp[i][w]` = giá trị lớn nhất dùng tập con của `i` món đầu với tổng trọng lượng ≤ `w`.

**Quy nạp theo i:** tập tối ưu `S` cho `(i, w)` hoặc không chứa món `i` (⇒ `S` hợp lệ cho `(i−1, w)` ⇒ `v(S) ≤ dp[i−1][w]`), hoặc chứa (⇒ `S \ {i}` hợp lệ cho `(i−1, w − w[i])` ⇒ `v(S) ≤ dp[i−1][w−w[i]] + v[i]`). Vậy `dp[i][w] ≥ v(S)`; và cả hai vế trong max đều ứng với tập hợp lệ ⇒ `dp[i][w] ≤ v(S)`.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n · W) | n·(W+1) ô, mỗi ô O(1) |
| Bộ nhớ | O(n · W) | Bảng đầy đủ (cần cho truy vết) |
| Bộ nhớ tối ưu | O(W) | Một hàng, duyệt `w` **giảm dần** |
| Brute force | O(2ⁿ) | Mọi tập con |

Giả đa thức theo W. Knapsack là NP-hard; DP này chỉ hiệu quả khi W nhỏ (≤ 10⁶–10⁷).

## Tradeoff

- **Bảng 2D ↔ 1 hàng:** 1 hàng tiết kiệm bộ nhớ nhưng phải duyệt `w` từ W về 0 (để `dp[w − w[i]]` vẫn là giá trị của hàng trước); duyệt tăng dần biến thành unbounded knapsack. Mất truy vết.
- **0/1 ↔ Unbounded ↔ Bounded:** khác nhau ở việc có được nhìn hàng hiện tại không (thứ tự duyệt w) và số lượng mỗi món.
- **DP theo W ↔ DP theo giá trị:** nếu W rất lớn nhưng tổng giá trị nhỏ, đổi trạng thái: `dp[v]` = trọng lượng nhỏ nhất đạt giá trị v, O(n · ΣV).
- **DP ↔ Branch and bound / meet-in-the-middle:** n ≤ 40 và W lớn ⇒ meet-in-the-middle O(2^(n/2)); n lớn và W lớn ⇒ xấp xỉ (FPTAS) hoặc branch and bound.
- **Fractional knapsack:** cho phép lấy một phần ⇒ tham lam theo tỉ lệ đúng, O(n log n).

## Lợi / Hại

**Lợi**
- Chính xác, đơn giản, O(W) bộ nhớ với phiên bản 1 hàng.
- Khung cho mọi bài "chọn tập con với ràng buộc tổng": subset sum, partition, target sum, ones and zeroes (2 ràng buộc ⇒ dp 2 chiều).

**Hại**
- Giả đa thức theo W; W = 10⁹ không khả thi.
- Chỉ xử lý được ràng buộc dạng tổng (cộng được); ràng buộc phức tạp cần mô hình khác.

## Use case thực tế

- **Phân bổ ngân sách / danh mục đầu tư:** chọn dự án với chi phí và lợi nhuận, ngân sách cố định.
- **Đóng gói hàng, xếp container, tải máy bay:** chọn hàng theo trọng lượng/giá trị.
- **Cloud / scheduling:** chọn task chạy trong khung thời gian/tài nguyên có hạn để tối đa giá trị (admission control).
- **Quảng cáo:** chọn tập quảng cáo trong giới hạn hiển thị tối đa doanh thu.
- **Mật mã:** hệ Merkle–Hellman dựa trên subset sum (đã bị phá), và cơ sở cho độ khó bài toán lattice.
- **Cắt vật liệu, cutting stock, bin packing** (heuristic dựa trên knapsack).

## Lỗi thường gặp

1. Phiên bản 1 hàng duyệt `w` tăng dần ⇒ món được lấy nhiều lần (thành unbounded).
2. Lấy `dp[i][w − w[i]]` (hàng hiện tại) thay vì `dp[i−1][...]` trong bản 2D ⇒ cùng lỗi.
3. Quên trường hợp `w[i] > w` ⇒ chỉ số âm.
4. Tham lam theo tỉ lệ.
5. Truy vết so sánh sai hàng.
6. Khởi tạo `dp` = −∞ cho bài "tổng đúng bằng W" (subset sum exact) mà quên `dp[0] = 0`.

## Biến thể

- **Subset Sum / Partition Equal Subset Sum (416):** `dp[w]` boolean, "có tập con tổng w không".
- **Target Sum (494):** chuyển thành subset sum với `(S + target)/2`.
- **Last Stone Weight II (1049):** chia hai nhóm chênh lệch nhỏ nhất ⇒ subset sum gần S/2.
- **Ones and Zeroes (474):** hai ràng buộc ⇒ `dp[z][o]`.
- **Bounded knapsack:** tách số lượng thành luỹ thừa 2.
- **Fractional:** tham lam.
- **Meet-in-the-middle:** n ≤ 40.
