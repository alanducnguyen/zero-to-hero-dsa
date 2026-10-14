## Bài toán

Hai chuỗi `s`, `t` có phải anagram của nhau không: cùng các ký tự với cùng số lần xuất hiện, chỉ khác thứ tự. `anagram` / `nagaram` → true.

Bài LeetCode 242 là bài "khởi động" phổ biến ở Amazon, Bloomberg, Uber. Giá trị của nó không nằm ở độ khó mà ở **mẫu đếm tần suất** – thứ bạn sẽ dùng lại trong Group Anagrams, Find All Anagrams (sliding window), Ransom Note, Top K Frequent.

## Ý tưởng / Trực giác

Hai cách nhìn:
- **Sắp xếp:** anagram ⇔ sắp xếp hai chuỗi cho kết quả bằng nhau. O(n log n), code 1 dòng.
- **Đếm:** anagram ⇔ histogram ký tự giống nhau. Cộng cho `s`, trừ cho `t`; nếu có bộ đếm âm thì `t` có ký tự thừa; nếu độ dài bằng nhau và không âm thì mọi bộ đếm là 0. O(n).

Kiểm tra độ dài trước để loại sớm và để lập luận "không âm ⇒ bằng 0" đúng.

## Thuật toán từng bước

1. Độ dài khác ⇒ false.
2. Với mỗi ký tự `s`: `count[ch]++`.
3. Với mỗi ký tự `t`: `count[ch]--`; âm ⇒ false.
4. Trả true.

Tab **Debug**: Map bên dưới tăng khi quét `s`, giảm khi quét `t`; preset "Cùng độ dài, khác" dừng ngay khi gặp bộ đếm âm.

## Chứng minh đúng

Gọi `cs[ch]`, `ct[ch]` là số lần `ch` trong `s`, `t`. Sau bước 3 (nếu không dừng), `count[ch] = cs[ch] − ct[ch] ≥ 0` với mọi `ch`. Tổng `Σ count[ch] = |s| − |t| = 0` và mọi số hạng ≥ 0 ⇒ mọi `count[ch] = 0` ⇒ `cs = ct` ⇒ anagram. Ngược lại, nếu dừng ở bước 3 thì `ct[ch] > cs[ch]` ⇒ không anagram. Nếu độ dài khác ⇒ không anagram.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Đếm | O(n) / O(k) | k = kích thước bảng chữ cái (26 với chữ thường ⇒ O(1)) |
| Sắp xếp | O(n log n) / O(n) | |

## Tradeoff

- **Mảng 26 ↔ Map:** mảng `int[26]` nhanh và O(1) bộ nhớ nhưng chỉ cho chữ thường ASCII; Map xử lý Unicode (tiếng Việt, emoji) – duyệt bằng `for...of` để không tách surrogate pair, cân nhắc `normalize('NFC')` vì "ệ" có thể là 1 hoặc 3 code point.
- **Đếm ↔ Sắp xếp:** sắp xếp cho "khoá chuẩn" dùng được để **nhóm** nhiều chuỗi (Group Anagrams); đếm nhanh hơn cho so sánh một cặp.
- **Một Map ↔ Hai Map:** một Map với cộng/trừ ít bộ nhớ hơn và cho phép dừng sớm.

## Lợi / Hại

**Lợi:** O(n), dừng sớm, mở rộng thành sliding window (Find All Anagrams) bằng cách cộng/trừ khi cửa sổ trượt.
**Hại:** phụ thuộc định nghĩa "ký tự" với Unicode; cần chuẩn hoá hoa/thường, khoảng trắng nếu đề yêu cầu.

## Use case thực tế

- **Tìm kiếm / gợi ý từ:** gom từ cùng tập chữ (Scrabble, giải ô chữ).
- **Phát hiện trùng lặp mờ:** so khớp tên/địa chỉ sau khi chuẩn hoá thứ tự từ.
- **Bảo mật:** so sánh histogram byte để phát hiện tệp bị xáo trộn, đối chiếu checksum đơn giản.
- **Sinh học:** so sánh thành phần nucleotide/amino acid giữa hai đoạn.

## Lỗi thường gặp

1. Dùng `s.length` với Unicode ⇒ đếm sai; duyệt bằng `for...of`.
2. Quên kiểm tra độ dài rồi kết luận "không bộ đếm âm ⇒ anagram" (sai khi `s` dài hơn).
3. Không chuẩn hoá hoa/thường khi đề yêu cầu không phân biệt.
4. Dùng Object với key như `constructor` ⇒ bug; dùng Map.

## Biến thể

- **Group Anagrams (49):** khoá = chuỗi đã sắp xếp hoặc chuỗi đếm 26 số.
- **Find All Anagrams (438):** sliding window với bộ đếm và số ký tự "khớp".
- **Ransom Note (383):** chỉ cần `count` không âm (một chiều).
- **Permutation in String (567):** cửa sổ cố định, so histogram.
