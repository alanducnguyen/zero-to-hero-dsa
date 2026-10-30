## Cách trình bày trong phỏng vấn

1. **Làm rõ đề:** k nguyên? `h ≥ n`? Giá trị tối đa của `piles[i]` và `h` (để lo tràn số)?
2. **Brute force trước:** thử mọi `k` từ 1 tới `max(piles)`, mỗi lần O(n) ⇒ O(n · M). Nêu ra để có mốc so sánh.
3. **Nhận xét đơn điệu:** "k tăng thì tổng giờ không tăng ⇒ vị từ canFinish(k) có dạng false…false true…true ⇒ binary search điểm chuyển."
4. **Chốt cận:** `lo = 1`, `hi = max(piles)` và giải thích vì sao `hi` luôn thỏa.
5. **Code template `lo < hi`**, nói rõ vì sao `hi = mid` còn `lo = mid + 1`, vì sao vòng lặp luôn dừng.
6. **Dry-run** với `[3, 6, 7, 11], h = 8` và nêu độ phức tạp `O(n log M)`, bộ nhớ `O(1)`.

## Câu hỏi follow-up thường gặp

- *Nếu `h < n` thì sao?* Không có đáp án – trả về −1 hoặc kiểm tra trước.
- *Tràn số?* `Σ ceil(p/k)` có thể vượt int 32 bit khi k nhỏ ⇒ dùng long hoặc dừng sớm khi vượt `h`.
- *Cải thiện cận dưới?* `lo = max(1, ceil(Σp / h))`.
- *Nếu Koko được chuyển sang đống khác trong cùng một giờ?* Khi đó tổng giờ = `ceil(Σp / k)` ⇒ công thức đóng, không cần binary search.
- *Tìm tốc độ lớn nhất thỏa điều kiện khác (true…false)?* Đổi `mid` làm tròn lên, `lo = mid` / `hi = mid − 1`.
- *Chứng minh vòng lặp dừng?* `lo ≤ mid < hi` nên mỗi nhánh thu khoảng ít nhất 1.

## Checklist nhận diện pattern

- Đề hỏi **"giá trị nhỏ nhất / lớn nhất sao cho …"** (min speed, min capacity, max distance).
- Kiểm tra một giá trị cố định thì **dễ** (thường tham lam O(n)).
- Có **tính đơn điệu**: nếu x thỏa thì mọi x lớn hơn (hoặc nhỏ hơn) cũng thỏa.
- Miền đáp án lớn (đến 10⁹) khiến duyệt tuyến tính không khả thi.
- Từ khóa: "minimize the maximum", "maximize the minimum", "within D days / h hours".

## Bài luyện tập

- LC 875 – Koko Eating Bananas (Medium)
- LC 1011 – Capacity To Ship Packages Within D Days (Medium)
- LC 1482 – Minimum Number of Days to Make m Bouquets (Medium)
- LC 1283 – Find the Smallest Divisor Given a Threshold (Medium)
- LC 410 – Split Array Largest Sum (Hard)
- LC 2226 – Maximum Candies Allocated to K Children (Medium)
