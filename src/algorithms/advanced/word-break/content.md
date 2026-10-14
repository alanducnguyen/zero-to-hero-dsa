## Bài toán

Cho chuỗi `s` và từ điển `wordDict`. Hỏi `s` có thể cắt thành một dãy các từ trong từ điển (mỗi từ dùng bao nhiêu lần cũng được) hay không.

`leetcode` với `[leet, code]` → `true`. `catsandog` với `[cats, dog, sand, and, cat]` → `false` (kẹt ở `og`).

Word Break (LeetCode 139) là bài DP 1D "có/không" tiêu biểu: trạng thái là **vị trí cắt**, không phải giá trị số.

## Ý tưởng / Trực giác

Nếu `s[0..i)` cắt được thì **từ cuối cùng** của cách cắt đó là `s[j..i)` với `j < i` nào đó, và phần trước `s[0..j)` cũng phải cắt được. Vậy:

`dp[i] = ∃ j < i : dp[j] && s[j..i) ∈ dict`

Chỉ cần thử các `j` sao cho `i − j ≤ maxLen` (độ dài từ dài nhất), vì từ dài hơn không có trong từ điển.

## Thuật toán từng bước

1. `dict = new Set(wordDict)`, `maxLen` = từ dài nhất.
2. `dp[0] = true` (chuỗi rỗng).
3. Với `i = 1..n`: thử `j` từ `i−1` lùi về `max(0, i−maxLen)`. Gặp `dp[j] && dict.has(s[j..i))` ⇒ `dp[i] = true`, `break`.
4. Trả về `dp[n]`.

Ở tab **Debug**, dải cyan trên `s` là đoạn `s[j..i)` đang thử; ô `dp[j]` màu vàng nếu `true` (đáng thử), đỏ nếu `false`; ô `dp[i]` chuyển xanh lá khi tìm được cách cắt.

## Chứng minh đúng

Quy nạp theo `i`. Cơ sở `dp[0] = true` đúng. Giả sử `dp[0..i)` đúng.

- Nếu `s[0..i)` cắt được: lấy từ cuối `w = s[j..i)` của cách cắt ⇒ `s[0..j)` cắt được ⇒ `dp[j] = true` và `w ∈ dict` ⇒ vòng lặp đặt `dp[i] = true`.
- Nếu vòng lặp đặt `dp[i] = true`: ghép cách cắt của `s[0..j)` với từ `s[j..i)` ⇒ `s[0..i)` cắt được.

Hai chiều cho thấy `dp[i]` đúng bằng đáp án của tiền tố.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| DP + Set, giới hạn maxLen | O(n · L · L) (L = maxLen; slice + hash O(L)) | O(n + tổng ký tự dict) |
| DP không giới hạn j | O(n² · n) | O(n) |
| Dùng Trie thay Set | O(n · L) | O(tổng ký tự dict) |
| Backtracking thuần | O(2ⁿ) | O(n) |

## Tradeoff

- Set + `slice` đơn giản, đủ nhanh với n ≤ 300 (ràng buộc LeetCode).
- Trie bỏ được chi phí tạo chuỗi con và dừng sớm khi tiền tố không khớp, hữu ích khi từ điển lớn.
- Top-down memo (`canBreak(start)`) tự nhiên hơn với nhiều người, cùng độ phức tạp, nhưng cần cẩn thận stack với n lớn.

## Lợi / Hại

**Lợi:** DP 1D ngắn, chứng minh rõ, mở rộng trực tiếp sang "đếm cách" và "liệt kê cách". **Hại:** Word Break II (liệt kê tất cả) có thể bùng nổ hàm mũ về số đáp án; cần memo hoặc cắt tỉa bằng kết quả bài I.

## Use case thực tế

- Tách từ trong ngôn ngữ không có dấu cách (tiếng Trung, Nhật, Thái) – bước tokenization đầu tiên của search/NLP.
- Phân tích URL/hashtag dính liền (`#iloveyou` → "i love you").
- Lexer: cắt chuỗi thành token theo bảng từ khoá.
- Giải mã tin nhắn, phân tích gói tin có độ dài biến thiên theo bảng mã hợp lệ.

## Lỗi thường gặp

- Quên `dp[0] = true` ⇒ mọi `dp[i]` false.
- Lệch chỉ số: `s.slice(j, i)` là nửa mở `[j, i)`, không phải `[j, i]`.
- Không `break` sau khi tìm thấy: vẫn đúng nhưng tốn thời gian.
- Dùng Greedy (lấy từ dài nhất khớp): sai với `abcd` / `[abc, ab, cd]` – greedy lấy `abc` rồi kẹt `d`.
- Với Word Break II, không memo ⇒ TLE trên test `aaaa…b`.

## Biến thể

- **Word Break II (140):** trả về mọi cách cắt – DFS + memo theo `start`, chạy bài I trước để cắt tỉa.
- **Đếm số cách cắt:** `dp[i] += dp[j]` thay cho OR.
- **Concatenated Words (472):** mỗi từ là Word Break trên từ điển các từ khác (cần ≥ 2 từ).
- **Decode Ways (91):** cùng khung, "từ điển" là các số 1..26.
- **Cắt với chi phí nhỏ nhất:** `dp[i] = min(dp[j] + cost(s[j..i)))` – cùng dạng với Minimum Cost Tokenization.
