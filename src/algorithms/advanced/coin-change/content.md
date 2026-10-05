## Bài toán

Cho các mệnh giá `coins` (mỗi loại dùng không giới hạn) và số tiền `amount`. Tìm **số xu ít nhất** để đúng bằng `amount`; `-1` nếu không thể.

Coin Change (LeetCode 322) là bài DP được hỏi nhiều ở Amazon và Google vì nó bộc lộ hai điều: (1) ứng viên có thấy **tham lam sai** không, và (2) có định nghĩa trạng thái đúng cho **unbounded knapsack** – họ bài "chọn nhiều lần" khác với 0/1.

## Ý tưởng / Trực giác

Tham lam "lấy xu to nhất trước" đúng với tiền thật (1, 2, 5, 10…) nhưng sai tổng quát: `[1, 3, 4]`, amount 6: tham lam 4 + 1 + 1 = 3 xu, tối ưu 3 + 3 = 2 xu.

DP: để tạo `a` đồng, **xu cuối cùng** phải là một trong các `coin`; phần còn lại `a − coin` cần tối ưu tạo được. Vậy `dp[a] = 1 + min(dp[a − coin])` trên mọi `coin ≤ a`. Tính từ `dp[0] = 0` lên.

Khác 0/1 knapsack: vòng trong lấy `dp[a − coin]` từ **cùng mảng đã cập nhật** (một loại xu có thể dùng nhiều lần). Thứ tự vòng lặp quyết định "0/1" hay "unbounded" – chi tiết hay bị hỏi.

## Thuật toán từng bước

1. `dp[0] = 0`, `dp[1..amount] = ∞`.
2. Với `a` từ 1 đến amount, với mỗi `coin ≤ a`: `dp[a] = min(dp[a], dp[a − coin] + 1)`.
3. Trả `dp[amount]` hoặc `-1` nếu ∞.

Tab **Debug**: hàng `dp` với ô tím đang tính, ô vàng là `dp[a − coin]` đang xét, xu vàng đang thử. Preset "Tham lam sai" là ví dụ quan trọng nhất.

## Chứng minh đúng

**Định nghĩa:** `dp[a]` = số xu ít nhất tạo đúng `a` (∞ nếu không thể).

**Cơ sở:** `dp[0] = 0`.

**Quy nạp:** mọi cách tạo `a` (a > 0) có một xu cuối `c`; bỏ nó đi được cách tạo `a − c` với số xu ít hơn 1. Nếu cách tạo `a` là tối ưu, phần `a − c` cũng phải tối ưu (nếu không, thay bằng cách tốt hơn cho `a − c` ⇒ cách tốt hơn cho `a`, mâu thuẫn) ⇒ `dp[a] = 1 + dp[a − c]` với `c` tốt nhất. Lấy min trên mọi `c` cho đúng `dp[a]`. Mọi giá trị trong min đều là cách hợp lệ ⇒ không đánh giá thấp.

**Thứ tự tính:** `dp[a − coin]` với `a − coin < a` đã tính xong ⇒ bottom-up theo `a` tăng dần là hợp lệ.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(amount · k) | k loại xu, mỗi ô dp thử k xu |
| Bộ nhớ | O(amount) | Một mảng dp |
| BFS theo số xu | O(amount · k) | Cách khác: tầng t = tập số tiền tạo được bằng t xu |

Chú ý: độ phức tạp **giả đa thức** (pseudo-polynomial) – phụ thuộc giá trị `amount`, không phải số bit; amount = 10⁹ không khả thi.

## Tradeoff

- **DP ↔ Tham lam:** tham lam O(k log k) chỉ đúng với hệ xu "canonical" (tiền tệ thực); DP luôn đúng nhưng O(amount · k). Nếu biết hệ xu canonical, tham lam là đủ.
- **Bottom-up ↔ Top-down (memo):** top-down chỉ tính các `a` thật sự cần (có thể ít hơn nhiều khi xu lớn), nhưng đệ quy sâu `amount` ⇒ tràn stack. Bottom-up an toàn và cache tốt.
- **Vòng ngoài theo amount ↔ theo coin:** cả hai đúng cho "min số xu"; nhưng với bài **đếm số cách** (Coin Change II), vòng ngoài phải theo coin để tránh đếm hoán vị trùng – điểm hay nhầm.
- **DP ↔ BFS:** BFS trên số tiền với cạnh trọng số 1 (mỗi xu) cho ra số xu ít nhất và dừng sớm khi chạm amount; tốt khi đáp án nhỏ.
- **Truy vết:** lưu `lastCoin[a]` để in ra tập xu cụ thể.

## Lợi / Hại

**Lợi**
- Đúng với mọi hệ xu, kể cả khi tham lam sai.
- O(amount) bộ nhớ, code 10 dòng.
- Khung dùng lại: Perfect Squares, Combination Sum IV, Word Break, Integer Break.

**Hại**
- Giả đa thức: amount lớn (10⁹) không chạy được; cần toán học (với hệ xu nhỏ) hoặc khác.
- Không tối ưu khi hệ xu canonical (tham lam nhanh hơn nhiều).

## Use case thực tế

- **Máy bán hàng / ATM / POS:** trả tiền thừa với ít tờ nhất; hệ xu thực tế thường canonical nên dùng tham lam, nhưng DP cần khi có mệnh giá lạ hoặc kho tờ tiền hạn chế.
- **Chia nhỏ tài nguyên:** chia file thành block kích thước cho trước với ít block nhất; phân bổ gói băng thông, kích thước VM (unbounded knapsack tổng quát).
- **Cắt vật liệu (cutting stock):** cắt thanh dài thành đoạn chuẩn với lãng phí ít nhất.
- **Lập lịch / đóng gói:** số container ít nhất với các kích thước chuẩn.
- **Mật mã / lý thuyết số:** bài toán Frobenius (số tiền lớn nhất không tạo được).

## Lỗi thường gặp

1. Khởi tạo `dp` bằng `amount + 1` rồi quên đổi về −1, hoặc dùng `Infinity + 1` so sánh (JS vẫn đúng vì ∞ + 1 = ∞, nhưng hãy rõ ràng).
2. Kiểm tra `dp[a − coin] + 1 < dp[a]` khi `dp[a − coin]` là ∞ – vẫn đúng nhờ ∞, nhưng ở ngôn ngữ dùng `amount + 1` làm ∞ thì cần so sánh cẩn thận.
3. Tham lam rồi "tin" là tối ưu.
4. Với Coin Change II, vòng ngoài theo amount ⇒ đếm hoán vị, sai.
5. Quên `coin ≤ a` ⇒ chỉ số âm.
6. Xu có giá trị 0 hoặc trùng lặp ⇒ lọc trước.

## Biến thể

- **Coin Change II (518):** đếm số cách – vòng ngoài theo coin, `dp[a] += dp[a − coin]`.
- **Combination Sum IV (377):** đếm hoán vị – vòng ngoài theo amount.
- **Perfect Squares (279):** coins = các số chính phương.
- **Minimum cost / max value với số lượng giới hạn:** bounded knapsack (nhân đôi nhị phân).
- **Truy vết tập xu:** mảng `choice[a]`.
- **BFS:** tầng = số xu.
