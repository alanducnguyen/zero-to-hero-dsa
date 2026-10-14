## Cách trình bày trong phỏng vấn

1. Nêu O(N²·L) so từng cặp, rồi "tôi tìm khoá chuẩn để HashMap gom".
2. Khoá sắp xếp O(L log L); nêu khoá đếm O(L) như tối ưu.
3. Code 8 dòng với Map; chạy tay ví dụ chuẩn.
4. Khái quát: mọi bài "nhóm theo tương đương" đều là tìm khoá chuẩn.

## Câu hỏi follow-up thường gặp

- **Khoá nhanh hơn sắp xếp?** Mảng đếm 26 → chuỗi có phân cách, O(L).
- **Unicode?** Sắp xếp code point sau `normalize('NFC')`; khoá đếm thành Map đếm → chuỗi `k:v` sắp xếp theo k.
- **Group Shifted Strings?** Khoá là dãy `(s[i+1] − s[i] + 26) % 26`.
- **Dữ liệu không vừa RAM?** Hash khoá, partition theo hash ra đĩa/worker (MapReduce), gom trong từng partition.
- **Giữ nhóm theo thứ tự từ dài nhất trước?** Sắp xếp sau khi gom.
- **Tích số nguyên tố làm khoá?** Đúng về lý thuyết (phân tích thừa số duy nhất) nhưng tràn với từ dài; không dùng production.

## Checklist nhận diện pattern

- "Nhóm các phần tử tương đương theo tiêu chí X" ⇒ nghĩ khoá chuẩn cho X + HashMap.
- "Hai thứ giống nhau nếu sắp xếp lại / bỏ qua thứ tự" ⇒ khoá = sắp xếp hoặc đếm.

## Bài luyện tập liên quan

- 49 Group Anagrams → 249 Group Shifted Strings → 1002 Find Common Characters → 438 Find All Anagrams.
