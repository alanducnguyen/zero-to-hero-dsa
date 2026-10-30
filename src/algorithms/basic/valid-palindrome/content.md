## Bài toán

Cho chuỗi `s`. Sau khi **chuyển hết về chữ thường** và **bỏ mọi ký tự không phải chữ cái hoặc chữ số** (khoảng trắng, dấu phẩy, dấu hai chấm…), chuỗi còn lại có đọc xuôi và ngược giống nhau không? Trả về `true`/`false`.

Ví dụ: `"A man, a plan, a canal: Panama"` ⇒ sau chuẩn hóa là `"amanaplanacanalpanama"` ⇒ `true`. `"race a car"` ⇒ `"raceacar"` ⇒ `false`. Chuỗi rỗng (hoặc chỉ toàn ký tự rác) được coi là palindrome.

## Ý tưởng / Trực giác

Cách "thẳng" là tạo chuỗi sạch `t` rồi so `t` với `t` đảo ngược – đúng nhưng tốn O(n) bộ nhớ và hai lượt duyệt. Quan sát: palindrome nghĩa là **ký tự thứ k từ trái bằng ký tự thứ k từ phải**. Ta không cần chuỗi sạch; chỉ cần hai con trỏ `l` (từ đầu) và `r` (từ cuối) cùng **"nhảy qua" ký tự rác** để tìm đúng ký tự thứ k ở mỗi phía.

Ở mỗi bước có ba khả năng:

- `s[l]` là rác ⇒ nó không tồn tại trong chuỗi chuẩn hóa ⇒ `l++`.
- `s[r]` là rác ⇒ tương tự `r--`.
- Cả hai đều hợp lệ ⇒ so sánh (không phân biệt hoa thường). Lệch ⇒ `false` ngay; khớp ⇒ thu hẹp cả hai đầu.

Đây là pattern **hai con trỏ ngược chiều** kinh điển: mỗi bước loại bỏ ít nhất một ký tự khỏi vùng cần xét.

## Thuật toán từng bước

1. `l = 0`, `r = n − 1`.
2. Trong khi `l < r`:
   - Nếu `s[l]` không phải chữ/số: `l++`, sang vòng tiếp.
   - Ngược lại, nếu `s[r]` không phải chữ/số: `r--`, sang vòng tiếp.
   - Ngược lại, nếu `lower(s[l]) ≠ lower(s[r])`: trả về `false`.
   - Ngược lại: `l++`, `r--`.
3. Trả về `true`.

Chạy tay `"race a car"`: `r`/`r` khớp, `a`/`a` khớp, `c`/`c` khớp, `e` với khoảng trắng ⇒ bỏ khoảng trắng bên phải, `e` với `a` ⇒ lệch ⇒ `false`.

## Chứng minh đúng

Gọi `t` là chuỗi chuẩn hóa. **Bất biến:** các ký tự hợp lệ nằm ngoài đoạn `[l, r]` đã được ghép cặp đúng thứ tự: ký tự hợp lệ thứ k từ trái (bên trái `l`) khớp với ký tự hợp lệ thứ k từ phải (bên phải `r`), và số ký tự hợp lệ đã đi qua ở hai phía bằng nhau.

- Khởi tạo: chưa đi qua ký tự nào – đúng.
- Bỏ ký tự rác không thay đổi `t` nên không ảnh hưởng bất biến.
- Khi cả `s[l]`, `s[r]` hợp lệ, chúng chính là `t[k]` và `t[|t|−1−k]` với cùng một `k` (do số ký tự hợp lệ đã qua ở hai bên bằng nhau). Nếu lệch, `t` không là palindrome ⇒ `false` là đúng. Nếu khớp, tăng `k` thêm 1 – bất biến được giữ.
- Kết thúc khi `l ≥ r`: còn tối đa một ký tự ở giữa, ký tự này tự đối xứng ⇒ `true`.

Mỗi vòng lặp giảm `r − l` ít nhất 1 nên thuật toán chắc chắn dừng.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Lọc + đảo chuỗi | O(n) | O(n) |
| Hai con trỏ | **O(n)** | **O(1)** |
| Trường hợp tốt nhất (lệch ngay cặp đầu) | O(1) | O(1) |

Mỗi ký tự được con trỏ đi qua tối đa một lần ⇒ tổng số bước ≤ n.

## Tradeoff

- Lọc + đảo: code một dòng, dễ đọc, phù hợp script; nhưng cấp phát thêm 2 chuỗi và luôn duyệt hết, kể cả khi sai ngay ký tự đầu.
- Hai con trỏ: O(1) bộ nhớ, dừng sớm khi gặp lệch; đổi lại phải xử lý cẩn thận ba nhánh và điều kiện biên.
- `isAlnum` bằng regex dễ đọc; trong ngôn ngữ hiệu năng cao có thể dùng so sánh mã ký tự (`charCodeAt`) để nhanh hơn.

## Lợi / Hại

**Lợi:**
- Không cấp phát, dừng sớm, phù hợp chuỗi rất dài hoặc kiểm tra trên stream có truy cập ngẫu nhiên.
- Là bài khởi động hoàn hảo cho pattern hai con trỏ trên chuỗi.

**Hại:**
- Chỉ xử lý ASCII chữ/số theo định nghĩa của đề; Unicode (chữ có dấu tiếng Việt, emoji, ký tự ghép) cần chuẩn hóa NFC/NFD và tách grapheme – hai con trỏ trên code unit sẽ sai.
- Dễ bug nếu quên kiểm tra `l < r` khi nhảy qua ký tự rác bằng vòng `while` lồng nhau.

## Use case thực tế

- Kiểm tra dữ liệu đầu vào trong các trò chơi chữ, bộ lọc nội dung, bài tập lập trình tự động chấm.
- Chuẩn hóa so sánh "bỏ qua dấu câu, hoa thường" – cùng kỹ thuật dùng khi so khớp mã khuyến mãi, tên người dùng, số điện thoại có dấu cách/gạch nối.
- Pattern "so hai đầu tiến vào giữa" xuất hiện trong kiểm tra đối xứng của mảng, DNA reverse-complement, so sánh buffer.

## Lỗi thường gặp

- Dùng vòng `while` lồng để nhảy rác nhưng quên điều kiện `l < r` ⇒ con trỏ vượt nhau hoặc chạy ra ngoài mảng.
- So sánh trực tiếp `s[l] !== s[r]` mà quên `toLowerCase()` ⇒ `"Aa"` bị coi là sai.
- Chỉ lọc chữ cái mà quên chữ số: `"0P"` phải là `false` (vì `'0' ≠ 'p'`), không phải `true`.
- Dịch cả hai con trỏ khi chỉ một bên là rác ⇒ lệch cặp.

## Biến thể

- **LC 680 – Valid Palindrome II:** được xóa tối đa một ký tự; khi lệch, thử bỏ `s[l]` hoặc `s[r]` rồi kiểm tra đoạn còn lại.
- **LC 234 – Palindrome Linked List:** tìm giữa bằng fast/slow, đảo nửa sau rồi so.
- **LC 9 – Palindrome Number:** đảo nửa số thay vì chuyển chuỗi.
- **LC 5 / 647 – palindrome con:** mở rộng từ tâm (expand around center) hoặc DP.
- **LC 1216 – K-Palindrome:** DP LCS giữa chuỗi và chuỗi đảo.
