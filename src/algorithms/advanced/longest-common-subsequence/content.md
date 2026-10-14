## Bài toán

Cho hai chuỗi `a`, `b`. **Dãy con** (subsequence) là chuỗi thu được bằng cách xoá một số ký tự mà không đổi thứ tự. Tìm độ dài dãy con chung dài nhất và dựng lại một dãy như vậy.

`abcde` / `ace` → LCS = `ace`, dài 3. `AGGTAB` / `GXTXAYB` → `GTAB`, dài 4.

LCS (LeetCode 1143) là bài DP hai chuỗi "mẫu mực": công thức ngắn, nhưng là nền của `diff`, `git merge`, so khớp DNA và cả họ bài Delete Operation, Uncrossed Lines, Longest Palindromic Subsequence.

## Ý tưởng / Trực giác

Nhìn ký tự **cuối** của hai tiền tố `a[0..i)` và `b[0..j)`:

- Nếu `a[i-1] === b[j-1]`: ký tự này có thể là ký tự cuối của LCS, nên `dp[i][j] = dp[i-1][j-1] + 1`.
- Nếu khác: hai ký tự cuối không thể cùng nằm ở cuối LCS, nên phải bỏ một trong hai: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.

Trạng thái chỉ là cặp tiền tố `(i, j)` ⇒ bảng `(m+1)×(n+1)`, điền từ nhỏ tới lớn.

## Thuật toán từng bước

1. `dp[0][*] = dp[*][0] = 0` (LCS với chuỗi rỗng = 0).
2. Với `i = 1..m`, `j = 1..n` áp dụng công thức trên.
3. Độ dài = `dp[m][n]`.
4. **Truy vết**: từ `(m, n)` đi ngược. Khớp ⇒ lấy ký tự, lùi chéo. Không khớp ⇒ đi về ô (trên/trái) có giá trị lớn hơn. Đảo ngược chuỗi thu được.

Ở tab **Debug**: ô xanh lá là ô khớp (lấy chéo + 1), ô đỏ là ô không khớp (lấy max), ô cyan là ô được chọn làm nguồn. Giai đoạn truy vết tô ô đang đứng màu tím và dựng dần chuỗi LCS bên dưới.

## Chứng minh đúng

Gọi `L(i, j)` là LCS thật của hai tiền tố.

- Khớp: mọi LCS của `(i, j)` không chứa `a[i-1]` đều có thể thay ký tự cuối bằng `a[i-1]` mà không ngắn đi, nên tồn tại LCS tối ưu kết thúc bằng ký tự khớp ⇒ `L(i, j) = L(i-1, j-1) + 1`.
- Không khớp: ký tự cuối của LCS không thể đồng thời là `a[i-1]` và `b[j-1]`, nên LCS nằm hoàn toàn trong `(i-1, j)` hoặc `(i, j-1)` ⇒ `L(i, j) = max` của hai bài con.

Quy nạp theo `i + j` với cơ sở `L(0, *) = L(*, 0) = 0` cho ra `dp[i][j] = L(i, j)` ở mọi ô.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Bảng đầy đủ + truy vết | O(m·n) | O(m·n) |
| Chỉ cần độ dài (2 hàng) | O(m·n) | O(min(m, n)) |
| Hirschberg (dựng chuỗi, bộ nhớ tuyến tính) | O(m·n) | O(m + n) |

Không có thuật toán O(n^(2-ε)) trừ khi SETH sai – O(m·n) là tối ưu thực tế.

## Tradeoff

- Bảng đầy đủ dựng được chuỗi nhưng tốn O(m·n) bộ nhớ: với 10⁵ × 10⁵ là không khả thi.
- Hai hàng tiết kiệm bộ nhớ nhưng mất khả năng truy vết; muốn cả hai thì dùng Hirschberg (chia để trị + DP), phức tạp hơn để code trong phỏng vấn.
- Với chuỗi dài nhưng ít khác biệt, thuật toán Myers O((m+n)·d) (dùng trong `git diff`) nhanh hơn hẳn.

## Lợi / Hại

**Lợi:** công thức 2 dòng, dễ chứng minh, dễ mở rộng (trọng số, k chuỗi). **Hại:** O(m·n) với chuỗi dài; LCS không duy nhất nên "in ra LCS" cần quy ước tie-break rõ ràng.

## Use case thực tế

- `diff`, `git`: các dòng không thuộc LCS chính là dòng bị thêm/xoá.
- Bioinformatics: căn chỉnh trình tự DNA/protein (Needleman–Wunsch là LCS có trọng số).
- Phát hiện đạo văn, so sánh phiên bản tài liệu, hợp nhất 3 chiều (3-way merge).
- Nén dữ liệu kiểu delta (rsync, xdelta) chọn khối chung giữa hai phiên bản.

## Lỗi thường gặp

- Nhầm **subsequence** (không cần liền kề) với **substring** (liền kề): substring dùng công thức khác (`dp = diag + 1` nếu khớp, else 0).
- Lệch chỉ số: `dp[i][j]` dùng `a[i-1]`, `b[j-1]`, không phải `a[i]`.
- Khi không khớp lại cộng 1 (lẫn với Edit Distance).
- Truy vết đi sai hướng khi hoà: phải đi theo ô có giá trị **bằng** `dp[i][j]`, không phải ô bất kỳ.

## Biến thể

- **Delete Operation (583):** `m + n − 2·LCS`.
- **Longest Palindromic Subsequence (516):** LCS của `s` và `reverse(s)`.
- **Uncrossed Lines (1035):** LCS trên mảng số.
- **Shortest Common Supersequence (1092):** `m + n − LCS`, dựng chuỗi từ bảng.
- **LCS của k chuỗi:** bảng k chiều, O(n^k); NP-hard khi k là tham số.
