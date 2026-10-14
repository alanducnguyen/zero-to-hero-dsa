## Phân tích

**HashMap đếm** là lời giải "nghĩ ra ngay": O(n) thời gian, nhưng O(n) bộ nhớ trong trường hợp xấu (nhiều giá trị phân biệt). Có thể dừng sớm khi một count vượt n/2. Ưu điểm lớn: không cần giả định đa số tồn tại – bạn biết chính xác tần suất.

**Sort** dùng một nhận xét đẹp: dải của phần tử đa số dài hơn n/2 nên luôn phủ vị trí giữa. O(n log n) nhưng O(1) bộ nhớ nếu sort tại chỗ, và code 2 dòng. Nó cũng mở đường cho các bài "phần tử > n/k" trên mảng đã sắp xếp.

**Boyer-Moore Voting** đạt cả hai: O(n) thời gian, O(1) bộ nhớ, một lượt, chạy trên luồng. Cái giá là chứng minh không hiển nhiên và nó **phụ thuộc giả định** đa số tồn tại; nếu không chắc, phải thêm lượt đếm xác minh (vẫn O(n)/O(1)).

## Xếp hạng

1. **Boyer-Moore** – O(n)/O(1). Đáp án mong đợi khi đề đảm bảo đa số tồn tại.
2. **HashMap đếm** – O(n)/O(n). Chọn khi cần tần suất thật hoặc không có giả định.
3. **Sort** – O(n log n)/O(1). Chọn khi mảng đã (hoặc sẽ) được sắp xếp, hoặc muốn code tối giản.

## Khi nào thứ hạng đổi

- Không đảm bảo đa số tồn tại ⇒ Boyer-Moore + xác minh vẫn hạng 1; HashMap là lựa chọn an toàn nếu bạn không muốn chứng minh.
- Mảng đã sắp xếp ⇒ `nums[n/2]` O(1), không cần thuật toán nào.
- Hỏi phần tử > n/3 ⇒ Boyer-Moore 2 ứng viên (Misra-Gries) vẫn O(1); HashMap vẫn đúng với O(n).
