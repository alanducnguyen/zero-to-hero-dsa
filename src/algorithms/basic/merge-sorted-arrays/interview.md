## Cách trình bày trong phỏng vấn

1. Nêu cách mảng phụ O(m+n) bộ nhớ để lấy đà, rồi hỏi "cần O(1) bộ nhớ không?".
2. Chỉ ra vấn đề ghi đè khi trộn từ đầu; đề xuất trộn từ cuối với 3 con trỏ.
3. Nêu bất biến "ô ghi luôn ở bên phải phần chưa xét".
4. Code với `while (j >= 0)`, chạy tay ví dụ, nói rõ vì sao không cần chép phần còn lại của nums1.
5. Nhắc biến thể linked list và k mảng.

## Câu hỏi follow-up thường gặp

- **Vì sao không cần xử lý phần còn lại của nums1?** Chúng đã ở đúng vị trí `0..i` và nhỏ hơn mọi phần tử đã ghi.
- **Vì sao phải chép nốt nums2 khi nums1 hết?** Vì các phần tử đó cần được đưa vào nums1; vòng lặp theo `j` xử lý tự động.
- **Trộn hai linked list?** Dummy node + hai con trỏ từ đầu, O(1) bộ nhớ, không cần đi từ cuối.
- **k mảng đã sắp xếp?** Min-heap k phần tử: O(N log k); hoặc chia để trị cặp đôi.
- **nums1 không có chỗ trống?** Phải dùng mảng phụ hoặc in-place merge phức tạp (Timsort dùng buffer nhỏ).
- **Ổn định không?** Có, với `>` nghiêm ngặt: phần tử bằng nhau từ nums2 được ghi trước (đứng sau), giữ nums1 phía trước.

## Checklist nhận diện pattern

- Hai (hoặc nhiều) dãy đã sắp xếp cần gộp ⇒ hai con trỏ, O(m+n).
- Ghi vào mảng có sẵn chỗ trống ⇒ đi từ cuối.
- "Squares", "merge intervals", "intersection" của dãy sắp xếp ⇒ cùng kỹ thuật hai con trỏ.

## Bài luyện tập

- 88 Merge Sorted Array → 21 Merge Two Sorted Lists → 23 Merge k Sorted Lists.
- 977 Squares of a Sorted Array, 349/350 Intersection of Two Arrays.
- 986 Interval List Intersections, 1213 Intersection of Three Sorted Arrays.
