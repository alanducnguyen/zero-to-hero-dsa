## Kịch bản trình bày (5–7 phút)

1. **Làm rõ đề** (30s): đáp án duy nhất? thứ tự output? dữ liệu có vừa bộ nhớ không?
2. **Bước chung** (30s): "Dù cách nào cũng phải đếm tần suất bằng HashMap – O(n). Bài toán còn lại là chọn k khoá có count lớn nhất."
3. **Sort** (30s): "Sắp xếp các entry theo count giảm dần, lấy k đầu – O(n log n). Đúng nhưng làm thừa: không cần thứ tự của phần bị loại."
4. **Heap** (1 phút): "Min-heap kích thước k: đỉnh là ứng viên yếu nhất, vượt k thì pop – O(n log k). Min chứ không phải max, vì thứ cần loại nhanh là kẻ yếu nhất."
5. **Nhận xét then chốt → bucket** (1 phút): "Count chỉ nằm trong [1, n] ⇒ dùng count làm chỉ số: buckets[c] chứa các giá trị gặp đúng c lần. Quét từ n xuống ⇒ O(n), phá được chặn O(n log n) của sắp xếp so sánh."
6. **Code bucket** (2 phút), nêu điểm dừng sớm khi đủ k và vì sao mảng có n + 1 ô.
7. **Phân tích + tradeoff** (30s): bucket O(n) cần toàn bộ dữ liệu; heap O(n log k) chạy online với O(k) cho phần chọn.

## Follow-up thường gặp

- **Streaming top-k** (luồng vô hạn, hỏi top-k bất kỳ lúc nào): HashMap đếm + min-heap k phần tử; khi count của một khoá tăng, cập nhật trong heap (cần indexed heap) hoặc chấp nhận heap "lười" và kiểm tra lại khi pop. Bucket không dùng được vì count không bị chặn trước.
- **Số khoá quá lớn để giữ HashMap đầy đủ** (top hashtag, top IP trên router): **Count-Min Sketch** – d hàng × w cột bộ đếm, mỗi khoá tăng d ô theo d hàm hash, ước lượng = min của d ô (chỉ đếm dư, không đếm thiếu), bộ nhớ O(w·d) cố định – ghép với min-heap k phần tử để giữ heavy hitters. Phương án khác: Misra-Gries / Space-Saving với đúng k bộ đếm.
- **Dữ liệu chia trên nhiều máy**: top-k cục bộ của từng máy rồi gộp là **sai** nếu cùng một khoá nằm ở nhiều máy (khoá xếp thứ k + 1 ở mọi máy có thể đứng đầu toàn cục). Đúng: shard theo **hash của khoá** để mỗi khoá chỉ ở một máy, rồi mới gộp top-k cục bộ (MapReduce).
- **Top K Frequent Words (692)**: hoà count phá bằng thứ tự từ điển ⇒ comparator của heap phải đảo cả hai tiêu chí; bucket phải sort trong từng bucket.
- **Có hoà tại ranh giới thứ k?** Nêu rõ quy tắc phá hoà; bucket xử lý bằng cách sort trong bucket cuối cùng được lấy.
- **Quickselect trên entries?** O(m) trung bình, O(m²) worst – một lựa chọn rank ngang bucket khi điểm không phải số nguyên nhỏ.
- **Sliding window top-k** (top-k trong N sự kiện gần nhất): HashMap đếm + giảm count khi phần tử rời cửa sổ, kết hợp TreeMap theo (count, key) để lấy top-k O(k log m).
