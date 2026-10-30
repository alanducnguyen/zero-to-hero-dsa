## Kịch bản trình bày (5–7 phút)

1. **Làm rõ đề** (30s): Koko không chuyển đống giữa giờ ⇒ giờ cho một đống là ⌈p/k⌉. h ≥ n nên luôn có đáp án.
2. **Brute force** (30s): "Thử k = 1, 2, … tới khi kịp. Đáp án ≤ max nên O(n · max) – với max = 10⁹ là TLE."
3. **Nhận xét then chốt** (1 phút): "k càng lớn thì giờ càng ít ⇒ vị từ 'kịp với k' đơn điệu. Tìm k nhỏ nhất làm vị từ đúng = binary search trên đáp án."
4. **Code** (2 phút): khung `while (lo < hi)`, `hi = mid` khi kịp, `lo = mid + 1` khi không. Giải thích vì sao giữ `mid` ở nhánh kịp.
5. **Phân tích** (30s): O(n log max), O(1) bộ nhớ.
6. **Tối ưu thêm (nếu còn thời gian)**: lo = ⌈sum/h⌉, hi = ⌈sum/(h − n)⌉ – và tự nói rõ đây chỉ là tối ưu hằng số.

## Follow-up thường gặp

- **Vì sao vòng lặp chắc chắn dừng và đúng?** Bất biến: đáp án luôn trong [lo, hi]; mỗi vòng khoảng co ít nhất 1 vì mid < hi.
- **Tràn số?** Trong Java/C++ tổng giờ có thể vượt int (10⁴ đống × 10⁹) ⇒ dùng long hoặc dừng sớm khi hours > h. Trong JS số an toàn tới 2⁵³ nên ổn.
- **Cận chặt có đổi Big-O không?** Không – worst case h = n khoảng vẫn Θ(max). Trả lời thẳng thắn được đánh giá cao hơn khoe tối ưu giả.
- **Cùng khung:** Capacity To Ship Packages (1011), Split Array Largest Sum (410), Minimum Days to Make m Bouquets (1482), Magnetic Force Between Two Balls (1552) – chỉ khác vị từ và cận.
- **Tốc độ là số thực?** Binary search trên số thực với số vòng cố định (vd 100) hoặc tới khi hi − lo < ε.

## Checklist nhận diện "binary search on answer"

- Đề hỏi giá trị **nhỏ nhất/lớn nhất** thoả một điều kiện.
- Kiểm tra *một* ứng viên dễ (O(n)), còn tìm trực tiếp thì khó.
- Điều kiện đơn điệu theo ứng viên.
- Biết cận dưới/cận trên hiển nhiên của đáp án.
