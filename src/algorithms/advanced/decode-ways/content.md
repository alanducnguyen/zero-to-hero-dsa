## Bài toán

Một thông điệp gồm các chữ cái `A–Z` được mã hoá thành số: `'A' → "1"`, `'B' → "2"`, …, `'Z' → "26"`. Cho chuỗi chữ số `s`, hãy đếm **số cách giải mã** nó ngược lại thành chữ cái (LeetCode 91).

Ví dụ `"226"` có 3 cách: `"2 2 6"` → BBF, `"22 6"` → VF, `"2 26"` → BZ. Chuỗi `"06"` có 0 cách vì `"06"` không phải mã hợp lệ (mã hai chữ số không được bắt đầu bằng 0) và `'0'` đứng một mình không ứng với chữ nào.

Đây là bài DP "đếm số cách" kinh điển, được Meta và Google hỏi rất thường xuyên vì nó trông giống Climbing Stairs nhưng có **bẫy số 0** để kiểm tra bạn có cẩn thận với điều kiện biên hay không.

## Ý tưởng / Trực giác

Thử nghĩ đệ quy: một cách giải mã tiền tố `s[0..i)` **kết thúc** theo đúng một trong hai kiểu:

- Chữ cái cuối được mã bởi **một** ký tự `s[i−1]` – hợp lệ khi ký tự đó khác `'0'`. Phần còn lại là một cách giải mã của `i−1` ký tự đầu.
- Chữ cái cuối được mã bởi **hai** ký tự `s[i−2..i)` – hợp lệ khi số đó nằm trong `10..26`. Phần còn lại là một cách giải mã của `i−2` ký tự đầu.

Hai kiểu kết thúc khác nhau nên **không trùng nhau**, và mọi cách giải mã đều rơi vào một trong hai ⇒ phép cộng đếm đủ và không thừa. Do đó:

`dp[i] = (s[i−1] ≠ '0' ? dp[i−1] : 0) + (10 ≤ s[i−2..i) ≤ 26 ? dp[i−2] : 0)`

Đây chính là Climbing Stairs (bước 1 hoặc 2) nhưng mỗi bước có **điều kiện được phép**. Với chuỗi toàn `'1'`, mọi bước đều hợp lệ và đáp án là số Fibonacci.

Đệ quy thuần sẽ gọi lại cùng tiền tố rất nhiều lần (O(2ⁿ)); lưu `dp[i]` để mỗi tiền tố chỉ tính một lần ⇒ O(n).

## Thuật toán từng bước

1. Nếu `s` rỗng, trả 0 (quy ước của đề).
2. Tạo `dp[0..n]` toàn 0, đặt `dp[0] = 1` – tiền tố rỗng có đúng một cách "không làm gì".
3. Với `i = 1..n`:
   - Nếu `s[i−1] ≠ '0'`: `dp[i] += dp[i−1]`.
   - Nếu `i ≥ 2` và `two = Number(s[i−2..i))` thoả `10 ≤ two ≤ 26`: `dp[i] += dp[i−2]`.
4. Trả `dp[n]`.

Chạy tay `"2263"`: dp = `[1, 1, 2, 3, 3]`. Ở `i = 4`, `'3'` hợp lệ (cộng dp[3] = 3) nhưng `"63"` > 26 nên không cộng thêm.

## Chứng minh đúng

Quy nạp theo `i`. Giả sử `dp[j]` đúng là số cách giải mã `j` ký tự đầu với mọi `j < i`.

Xét một cách giải mã bất kỳ của `s[0..i)`. Chữ cái cuối cùng của nó dùng hoặc 1 hoặc 2 ký tự cuối (vì mã dài tối đa 2). Nếu dùng 1 ký tự thì ký tự đó phải khác `'0'`, và phần trước là một cách giải mã hợp lệ của `s[0..i−1)` – có đúng `dp[i−1]` khả năng. Nếu dùng 2 ký tự thì số đó phải trong `10..26`, phần trước có `dp[i−2]` khả năng. Hai nhóm rời nhau (khác độ dài chữ cái cuối) và hợp lại là toàn bộ ⇒ công thức đúng. Cơ sở `dp[0] = 1` khớp vì tiền tố rỗng có một cách (rỗng); `dp[1]` tự động bằng 1 nếu `s[0] ≠ '0'`, ngược lại 0.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n) | Mỗi `dp[i]` tính bằng O(1) phép so sánh |
| Bộ nhớ | O(n) | Mảng dp; **O(1)** nếu chỉ giữ `prev2 = dp[i−2]`, `prev1 = dp[i−1]` |
| Đệ quy không memo | O(2ⁿ) | Mỗi vị trí rẽ hai nhánh |

## Tradeoff

- **Bottom-up ↔ top-down memo:** top-down `count(i)` đọc thẳng từ định nghĩa, dễ trình bày; bottom-up không có rủi ro tràn stack với chuỗi dài (n = 100 không sao, nhưng biến thể n = 10⁵ thì có).
- **Mảng ↔ hai biến:** hai biến đủ để đếm; giữ mảng khi cần **liệt kê** hoặc truy vết các cách giải mã.
- **Duyệt tiền tố ↔ duyệt hậu tố:** có thể định nghĩa `dp[i]` cho hậu tố `s[i..]` và đi từ phải sang trái – tương đương, chọn cái bạn thấy tự nhiên.
- **Số cách thực ↔ modulo:** đáp án tăng theo Fibonacci, với chuỗi dài phải lấy modulo `10⁹+7` (Decode Ways II).

## Lợi / Hại

**Lợi:**
- Tuyến tính, bộ nhớ O(1), code ngắn.
- Khuôn "đếm theo cách kết thúc" áp dụng cho rất nhiều bài chuỗi.

**Hại:**
- Dễ sai ở số 0: quên chặn `'0'` đứng một mình hoặc nhận `"05"` là mã hợp lệ.
- Chỉ đếm, không liệt kê; liệt kê cần backtracking với chi phí theo số kết quả (có thể mũ).

## Use case thực tế

- **Phân tách token mơ hồ:** đếm số cách tách một chuỗi thành các từ trong từ điển (giống Word Break đếm) – dùng trong tokenizer, phân đoạn tiếng Trung/Nhật.
- **Giải mã mã không có tiền tố (non-prefix code):** khi bảng mã không phải prefix code, cùng một dãy bit có thể giải mã nhiều cách; DP đếm/kiểm tra tính mơ hồ.
- **Bàn phím T9 / mã số điện thoại:** đếm số cách đọc một dãy phím thành chữ.

## Lỗi thường gặp

- Đặt `dp[0] = 0` ⇒ mọi kết quả về 0.
- Kiểm tra cặp bằng `two <= 26` mà quên `two >= 10` ⇒ đếm `"06"` là hợp lệ.
- Cho `'0'` đứng riêng ⇒ `"10"` ra 2 thay vì 1.
- So sánh chuỗi `"2" < "7"` thay vì so số, hoặc dùng `parseInt` trên một ký tự rồi quên ký tự trước.
- Trả 1 cho chuỗi rỗng trong khi đề yêu cầu 0 (tuỳ phiên bản đề – hãy hỏi).

## Biến thể

- **Decode Ways II (639):** có ký tự `'*'` đại diện 1–9; mỗi bước nhân số khả năng, lấy modulo.
- **Restore The Array (1416):** mã là số trong `[1, k]` với độ dài bất kỳ ⇒ `dp[i]` cộng trên nhiều độ dài cuối.
- **Word Break (139/140):** cùng khuôn "phần cuối là một từ hợp lệ" nhưng độ dài từ thay đổi.
- **Climbing Stairs (70):** trường hợp không có điều kiện – nền tảng của bài này.
