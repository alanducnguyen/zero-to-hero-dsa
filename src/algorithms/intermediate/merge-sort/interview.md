## Cách trình bày trong phỏng vấn

1. Nêu hai ý: "chia đôi đệ quy" và "merge hai mảng sắp xếp O(n)".
2. Viết `merge` trước (phần có logic), rồi `mergeSort` 5 dòng.
3. Phân tích bằng cây đệ quy: log n tầng × n mỗi tầng; hoặc Master Theorem T(n) = 2T(n/2) + n.
4. Nêu: stable (nhờ `<=`), O(n) bộ nhớ, worst case đảm bảo; so sánh với Quick Sort.
5. Nếu bài là linked list hoặc "đếm cặp…" hãy nói ngay Merge Sort là công cụ.

## Câu hỏi follow-up thường gặp

- **Tại sao O(n log n) đảm bảo mà thư viện vẫn chuộng Quick Sort cho số?** Quick in-place, cache tốt, hằng số nhỏ; với số nguyên không cần stable. Với object cần stable ⇒ TimSort (Merge).
- **Giảm bộ nhớ phụ?** Một buffer n phần tử dùng chung cho mọi lần merge; hoặc sắp xếp linked list O(1) phụ. In-place merge tồn tại nhưng không thực dụng.
- **Sắp xếp linked list?** Slow/fast tìm giữa, cắt, đệ quy, merge bằng nối con trỏ. O(n log n), O(log n) stack (hoặc bottom-up O(1)).
- **Đếm số nghịch thế trong O(n log n)?** Trong merge, khi lấy `right[j]` trước, mọi `left[i..]` còn lại đều lớn hơn ⇒ cộng `left.length − i`.
- **Count of Smaller Numbers After Self (315)?** Merge Sort trên cặp (giá trị, chỉ số), đếm như trên theo từng chỉ số.
- **Sắp xếp 100 GB với 4 GB RAM?** External merge sort: chunk 4 GB, sắp xếp, ghi đĩa, k-way merge với heap.
- **Bottom-up khác gì?** Không đệ quy; lặp width 1, 2, 4…; cùng độ phức tạp; dễ song song và không lo tràn stack.
- **Merge Sort có adaptive không?** Cơ bản thì không; TimSort/natural merge thì có.

## Checklist nhận diện pattern

- Cần sắp xếp **stable** hoặc **worst case đảm bảo** ⇒ Merge Sort.
- Sắp xếp **linked list** ⇒ Merge Sort.
- "Đếm cặp (i, j) với i < j và điều kiện so sánh" (nghịch thế, reverse pairs, smaller after self) ⇒ Merge Sort với đếm trong bước merge.
- Dữ liệu lớn hơn RAM ⇒ external merge sort.

## Bài luyện tập liên quan

- 912 Sort an Array, 88 Merge Sorted Array, 21 Merge Two Sorted Lists.
- 148 Sort List (linked list), 23 Merge k Sorted Lists.
- 315 Count of Smaller Numbers After Self, 493 Reverse Pairs, 327 Count of Range Sum (Hard).
