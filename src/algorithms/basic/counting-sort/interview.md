## Cách trình bày trong phỏng vấn

1. Hỏi ngay: "Giá trị là số nguyên trong miền bao lớn?" – nếu k nhỏ, nói "tôi dùng counting sort O(n + k) thay vì O(n log n)".
2. Giải thích ba bước: đếm → cộng dồn → đặt ngược; nêu lý do duyệt ngược (stable).
3. Nêu O(n + k) thời gian và bộ nhớ, điều kiện áp dụng (k = O(n)).
4. Nếu k lớn: chuyển sang Radix Sort và giải thích tại sao Radix cần Counting Sort stable.

## Câu hỏi follow-up thường gặp

- **Tại sao vượt được Ω(n log n)?** Chặn dưới chỉ áp dụng cho thuật toán so sánh (cây quyết định có n! lá). Counting Sort dùng giá trị làm chỉ số – không so sánh.
- **Stable để làm gì?** Radix Sort sắp xếp theo từng chữ số phải stable để kết quả cuối đúng; sắp xếp bản ghi theo một trường cần giữ thứ tự trường khác.
- **Số âm?** Dịch bằng `−min`. Float? Nhân lên và làm tròn nếu chấp nhận sai số, hoặc Bucket Sort.
- **k = 10⁹, n = 10⁶?** Radix Sort với 16 bit/lượt (2 lượt, bảng 65536) hoặc Quick Sort.
- **Radix LSD vs MSD?** LSD đơn giản, stable, chạy đủ d lượt. MSD như Quick Sort theo chữ số, dừng sớm với chuỗi khác nhau sớm, không stable nếu không cẩn thận.
- **Sort Colors một lượt O(1) bộ nhớ?** Dutch National Flag: ba con trỏ low/mid/high.
- **Bucket Sort khi nào?** Dữ liệu phân bố đều trong một khoảng (float [0,1)), kỳ vọng O(n).
- **Có thể in-place không?** Phiên bản không stable có thể ghi đè vào input; stable cần mảng phụ.

## Checklist nhận diện pattern

- Số nguyên trong miền nhỏ (điểm, tuổi, chữ cái, byte) ⇒ Counting Sort / bảng đếm.
- "Sắp xếp O(n)" trong đề ⇒ Counting / Radix / Bucket.
- "Sắp xếp theo tần suất", "top k frequent" ⇒ bảng đếm + bucket theo tần suất.
- Chuỗi độ dài cố định, số điện thoại, ID ⇒ Radix Sort.

## Bài luyện tập liên quan

- 75 Sort Colors, 1122 Relative Sort Array, 274 H-Index, 1051 Height Checker.
- 347 Top K Frequent Elements (bucket theo tần suất), 451 Sort Characters By Frequency.
- 164 Maximum Gap (bucket, Hard), 912 Sort an Array (thử Radix Sort).
