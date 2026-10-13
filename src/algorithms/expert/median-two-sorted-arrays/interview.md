## Cách trình bày trong phỏng vấn

1. Nêu O(m + n) bằng hai con trỏ để có baseline đúng, rồi nói mục tiêu log.
2. Định nghĩa trung vị theo "điểm cắt" nửa trái/nửa phải và hai điều kiện biên – đây là ý chính.
3. Giải thích vì sao nhị phân được (đơn điệu theo i) và vì sao chọn mảng ngắn.
4. Code cẩn thận với ±∞ và `half = (m+n+1)/2`; chạy tay `[1,2]`/`[3,4]` và một case lệch.
5. Nếu còn thời gian: tổng quát hoá sang kth smallest.

## Câu hỏi follow-up thường gặp

- **Vì sao chỉ cần kiểm tra 2 cặp biên?** Trong mỗi mảng, phần trái ≤ phần phải sẵn; chỉ cần chéo: cuối trái của A ≤ đầu phải của B và ngược lại.
- **Vì sao nhị phân trên mảng ngắn?** Để `j = half − i` luôn trong `[0, n]` và độ phức tạp log(min).
- **Tổng lẻ thì sao?** `half` làm tròn lên ⇒ nửa trái nhiều hơn 1, trung vị = max nửa trái.
- **Tìm phần tử thứ k?** Thay `half` bằng `k`, trả về max nửa trái.
- **k mảng?** Nhị phân trên giá trị với đếm `≤ x` qua `upperBound` từng mảng: O(k log n log range).
- **Mảng không sắp xếp?** Quickselect O(m + n) trên hợp.

## Checklist nhận diện pattern

- "Hai mảng đã sắp xếp" + "trung vị / phần tử thứ k" + "log" ⇒ nhị phân điểm cắt.
- Điều kiện kiểm tra có dạng "lấy i từ A thì phải lấy k − i từ B" ⇒ không gian tìm kiếm 1 chiều, đơn điệu.
- Nhiều mảng hoặc hỏi giá trị thay vì vị trí ⇒ nhị phân trên giá trị.

## Bài luyện tập

- 4 Median of Two Sorted Arrays (bài gốc).
- 215 Kth Largest Element (quickselect), 378 Kth Smallest in Sorted Matrix (nhị phân giá trị).
- 295 Find Median from Data Stream (hai heap), 1201 Ugly Number III (nhị phân giá trị).
