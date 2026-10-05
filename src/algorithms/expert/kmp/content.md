## Bài toán

Tìm mọi vị trí xuất hiện của `pattern` (độ dài m) trong `text` (độ dài n).

Brute force O(n·m): tại mỗi vị trí text thử khớp pattern, lệch thì **lùi** về vị trí kế tiếp. KMP (Knuth–Morris–Pratt, 1977) làm O(n + m) bằng cách **không bao giờ lùi** con trỏ text: khi lệch, nó dùng thông tin "đã khớp được gì" để dịch pattern thông minh.

KMP là thuật toán chuỗi cổ điển nhất mà Google/Microsoft hỏi; thực tế người phỏng vấn thường hỏi **bảng LPS** (prefix function) vì nó giải được nhiều bài khác: chu kỳ chuỗi, palindrome ngắn nhất, happy prefix.

## Ý tưởng / Trực giác

Giả sử đã khớp `j` ký tự đầu pattern với text, rồi lệch tại `text[i]`. Brute force quay lại `i − j + 1` và bắt đầu lại từ `pattern[0]`. Nhưng ta **đã biết** `text[i−j..i−1] = pattern[0..j−1]`. Nếu pattern có **prefix** độ dài `k < j` bằng **suffix** độ dài `k` của `pattern[0..j−1]`, thì `k` ký tự text ngay trước `i` đã khớp với `pattern[0..k−1]` ⇒ chỉ cần tiếp tục so `text[i]` với `pattern[k]`. Chọn `k` lớn nhất để không bỏ sót.

`lps[j−1]` chính là `k` lớn nhất đó – tính trước, một lần, chỉ từ pattern. Tên gọi: **L**ongest **P**roper prefix which is also **S**uffix.

Tính `lps` cũng bằng chính ý tưởng này (pattern tự khớp với chính nó).

## Thuật toán từng bước

**buildLPS:** `len = 0`, `lps[0] = 0`. Với `i = 1..m−1`: khi `len > 0` và `p[i] ≠ p[len]`, `len = lps[len−1]`; nếu `p[i] = p[len]` thì `len++`; `lps[i] = len`.

**search:** `j = 0`. Với mỗi `i`: khi `j > 0` và `t[i] ≠ p[j]`, `j = lps[j−1]`; nếu `t[i] = p[j]` thì `j++`; nếu `j = m` ⇒ khớp tại `i − m + 1`, `j = lps[m−1]`.

Tab **Debug**: giai đoạn 1 xây `lps` (vùng cyan = prefix đang khớp với suffix); giai đoạn 2 tìm kiếm với `i` chỉ tiến, mỗi lần lệch `j` nhảy theo `lps`. Preset "Khớp chồng lấn" `aaaaab / aaa` cho 3 kết quả.

## Chứng minh đúng

**LPS đúng (quy nạp theo i):** `lps[i]` = độ dài lớn nhất `k < i+1` sao cho `p[0..k) = p[i−k+1..i]`. Ứng viên cho `lps[i]` là `lps[i−1]+1` (nếu `p[i] = p[lps[i−1]]`), hoặc nhỏ hơn. Mọi prefix-suffix của `p[0..i]` bỏ ký tự cuối là prefix-suffix của `p[0..i−1]`, và các prefix-suffix của `p[0..i−1]` theo thứ tự giảm dần chính là `lps[i−1], lps[lps[i−1]−1], …` (tính chất chuỗi). Vòng while duyệt đúng dãy đó từ lớn xuống nhỏ, dừng ở cái đầu tiên mở rộng được ⇒ lớn nhất.

**Search không bỏ sót:** khi lệch tại `i` với `j` đã khớp, mọi vị trí bắt đầu `s` trong `(i−j, i−k]` với `k = lps[j−1]` không thể là khớp: nếu được, `p[0..i−s)` = `t[s..i)` = suffix của `p[0..j)` ⇒ prefix-suffix độ dài `i−s > k`, mâu thuẫn với `k` lớn nhất. Vậy nhảy tới `k` là an toàn.

**O(n + m):** `i` tăng n lần; `j` tăng tối đa n lần (mỗi lần `i` tăng) nên tổng số lần giảm (while) ≤ n. Tương tự cho `len` trong buildLPS ≤ m.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Build LPS | O(m) | Amortized |
| Search | O(n) | i không lùi, j giảm ≤ số lần tăng |
| Bộ nhớ | O(m) | Bảng lps |
| Brute force | O(n·m) | Worst case `aaaa…ab` / `aaab` |

## Tradeoff

- **KMP ↔ Rabin–Karp:** RK dùng rolling hash, O(n + m) kỳ vọng, dễ mở rộng cho nhiều pattern cùng độ dài và 2D; nhưng có xác suất va chạm và worst case O(nm). KMP đảm bảo, không hash.
- **KMP ↔ Boyer–Moore:** BM nhảy từ phải sang trái, thực tế nhanh hơn (sublinear, bỏ qua nhiều ký tự) với bảng chữ cái lớn; KMP đơn giản hơn, không phụ thuộc bảng chữ cái, tốt cho stream (đọc text một chiều).
- **KMP ↔ Z-algorithm:** Z tính "độ dài khớp với prefix tại mỗi vị trí" của chuỗi `pattern + '#' + text`; cùng O(n + m), đôi khi trực quan hơn.
- **Nhiều pattern:** Aho–Corasick = Trie + failure link (chính là LPS tổng quát hoá).
- **`indexOf` của thư viện:** V8 dùng Boyer–Moore–Horspool/hybrid; trong phỏng vấn, viết KMP khi được hỏi O(n + m) đảm bảo.

## Lợi / Hại

**Lợi**
- O(n + m) worst case, không cần hash, hoạt động trên stream.
- Bảng LPS (prefix function) là công cụ độc lập: chu kỳ nhỏ nhất của chuỗi, đếm xuất hiện của mỗi prefix, palindrome ngắn nhất.

**Hại**
- Khó nhớ chính xác; vòng while lùi `len = lps[len−1]` hay viết sai.
- Thực tế chậm hơn Boyer–Moore trên văn bản tự nhiên.
- Chỉ một pattern (nhiều pattern cần Aho–Corasick).

## Use case thực tế

- **Tìm kiếm văn bản / editor / grep:** nền của nhiều thuật toán tìm chuỗi; `strstr` trong một số libc dùng Two-Way (họ hàng KMP).
- **Mạng / bảo mật:** phát hiện chữ ký trong gói tin (IDS như Snort dùng Aho–Corasick – mở rộng của KMP).
- **Tin sinh học:** tìm motif trong DNA; prefix function để tìm tandem repeats.
- **Nén dữ liệu:** phát hiện chu kỳ / lặp (chu kỳ nhỏ nhất = m − lps[m−1] nếu chia hết).
- **Xử lý log / stream:** khớp pattern trên luồng không thể lùi.
- **Biên dịch / lexer:** khớp từ khoá, automaton KMP là DFA cho một pattern.

## Lỗi thường gặp

1. Lùi `len = lps[len − 1]` viết thành `len−−` ⇒ O(n·m) hoặc sai.
2. Quên reset `j = lps[m−1]` sau khi khớp ⇒ bỏ sót khớp chồng lấn (hoặc đặt `j = 0` ⇒ bỏ sót).
3. `lps[0]` khác 0.
4. So `p[i]` với `p[len]` sau khi đã tăng `len`.
5. Dùng `lps[j]` thay vì `lps[j − 1]` khi lệch.
6. Pattern rỗng không xử lý.

## Biến thể

- **Prefix function (Z-style):** `π[i]` giống `lps`; nhiều bài dùng trực tiếp π.
- **Chu kỳ nhỏ nhất:** `p = m − lps[m−1]`; chuỗi là lặp của khối độ dài p nếu `m % p == 0` (459).
- **Shortest Palindrome (214):** lps của `s + '#' + reverse(s)`.
- **Longest Happy Prefix (1392):** `lps[m−1]`.
- **Đếm số lần mỗi prefix xuất hiện:** đếm theo lps từ cuối về.
- **KMP automaton:** bảng chuyển trạng thái `[m+1][Σ]` cho DP trên chuỗi (đếm chuỗi tránh pattern).
- **Aho–Corasick:** nhiều pattern.
