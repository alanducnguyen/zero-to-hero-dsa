## Kịch bản trình bày (8–10 phút)

1. **Làm rõ đề** (1 phút): trả giá trị hay chỉ số? "trùng" nghĩa là trùng tập giá trị? được sắp xếp mảng không? Hỏi câu cuối rất quan trọng – nó mở khoá two pointers.
2. **Brute force** (30s): "Thử mọi bộ ba O(n³), sắp xếp từng bộ ba làm khoá để Set loại trùng. n = 3000 thì ~4.5·10⁹ – quá chậm." Không cần code.
3. **Giảm về Two Sum** (1 phút): "Cố định nums[i], phần còn lại là Two Sum với target −nums[i]. Two Sum có HashSet O(n) ⇒ tổng O(n²)." Nêu ngay điểm yếu: vẫn phải dùng Set khoá chuỗi để khử trùng.
4. **Nhận xét then chốt** (1 phút): "Đã O(n²) thì sort O(n log n) là miễn phí. Sau khi sort: tổng đơn điệu ⇒ two pointers thay hash; giá trị trùng nằm cạnh nhau ⇒ khử trùng bằng cách bỏ qua, không cần Set."
5. **Code sort + two pointers** (3 phút): nói rõ ba chỗ khử trùng – `a[i] === a[i-1]` ở vòng ngoài, hai vòng `while` sau khi tìm được đáp án – và dừng sớm khi `a[i] > 0`.
6. **Chạy tay** (1 phút) trên `[-2, 0, 0, 2, 2]`: chỉ ra vì sao không sinh `[-2, 0, 2]` hai lần.
7. **Phân tích** (30s): O(n²) thời gian, O(1) phụ ngoài sort (sort của ngôn ngữ có thể tốn O(log n)–O(n)).

## Lỗi hay gặp khi code

- Khử trùng vòng ngoài bằng `a[i] === a[i+1]` (so với phần tử *sau*) ⇒ bỏ sót `[-1, -1, 2]` vì bỏ qua -1 đầu tiên trước khi kịp dùng cả hai.
- Quên `l++; r--` sau khi nhảy trùng ⇒ vòng lặp vô hạn.
- Vòng ngoài chạy tới `n` thay vì `n − 2` ⇒ không sai nhưng thừa; ngược lại `while (l < r)` mà viết `l <= r` ⇒ dùng một phần tử hai lần.

## Follow-up thường gặp

- **3Sum Closest (LC 16)?** Cùng khung two pointers, theo dõi `|sum − target|` nhỏ nhất; HashSet không làm được.
- **3Sum Smaller (LC 259)?** Khi `sum < target`, mọi `r' ∈ (l, r]` đều thoả ⇒ cộng `r − l` rồi tiến l. O(n²).
- **4Sum (LC 18)?** Thêm một vòng cố định ⇒ O(n³); tổng quát kSum đệ quy về 2Sum. Cẩn thận tràn số với giá trị lớn.
- **Trả chỉ số, không được sort?** HashSet mỗi i, hoặc sort mảng chỉ số theo giá trị.
- **Mảng cực lớn, nhiều trùng?** Đếm tần suất theo giá trị, duyệt cặp giá trị phân biệt `x ≤ y`, kiểm tra `z = −x−y ≥ y` và đủ số lượng.
- **Có thể nhanh hơn O(n²) không?** 3SUM là bài toán kinh điển được tin là không có thuật toán O(n^(2−ε)) – nêu được điều này là điểm cộng.
