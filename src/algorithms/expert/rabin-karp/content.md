## Bài toán

Tìm mọi vị trí mà `pattern` (độ dài m) xuất hiện trong `text` (độ dài n). Brute force so sánh từng cửa sổ: O(n·m). KMP làm O(n + m) bằng bảng LPS. **Rabin-Karp** đạt O(n + m) *kỳ vọng* bằng một ý tưởng khác: so sánh **hash** của cửa sổ với hash của pattern, và tính hash cửa sổ tiếp theo trong O(1) từ cửa sổ trước (rolling hash).

## Ý tưởng / Trực giác

Xem chuỗi như một số trong hệ cơ số B (B > kích thước bảng chữ cái), lấy mod M:

`hash(s) = (s₀·B^(m−1) + s₁·B^(m−2) + … + s_{m−1}) mod M`

Trượt cửa sổ từ `[i, i+m)` sang `[i+1, i+m+1)` giống như "bỏ chữ số đầu, dịch trái, thêm chữ số cuối":

`h' = ((h − s_i · B^(m−1)) · B + s_{i+m}) mod M`

Hash khác ⇒ chắc chắn khác. Hash bằng ⇒ **có thể** bằng, phải so trực tiếp m ký tự để loại va chạm giả. Với M là số nguyên tố lớn, xác suất va chạm ≈ 1/M nên hầu như không bao giờ phải so.

## Thuật toán từng bước

1. `high = B^(m−1) mod M` (trọng số ký tự đầu cửa sổ).
2. Tính `hp = hash(pattern)` và `ht = hash(text[0..m))` theo Horner.
3. Với `i = 0..n−m`: nếu `ht === hp` và `text[i..i+m) === pattern` ⇒ ghi nhận `i`. Trượt: `ht = ((ht − text[i]·high)·B + text[i+m]) mod M`, chỉnh về dương nếu âm.

Ở tab **Debug**, dải cyan là cửa sổ hiện tại, bảng Rolling hash cho thấy `hash(cửa sổ)` thay đổi sau mỗi lần trượt; khi hash trùng mà chuỗi khác, cửa sổ tô đỏ – đó là va chạm giả (chọn preset mod 7 để thấy nhiều).

## Chứng minh đúng

- **Không bỏ sót:** nếu `text[i..i+m) = pattern` thì hai chuỗi giống hệt ⇒ hash bằng ⇒ bước so trực tiếp xác nhận ⇒ `i` được ghi nhận.
- **Không thừa:** chỉ ghi nhận sau khi so trực tiếp bằng ⇒ mọi vị trí trả về đều đúng.
- **Rolling hash đúng:** `h_i = Σ_{k=0}^{m−1} s_{i+k}·B^(m−1−k)`. Trừ `s_i·B^(m−1)`, nhân B, cộng `s_{i+m}` cho đúng `h_{i+1}`; mọi phép đều tương thích với mod. Trong JS cần `if (ht < 0) ht += mod` vì `%` giữ dấu của số bị chia.

Tính đúng không phụ thuộc hash; hash chỉ quyết định **tốc độ**.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Rabin-Karp kỳ vọng | O(n + m) | O(1) |
| Rabin-Karp xấu nhất (nhiều va chạm, vd `aaaa…`) | O(n·m) | O(1) |
| KMP | O(n + m) luôn | O(m) |
| Brute force | O(n·m) | O(1) |

## Tradeoff

- KMP đảm bảo tuyến tính; Rabin-Karp chỉ kỳ vọng, nhưng code ngắn hơn và mở rộng được sang **nhiều pattern cùng lúc** (đưa hash vào Set) – KMP không làm được.
- Chọn M lớn (≈ 10⁹+7 hoặc 2⁶¹−1) để giảm va chạm; mod nhỏ như trong demo chỉ để minh hoạ.
- Hash có thể bị tấn công (anti-hash test) nếu B, M cố định và công khai ⇒ dùng B ngẫu nhiên hoặc hash kép.
- Với JS, `ht * base` có thể vượt 2⁵³ khi M lớn ⇒ dùng `BigInt` hoặc M < 2²⁶.

## Lợi / Hại

**Lợi:** đơn giản, O(1) bộ nhớ, tìm nhiều pattern cùng độ dài trong một lượt, nền của fingerprinting và tìm chuỗi con trùng lặp. **Hại:** xấu nhất O(n·m), phụ thuộc tham số hash, phải cẩn thận số âm/tràn số.

## Use case thực tế

- **Phát hiện đạo văn / trùng lặp:** băm mọi k-gram của tài liệu (winnowing, MOSS).
- **Deduplication theo khối:** rsync và các hệ lưu trữ dùng rolling checksum (Adler-32) để tìm khối trùng khi dữ liệu dịch chuyển.
- **Tìm chuỗi con lặp dài nhất:** nhị phân độ dài + rolling hash (LeetCode 1044).
- **Lọc nội dung:** tìm nhiều từ khoá cùng độ dài trong luồng dữ liệu.

## Lỗi thường gặp

- Quên chỉnh `ht` âm sau khi trừ ⇒ không bao giờ khớp.
- Dùng `high = B^m` thay vì `B^(m−1)`.
- Bỏ bước so sánh trực tiếp "vì hash đủ lớn" ⇒ sai trong trường hợp hiếm, khó debug.
- Tính `high` bằng `Math.pow` không mod ⇒ mất chính xác với m lớn.
- Pattern dài hơn text hoặc rỗng không được xử lý trước.

## Biến thể

- **Nhiều pattern cùng độ dài:** `Set` các hash; va chạm thì so trực tiếp.
- **Hash kép (double hashing):** hai cặp (B, M) ⇒ xác suất va chạm ≈ 1/(M₁M₂).
- **Prefix hash + nhị phân:** tiền xử lý O(n) để lấy hash mọi đoạn O(1) – Longest Duplicate Substring, so sánh đoạn, palindrome.
- **Hash 2D:** tìm ma trận con trong ma trận lớn.
- **Winnowing:** chọn hash nhỏ nhất trong mỗi cửa sổ để lấy fingerprint tài liệu.
