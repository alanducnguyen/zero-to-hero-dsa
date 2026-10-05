## Cách trình bày trong phỏng vấn

1. Đưa phản ví dụ tham lam `[1,3,4]`, 6 ngay đầu – thể hiện bạn không rơi vào bẫy.
2. Định nghĩa `dp[a]`, công thức "xu cuối cùng", cơ sở `dp[0] = 0`.
3. Code bottom-up; nêu O(amount·k) và giải thích vì sao đây là **giả đa thức**.
4. Nêu cách truy vết và biến thể đếm số cách (thứ tự vòng lặp).
5. Nếu được hỏi tối ưu: BFS dừng sớm, hoặc tham lam khi hệ xu canonical.

## Câu hỏi follow-up thường gặp

- **Đếm số cách tạo amount (518)?** `dp[0] = 1`; `for coin: for a from coin..amount: dp[a] += dp[a − coin]`. Vòng ngoài theo coin để mỗi tổ hợp đếm một lần.
- **Khác gì nếu đổi thứ tự hai vòng?** Đếm **hoán vị** (377 Combination Sum IV) – 1+2 và 2+1 tính là hai.
- **In ra tập xu?** Lưu `choice[a] = coin` khi cập nhật; từ amount lần ngược.
- **Khi nào tham lam đúng?** Hệ xu canonical (mỗi mệnh giá ≥ 2× mệnh giá trước thường là đủ nhưng không phải điều kiện cần/đủ chính xác); có thuật toán kiểm tra canonical O(k³).
- **amount = 10⁹?** DP không khả thi; nếu có xu 1, câu trả lời gần với tham lam; cần phân tích toán học hoặc giới hạn đề.
- **Mỗi loại xu có số lượng giới hạn?** Bounded knapsack: tách thành luỹ thừa 2 (1, 2, 4, … , phần dư) rồi 0/1 knapsack.
- **Top-down có nhanh hơn không?** Có thể khi chỉ một phần nhỏ các a được chạm; nhưng rủi ro tràn stack; thêm memo.
- **BFS giải thế nào?** Đỉnh = số tiền, cạnh = thêm một xu; BFS từ 0 tới amount; số tầng = số xu ít nhất; dùng visited.

## Checklist nhận diện pattern

- "Ít nhất / nhiều nhất … để đạt tổng T, mỗi loại dùng nhiều lần" ⇒ unbounded knapsack, vòng ngoài theo tổng.
- "Số cách tạo tổng T (không phân biệt thứ tự)" ⇒ vòng ngoài theo loại.
- "Số cách có phân biệt thứ tự" ⇒ vòng ngoài theo tổng.
- "Mỗi món chọn tối đa 1 lần" ⇒ 0/1 knapsack (xem bài kế).

## Bài luyện tập liên quan

- 322 Coin Change → 518 Coin Change II → 377 Combination Sum IV.
- 279 Perfect Squares, 139 Word Break, 343 Integer Break.
- 983 Minimum Cost For Tickets, 1449 Form Largest Integer With Digits That Add up to Target.
