## Bài toán

Cho hai chuỗi `a`, `b`. Mỗi thao tác được phép: **chèn** một ký tự, **xoá** một ký tự, **thay** một ký tự. Tìm số thao tác ít nhất để biến `a` thành `b`.

`horse → ros` = 3: `horse → rorse` (thay h→r) `→ rose` (xoá r) `→ ros` (xoá e).

Edit Distance (LeetCode 72, Hard) là bài DP hai chuỗi được hỏi nhiều nhất và là "chìa khoá" cho cả họ bài: LCS, Distinct Subsequences, Regex Matching, Wildcard Matching, Interleaving String. Nắm vững bài này là nắm được cách **định nghĩa trạng thái bằng hai tiền tố**.

## Ý tưởng / Trực giác

Nhìn vào ký tự **cuối** của hai chuỗi. Chỉ có 4 khả năng cho bước cuối cùng của một dãy thao tác tối ưu:
1. `a[i-1] === b[j-1]`: hai ký tự cuối đã giống nhau ⇒ không cần động tới, bài toán rút về `a[0..i-1)`, `b[0..j-1)`.
2. **Thay** `a[i-1]` thành `b[j-1]` ⇒ rút về `(i-1, j-1)` + 1.
3. **Xoá** `a[i-1]` ⇒ rút về `(i-1, j)` + 1.
4. **Chèn** `b[j-1]` vào cuối `a` ⇒ rút về `(i, j-1)` + 1.

Vì mỗi lựa chọn chỉ phụ thuộc vào bài toán con nhỏ hơn, ta điền bảng `dp[i][j]` từ nhỏ đến lớn – đó là quy hoạch động.

## Thuật toán từng bước

1. `dp[i][0] = i` (xoá i ký tự), `dp[0][j] = j` (chèn j ký tự).
2. Với `i = 1..m`, `j = 1..n`:
   - Nếu `a[i-1] === b[j-1]`: `dp[i][j] = dp[i-1][j-1]`.
   - Ngược lại: `dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])`.
3. Đáp án `dp[m][n]`.

Ở tab **Debug**, ô tím đang được tính, 3 ô vàng là phụ thuộc; ô cyan là ô được chọn làm min. Hàng/cột đầu được điền bằng màu đỏ. Quan sát hai mảng `a`, `b` bên dưới để thấy đang so sánh ký tự nào.

## Chứng minh đúng

**Định nghĩa:** `dp[i][j]` = edit distance giữa tiền tố `a[0..i)` và `b[0..j)`.

**Cơ sở:** `dp[i][0] = i`, `dp[0][j] = j` hiển nhiên tối ưu (không thể ít hơn vì mỗi thao tác thay đổi độ dài tối đa 1).

**Bước quy nạp:** xét dãy thao tác tối ưu biến `a[0..i)` thành `b[0..j)`. Thao tác cuối liên quan tới ký tự cuối phải thuộc một trong 4 trường hợp trên (có thể chứng minh mọi dãy thao tác đều có thể sắp xếp lại để xử lý từ trái sang phải). Mỗi trường hợp tốn chi phí tương ứng cộng với bài toán con đã tối ưu (giả thiết quy nạp). Lấy min ⇒ tối ưu. Ngược lại, mỗi giá trị trong min đều là một dãy hợp lệ ⇒ không bị đánh giá thấp.

**Khớp thì không cần xét 3 lựa chọn kia?** Có thể chứng minh `dp[i-1][j-1] ≤ 1 + min(...)` khi ký tự cuối khớp, nên lấy thẳng `dp[i-1][j-1]` là đủ (và nhanh hơn).

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(m·n) | Điền m·n ô, mỗi ô O(1) |
| Bộ nhớ | O(m·n) | Bảng đầy đủ (cần nếu muốn truy vết thao tác) |
| Bộ nhớ tối ưu | O(min(m,n)) | Chỉ giữ hàng trước và hàng hiện tại (hoặc 1 hàng + 1 biến) |

Với chuỗi dài (DNA hàng triệu ký tự), O(m·n) vẫn quá chậm; thực tế dùng bit-parallel (Myers), banded DP (chỉ tính dải quanh đường chéo khi biết distance nhỏ), hoặc Ukkonen O(n·d).

## Tradeoff

- **Bảng đầy đủ ↔ 2 hàng:** bảng đầy đủ cho phép truy vết (in ra dãy thao tác); 2 hàng tiết kiệm bộ nhớ nhưng mất truy vết (trừ khi dùng kỹ thuật Hirschberg O(min(m,n)) bộ nhớ với truy vết).
- **Top-down (memo) ↔ Bottom-up:** memo tự nhiên theo đệ quy, chỉ tính ô cần; bottom-up không đệ quy, cache tốt, dễ tối ưu bộ nhớ. Phỏng vấn: nêu đệ quy trước để chứng minh công thức, rồi viết bottom-up.
- **Chi phí thao tác khác nhau:** (vd. thay đắt gấp đôi) chỉ cần đổi hằng số 1 thành trọng số; cấu trúc DP không đổi. Đây là "weighted edit distance" trong spell checker.
- **Edit distance ↔ LCS:** nếu không cho phép thay, `dist = m + n − 2·LCS`.

## Lợi / Hại

**Lợi**
- Công thức đơn giản, chứng minh chặt chẽ, dễ mở rộng (trọng số, thao tác thêm như hoán vị 2 ký tự kề – Damerau).
- Nền tảng cho spell check, diff, bioinformatics.

**Hại**
- O(m·n) – chuỗi 10⁵ × 10⁵ = 10¹⁰, không khả thi.
- Không tận dụng được cấu trúc chuỗi (nếu hai chuỗi gần giống nhau, có thuật toán O(n·d)).

## Use case thực tế

- **Spell checker / autocorrect:** gợi ý từ có edit distance ≤ 2 (kết hợp với BK-tree hoặc Trie + DP để không so với toàn từ điển).
- **`diff`, git:** Myers diff là biến thể trên dòng (chỉ chèn/xoá) – thực chất là LCS.
- **Tin sinh học:** so khớp chuỗi DNA/protein (Needleman–Wunsch, Smith–Waterman là edit distance có trọng số).
- **Fuzzy search:** Elasticsearch `fuzziness`, autocomplete chịu lỗi gõ.
- **Nhận dạng giọng nói / OCR:** đo tỉ lệ lỗi từ (WER) = edit distance trên chuỗi từ.
- **Chống đạo văn, phát hiện trùng lặp bản ghi (record linkage).**

## Lỗi thường gặp

1. Index: `dp[i][j]` dùng `a[i-1]`, `b[j-1]` (tiền tố độ dài i) – rất hay lệch 1.
2. Quên khởi tạo hàng/cột 0.
3. Khi khớp vẫn cộng 1.
4. Tối ưu 1 hàng nhưng ghi đè `dp[j-1]` (giá trị chéo) trước khi dùng ⇒ cần biến `prevDiag`.
5. Nhầm thứ tự chuỗi khi chỉ cho phép thao tác trên một chuỗi (chèn vào a = xoá khỏi b).

## Biến thể

- **LCS (1143):** `dp[i][j] = dp[i-1][j-1]+1` nếu khớp, ngược lại `max(dp[i-1][j], dp[i][j-1])`.
- **Delete Operation for Two Strings (583):** chỉ xoá ⇒ `m + n − 2·LCS`.
- **One Edit Distance (161):** O(n) không cần DP.
- **Damerau–Levenshtein:** thêm thao tác hoán vị hai ký tự kề, thêm 1 trường hợp `dp[i-2][j-2]+1`.
- **Regex / Wildcard Matching (10, 44):** cùng khung DP hai tiền tố, công thức theo ký tự đặc biệt.
- **Banded / Ukkonen:** O(n·d) khi distance d nhỏ.
