## Cách trình bày trong phỏng vấn

1. Nêu brute force O(n²) trong một câu – đừng code nó.
2. "Tôi sẽ dùng HashMap để tra phần bù trong O(1), một lượt."
3. Viết code, **nói rõ** vì sao kiểm tra trước rồi mới ghi.
4. Chạy tay `[3,2,4]`, target 6 để chứng minh không tự ghép.
5. O(n)/O(n). Nếu được hỏi O(1) bộ nhớ: sắp xếp + two pointers, đánh đổi O(n log n) và mất chỉ số.

## Câu hỏi follow-up thường gặp

- **Mảng sắp xếp?** Two pointers O(n)/O(1).
- **Trả tất cả cặp, không trùng?** Sắp xếp + two pointers với bỏ qua trùng; hoặc Map đếm tần suất rồi duyệt giá trị phân biệt.
- **Có nhiều hơn một đáp án?** Hỏi: trả cặp đầu tiên? tất cả? Map giá trị → danh sách chỉ số.
- **Nếu có phần tử trùng và target = 2·x?** Một lượt xử lý tự nhiên: x thứ hai tìm thấy x thứ nhất trong Map.
- **Stream dữ liệu, truy vấn find(target) nhiều lần?** Two Sum III: Map đếm; find duyệt Map O(n) mỗi truy vấn hoặc lưu tập tổng O(n²) nếu find nhiều hơn add.
- **Số thực?** Băm float rủi ro vì sai số; làm tròn theo epsilon hoặc dùng sắp xếp + two pointers với so sánh xấp xỉ.
- **Bộ nhớ hạn chế, n = 10⁹?** Không giữ Map trong RAM: external sort rồi two pointers; hoặc Bloom filter để lọc trước.
- **Tại sao Map thay vì Object?** Giữ kiểu key (số), không có key đặc biệt, hiệu năng ổn định với nhiều key.

## Checklist nhận diện pattern

- "Tìm cặp / tồn tại phần tử thoả quan hệ với phần tử hiện tại" ⇒ Map "đã thấy".
- "Đếm số cặp (i, j) thoả f(nums[i]) = g(nums[j])" ⇒ Map đếm tần suất của một vế.
- Mảng đã sắp xếp và cần O(1) bộ nhớ ⇒ two pointers thay vì Map.

## Bài luyện tập liên quan

- 1 Two Sum → 167 Two Sum II → 15 3Sum → 18 4Sum → 454 4Sum II.
- 219 Contains Duplicate II, 532 K-diff Pairs, 1010 Pairs of Songs Divisible by 60, 1512 Number of Good Pairs.
- 170 Two Sum III (design), 653 Two Sum IV (BST).
