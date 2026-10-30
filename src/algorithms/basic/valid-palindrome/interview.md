## Cách trình bày trong phỏng vấn

1. Làm rõ đề: "chữ/số" gồm những gì? Có Unicode không? Chuỗi rỗng trả về gì? (`true`).
2. Nêu cách đơn giản: lọc + đảo, O(n) bộ nhớ. Sau đó đề xuất hai con trỏ để đạt O(1) bộ nhớ và dừng sớm.
3. Viết vòng lặp với ba nhánh (rác trái / rác phải / so sánh) – cấu trúc if-else-if giúp tránh vòng lặp lồng và lỗi vượt biên.
4. Chạy tay `"race a car"` ⇒ `false` và `"0P"` ⇒ `false` (bẫy chữ số).
5. Chốt O(n) thời gian, O(1) bộ nhớ.

## Câu hỏi follow-up thường gặp

- **Được xóa tối đa 1 ký tự (LC 680)?** Khi lệch, kiểm tra `isPal(l+1, r) || isPal(l, r−1)` – vẫn O(n).
- **Tự viết `isAlnum` không dùng regex?** So khoảng mã ký tự `'0'–'9'`, `'a'–'z'`, `'A'–'Z'`.
- **Chuỗi Unicode / tiếng Việt có dấu?** Chuẩn hóa (NFC), tách grapheme (`Intl.Segmenter`), rồi mới chạy hai con trỏ trên mảng grapheme.
- **Chuỗi cực lớn trong file/stream?** Hai con trỏ cần truy cập ngẫu nhiên hai đầu – đọc file theo block từ hai phía.
- **Kiểm tra trên linked list?** Fast/slow tìm giữa, đảo nửa sau, so hai nửa (LC 234).

## Checklist nhận diện pattern

- Kiểm tra **tính đối xứng** của chuỗi/mảng ⇒ hai con trỏ từ hai đầu tiến vào.
- Có ký tự cần **bỏ qua** theo điều kiện ⇒ mỗi bước chỉ dịch con trỏ phía có ký tự rác.
- Yêu cầu O(1) bộ nhớ hoặc dừng sớm ⇒ tránh tạo chuỗi trung gian.

## Bài luyện tập liên quan

- LeetCode 125 – Valid Palindrome.
- LeetCode 680 – Valid Palindrome II.
- LeetCode 234 – Palindrome Linked List.
- LeetCode 344 – Reverse String.
- LeetCode 5 – Longest Palindromic Substring.
