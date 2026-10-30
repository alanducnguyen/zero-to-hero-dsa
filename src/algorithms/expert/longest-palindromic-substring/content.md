## Bài toán

Cho chuỗi `s`, tìm **chuỗi con liên tiếp** dài nhất là palindrome (đọc xuôi hay ngược đều như nhau). Nếu có nhiều đáp án cùng độ dài, ở đây ta trả về cái **xuất hiện đầu tiên**.

Ví dụ: `"babad"` → `"bab"` (`"aba"` cũng hợp lệ nhưng đến sau); `"cbbd"` → `"bb"`; `"a"` → `"a"`.

> Trang **"Nhiều lời giải"** của bài này so sánh trực tiếp Brute force O(n³), Quy hoạch động O(n²) bộ nhớ O(n²) và Mở rộng từ tâm O(n²) bộ nhớ O(1) – nên xem sau khi đọc bài này.

## Ý tưởng / Trực giác

Brute force thử mọi cặp (i, j) rồi kiểm tra palindrome ⇒ O(n³). Lãng phí vì nó bỏ qua cấu trúc của palindrome: **mọi palindrome đều đối xứng quanh một tâm**. Nếu `s[l..r]` là palindrome thì `s[l+1..r-1]` cũng là palindrome. Ngược lại, biết `s[l+1..r-1]` là palindrome, chỉ cần so `s[l]` với `s[r]` là biết đoạn lớn hơn có phải palindrome không – O(1) mỗi bước mở rộng.

Vậy thay vì chọn hai đầu, ta **chọn tâm rồi nới dần ra**. Có hai loại tâm:

- **Tâm là một ký tự** – cho palindrome độ dài lẻ (`"aba"`), có n tâm.
- **Tâm là khe giữa hai ký tự** – cho palindrome độ dài chẵn (`"abba"`), có n − 1 tâm.

Tổng cộng **2n − 1 tâm**. Code dùng một biến `c` chạy từ 0 tới 2n − 2: `c` chẵn là ký tự `c/2`, `c` lẻ là khe giữa `(c−1)/2` và `(c+1)/2` – gộp hai trường hợp vào một vòng lặp.

## Thuật toán từng bước

1. `start = 0`, `maxLen = 1` (chuỗi rỗng thì 0) – mỗi ký tự đơn là palindrome.
2. Với mỗi tâm `c` trong [0, 2n − 2]: `l = ⌊c/2⌋`, `r = l + (c mod 2)`.
3. Trong khi `l ≥ 0`, `r < n` và `s[l] === s[r]`: `l--`, `r++`.
4. Khi dừng, palindrome quanh tâm là `s[l+1 .. r-1]`, độ dài `r − l − 1`.
5. Nếu dài hơn `maxLen` (so sánh **nghiêm ngặt**) thì cập nhật `start = l + 1`, `maxLen`.
6. Trả về `s.slice(start, start + maxLen)`.

## Chứng minh đúng

**Đầy đủ:** mỗi palindrome `s[i..j]` có đúng một tâm – ký tự `(i+j)/2` nếu độ dài lẻ, hoặc khe giữa nếu chẵn. Tâm đó nằm trong 2n − 1 tâm ta duyệt, nên palindrome dài nhất chắc chắn được "chạm tới".

**Mở rộng tối đa:** bất biến của vòng `while` là "`s[l+1..r-1]` là palindrome". Lúc đầu đoạn rỗng (tâm chẵn) hoặc một ký tự (tâm lẻ) – đúng. Mỗi bước chỉ mở rộng khi `s[l] === s[r]`, giữ bất biến. Khi dừng, hoặc chạm biên, hoặc `s[l] ≠ s[r]` – mọi đoạn rộng hơn cùng tâm đều chứa cặp (l, r) đối xứng không khớp nên không thể là palindrome. Vậy ta có palindrome **dài nhất quanh tâm đó**, và lấy max qua mọi tâm là đáp án.

**Đáp án đầu tiên:** duyệt tâm từ trái sang và chỉ cập nhật khi `len > maxLen`, nên với cùng độ dài, palindrome có tâm nhỏ hơn – tức bắt đầu sớm hơn – được giữ.

## Độ phức tạp

| Thước đo | Giá trị | Giải thích |
|---|---|---|
| Thời gian xấu nhất | O(n²) | Ví dụ `"aaaa…"`: tâm thứ k mở rộng ~min(k, n−k) bước |
| Thời gian tốt nhất | O(n) | Không hai ký tự kề nào giống nhau ⇒ mỗi tâm dừng ngay |
| Bộ nhớ | O(1) | Chỉ vài biến chỉ số (không tính chuỗi kết quả) |

## Tradeoff

- **DP** `dp[i][j] = s[i] == s[j] && dp[i+1][j-1]`: cũng O(n²) nhưng tốn O(n²) bộ nhớ và luôn chạy đủ n²/2 ô kể cả khi chuỗi "ngẫu nhiên". Lợi thế: bảng dp trả lời được mọi truy vấn "s[i..j] có phải palindrome?" – hữu ích cho Palindrome Partitioning.
- **Expand around center**: cùng O(n²) nhưng hằng số nhỏ, O(1) bộ nhớ, thực tế nhanh hơn nhiều trên chuỗi thường.
- **Manacher**: O(n) thời gian, O(n) bộ nhớ – tối ưu lý thuyết nhưng khó viết đúng trong 45 phút.

## Lợi / Hại

**Lợi:** code ngắn, dễ giải thích, không cấp phát bộ nhớ; dễ mở rộng sang đếm số palindrome con (LeetCode 647) chỉ bằng cách cộng số bước mở rộng.

**Hại:** vẫn O(n²) với chuỗi toàn ký tự giống nhau; không tái sử dụng thông tin giữa các tâm (đây chính là chỗ Manacher cải tiến).

## Use case thực tế

- Phân tích chuỗi DNA: tìm vùng đối xứng ngược (palindromic sequences) là vị trí cắt của enzyme giới hạn.
- Nén dữ liệu / phát hiện cấu trúc đối xứng trong chuỗi.
- Tiền xử lý cho các bài phân hoạch palindrome, xây Palindromic Tree (eertree).

## Lỗi thường gặp

- **Quên tâm chẵn** ⇒ `"cbbd"` trả `"c"` thay vì `"bb"`.
- Tính sai độ dài: khi vòng lặp dừng, `l` và `r` đã **vượt** một bước ⇒ độ dài là `r − l − 1`, bắt đầu tại `l + 1`.
- Dùng `>=` khi cập nhật ⇒ trả về palindrome cuối cùng chứ không phải đầu tiên.
- Nối chuỗi (`s.substring`) bên trong vòng lặp để so sánh ⇒ biến O(n²) thành O(n³). Chỉ lưu chỉ số, cắt chuỗi một lần ở cuối.
- Khởi tạo `maxLen = 1` với chuỗi rỗng ⇒ trả sai; xử lý riêng n = 0.

## Biến thể

- **Manacher's algorithm (O(n))**: chèn ký tự phân cách (`#a#b#a#`) để chỉ còn tâm lẻ, lưu mảng bán kính `P[i]`. Khi tâm `i` nằm trong palindrome phải nhất đã biết (tâm `C`, biên phải `R`), khởi tạo `P[i] = min(R − i, P[2C − i])` nhờ đối xứng gương rồi mới mở rộng tiếp. Biên `R` chỉ tăng nên tổng số bước mở rộng là O(n).
- **LeetCode 647 – Palindromic Substrings**: đếm tổng số palindrome con – cùng khung mở rộng từ tâm.
- **LeetCode 516 – Longest Palindromic Subsequence**: *dãy con* (không liên tiếp) ⇒ phải dùng DP O(n²), không mở rộng tâm được.
- **LeetCode 214 – Shortest Palindrome**: tìm palindrome tiền tố dài nhất, giải bằng KMP O(n).
