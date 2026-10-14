## Cách trình bày trong phỏng vấn

1. Baseline: sort O(n log n), heap O(n log k). Hỏi "có cần tốt hơn không, mảng có được sửa không?".
2. Ý tưởng: partition như Quick Sort nhưng chỉ đi một bên ⇒ O(n) trung bình (chuỗi n + n/2 + …).
3. Code partition Lomuto rõ ràng, vòng lặp while thay vì đệ quy.
4. Nêu worst case O(n²) và cách tránh (random pivot), nhắc median of medians cho O(n) chắc chắn.
5. Chuyển đổi "lớn thứ k" ↔ "nhỏ thứ n−k+1".

## Câu hỏi follow-up thường gặp

- **Vì sao trung bình O(n)?** Pivot ngẫu nhiên chia đoạn kỳ vọng còn ~3/4 kích thước mỗi vòng ⇒ chuỗi hình học tổng O(n).
- **Đảm bảo O(n) xấu nhất?** Median of medians (nhóm 5) chọn pivot đảm bảo tỉ lệ 3:7.
- **Nhiều phần tử trùng?** 3-way partition, hoặc kiểm tra `a[p] == target` để dừng sớm.
- **Không được sửa mảng?** Copy O(n) bộ nhớ, hoặc dùng heap O(k).
- **Dữ liệu luồng?** Quickselect cần toàn bộ mảng; dùng heap k phần tử.
- **k phần tử nhỏ nhất (không cần thứ tự)?** Quickselect tới vị trí k, lấy `a[0..k)` – O(n).
- **So với heap khi k ≈ n/2?** Heap O(n log n); quickselect vẫn O(n).

## Checklist nhận diện pattern

- "Phần tử lớn/nhỏ thứ k", "k phần tử gần nhất", "median" trên mảng được phép sửa ⇒ quickselect.
- k nhỏ và/hoặc dữ liệu luồng ⇒ heap.
- Cần đảm bảo worst case hoặc input đối kháng ⇒ random pivot / introselect.

## Bài luyện tập

- 215 Kth Largest Element in an Array → 973 K Closest Points to Origin → 347 Top K Frequent Elements.
- 462 Minimum Moves to Equal Array Elements II (median bằng quickselect).
- 324 Wiggle Sort II (median + 3-way partition), 912 Sort an Array (so sánh với Quick Sort).
