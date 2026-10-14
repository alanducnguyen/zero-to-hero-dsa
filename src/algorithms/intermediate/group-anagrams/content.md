## Bài toán

Cho danh sách từ, gom các từ là anagram của nhau vào cùng nhóm. `["eat","tea","tan","ate","nat","bat"]` → `[["eat","tea","ate"],["tan","nat"],["bat"]]`.

LeetCode 49 là bài HashMap phổ biến nhất ở Amazon và Meta. Ý tưởng lớn hơn bài toán: **tìm một "khoá chuẩn" (canonical key) sao cho hai phần tử tương đương ⇔ cùng khoá**, rồi để HashMap gom nhóm. Mẫu này giải Group Shifted Strings, gom URL tương đương, dedupe bản ghi.

## Ý tưởng / Trực giác

So mọi cặp bằng Valid Anagram là O(N²·L). Thay vào đó, biến mỗi từ thành dạng chuẩn mà mọi anagram đều biến thành giống nhau: **sắp xếp ký tự** (`eat`, `tea`, `ate` → `aet`). Map khoá → nhóm, một lượt.

Khoá khác: chuỗi đếm `#1#0#0...#1` (26 số) – O(L) thay vì O(L log L), nhưng dài hơn và chỉ cho a–z.

## Thuật toán từng bước

1. Với mỗi từ: `key = sort(chars)`.
2. `groups[key].push(word)`.
3. Trả các giá trị của Map.

Tab **Debug**: từ tím đang xử lý, Map bên dưới gom dần; khoá vàng là khoá đã tồn tại.

## Chứng minh đúng

Hai từ là anagram ⇔ cùng multiset ký tự ⇔ chuỗi sắp xếp bằng nhau (chuỗi sắp xếp là biểu diễn duy nhất của multiset). Vậy Map theo khoá gom đúng mọi anagram vào một nhóm và không gộp nhầm từ khác multiset.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Khoá sắp xếp | O(N · L log L) | N từ, L độ dài trung bình |
| Khoá đếm | O(N · L) | Dựng chuỗi 26 số mỗi từ |
| Bộ nhớ | O(N · L) | Map và kết quả |

## Tradeoff

- **Khoá sắp xếp ↔ Khoá đếm:** sắp xếp đơn giản, hỗ trợ Unicode; đếm nhanh hơn với từ dài nhưng cần bảng chữ cái cố định và khoá có dấu phân cách (tránh `1,11` vs `11,1`).
- **Khoá tích số nguyên tố:** gán mỗi chữ một số nguyên tố, khoá = tích – O(L) nhưng tràn số nhanh; chỉ nêu khi được hỏi.
- **Giữ thứ tự nhóm:** JS Map giữ thứ tự chèn ⇒ nhóm theo lần xuất hiện đầu tiên; đề thường không yêu cầu thứ tự.
- **Rất nhiều từ (hàng tỷ):** hash khoá và shuffle theo khoá (MapReduce) – cùng ý tưởng.

## Lợi / Hại

**Lợi:** một lượt, dễ mở rộng cho bất kỳ quan hệ tương đương nào có khoá chuẩn.
**Hại:** cần nghĩ ra khoá chuẩn đúng (ví dụ Group Shifted Strings: khoá là dãy hiệu mod 26); bộ nhớ O(N·L).

## Use case thực tế

- **Dedupe / record linkage:** gom bản ghi khách hàng theo khoá chuẩn hoá (bỏ dấu, thường hoá, sắp xếp token).
- **Search engine:** gom URL tương đương (chuẩn hoá tham số), gom truy vấn cùng tập từ.
- **Phát hiện đạo văn / spam:** gom văn bản theo "bag of words" hoặc hash của tập từ.
- **Hệ thống file:** gom file trùng theo hash nội dung.
- **Trò chơi chữ:** gợi ý mọi từ ghép được từ một bộ chữ (Scrabble, Wordle helper).

## Lỗi thường gặp

1. Khoá đếm không có dấu phân cách ⇒ va chạm.
2. Dùng Object với key `constructor`/`__proto__`.
3. Sắp xếp từ gốc tại chỗ rồi mất từ gốc – phải sort bản sao.
4. Quên chuỗi rỗng (khoá `""`) là hợp lệ.
5. Unicode: `[...w]` thay vì `w.split('')`.

## Biến thể

- **Group Shifted Strings (249):** khoá = hiệu giữa ký tự liên tiếp mod 26.
- **Find All Anagrams (438):** sliding window.
- **Group theo tập ký tự phân biệt (không đếm):** khoá = Set sắp xếp.
- **Nhóm số có cùng chữ số:** khoá = chữ số sắp xếp.
