## Cách trình bày trong phỏng vấn

1. Nêu nhanh HashMap O(n)/O(n) và sort O(n log n) để chứng tỏ nắm cơ bản, rồi hỏi "có cần O(1) bộ nhớ không?".
2. Trình bày Boyer-Moore bằng hình ảnh "triệt tiêu phiếu", nhấn mạnh giả định đa số tồn tại.
3. Code 6 dòng, chạy tay với `[2,2,1,1,1,2,2]`.
4. Giải thích vì sao đúng (đa số nhiều hơn tất cả phần tử khác cộng lại).
5. Chủ động nói: nếu đề không đảm bảo, thêm lượt đếm xác minh.

## Câu hỏi follow-up thường gặp

- **Không đảm bảo có đa số?** Thêm một lượt đếm `candidate`; nếu ≤ n/2 trả về "không có".
- **Phần tử > n/3?** Hai ứng viên, hai bộ đếm; giảm cả hai khi gặp phần tử khác cả hai; xác minh cuối.
- **Mảng đã sắp xếp?** `nums[n/2]` là đáp án ngay, O(1).
- **Dữ liệu đến dạng luồng, không lưu được?** Boyer-Moore vẫn chạy, chỉ giữ 2 biến.
- **Chia để trị thì sao?** Đa số của mảng phải là đa số của ít nhất một nửa; O(n log n).
- **Bit manipulation?** Với mỗi bit, đếm số phần tử có bit 1; nếu > n/2 thì bit đó thuộc đáp án. O(32n), O(1).

## Checklist nhận diện pattern

- "Xuất hiện hơn n/2 (hoặc n/k) lần", "giá trị trội", "O(1) bộ nhớ" ⇒ Boyer-Moore / Misra-Gries.
- Chỉ cần đếm tần suất hoặc không có giả định ⇒ HashMap.
- Mảng đã sắp xếp ⇒ chỉ số giữa hoặc nhị phân.

## Bài luyện tập

- 169 Majority Element → 229 Majority Element II.
- 1150 Check If a Number Is Majority Element in a Sorted Array.
- 1287 Element Appearing More Than 25% In Sorted Array.
- 2404 Most Frequent Even Element (HashMap, so sánh cách tiếp cận).
