## Cách trình bày trong phỏng vấn

1. Hỏi: phân biệt hoa/thường? Unicode hay chỉ a–z? Khoảng trắng tính không?
2. Nêu cách sắp xếp O(n log n) một câu, rồi đếm O(n) với một Map cộng/trừ.
3. Nhấn mạnh kiểm tra độ dài và dừng sớm khi âm; giải thích vì sao "không âm + cùng độ dài ⇒ tất cả 0".
4. Nếu chỉ a–z: mảng 26 phần tử O(1) bộ nhớ.

## Câu hỏi follow-up thường gặp

- **Unicode?** Duyệt code point bằng `for...of`; chuẩn hoá NFC; dùng Map thay mảng 26.
- **Nhóm nhiều chuỗi theo anagram?** Khoá chuẩn: chuỗi sắp xếp O(L log L) hoặc chuỗi đếm `#1#0#2...` O(L); Map khoá → danh sách.
- **Tìm mọi vị trí anagram của p trong s?** Sliding window độ dài |p|, bộ đếm chênh lệch và biến `matches` để O(1) mỗi bước.
- **Không được dùng bộ nhớ phụ?** Sắp xếp tại chỗ hai chuỗi (chuyển thành mảng) rồi so sánh, O(n log n).
- **Stream hai chuỗi rất dài?** Một Map cộng/trừ vẫn O(k) bộ nhớ; kiểm tra âm giúp dừng sớm.
- **Hash tổng ký tự có đủ không?** Không: `ad` và `bc` cùng tổng. Cần histogram đầy đủ hoặc hash tốt với xác suất.

## Checklist nhận diện pattern

- "Cùng tập ký tự", "sắp xếp lại được thành", "hoán vị của chuỗi" ⇒ đếm tần suất.
- "Nhóm các chuỗi tương đương" ⇒ khoá chuẩn + Map.
- "Mọi cửa sổ là anagram" ⇒ sliding window + bộ đếm.

## Bài luyện tập liên quan

- 242 Valid Anagram → 383 Ransom Note → 49 Group Anagrams → 438 Find All Anagrams → 567 Permutation in String.
