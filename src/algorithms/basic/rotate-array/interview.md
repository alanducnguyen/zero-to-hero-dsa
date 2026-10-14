## Cách trình bày trong phỏng vấn

1. Nêu cách mảng phụ O(n) bộ nhớ, rồi "để O(1) tôi dùng đảo ba lần".
2. Viết `reverse` phụ, chứng minh `rev(rev(B)·rev(A))`-style bằng ví dụ 7 phần tử.
3. Nhớ `k %= n`; chạy tay với k = 0 và k = n.
4. Nêu juggling như cách khác nếu được hỏi "ít phép ghi hơn".

## Câu hỏi follow-up thường gặp

- **Xoay trái?** `reverse(0,k−1)`, `reverse(k,n−1)`, `reverse(0,n−1)` hoặc xoay phải `n−k`.
- **Juggling là gì?** Đi theo chu trình `i → (i+k)%n`, mỗi chu trình độ dài `n/gcd(n,k)`; có `gcd(n,k)` chu trình; mỗi phần tử ghi 1 lần.
- **Linked list?** Nối đuôi vào đầu thành vòng, đi `n−k−1` bước từ head, cắt.
- **Ma trận xoay 90°?** Chuyển vị + đảo hàng; xoay ngược: chuyển vị + đảo cột.
- **k âm?** `((k % n) + n) % n`.
- **Stream, không có n trước?** Buffer k phần tử cuối (deque), xuất phần còn lại sau.

## Checklist nhận diện pattern

- "Xoay / dịch vòng / shift" mảng ⇒ đảo ba lần hoặc chỉ số modulo.
- "Đảo từ trong câu", "đảo khối" ⇒ đảo toàn bộ rồi đảo từng khối.

## Bài luyện tập liên quan

- 189 Rotate Array → 151 Reverse Words → 61 Rotate List → 48 Rotate Image → 796 Rotate String.
