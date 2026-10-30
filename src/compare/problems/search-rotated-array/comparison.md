## Phân tích

**Quét tuyến tính** đúng trong mọi trường hợp – kể cả mảng có trùng hay không sắp xếp – nhưng bỏ phí toàn bộ thông tin "sắp xếp rồi xoay". O(n) là thứ người phỏng vấn muốn bạn vượt qua; nó chỉ có ích để chốt định nghĩa bài và làm oracle khi test.

**Tìm pivot + binary search** chia bài thành hai bài quen thuộc:
1. *Tìm min trong mảng xoay* (LC 153): so `nums[mid]` với `nums[hi]`. Nếu `nums[mid] > nums[hi]` thì "vách" nằm trong `(mid, hi]` ⇒ `lo = mid + 1`; ngược lại `[mid, hi]` tăng dần nên min ở `[lo, mid]` ⇒ `hi = mid`. Vòng `lo < hi` dừng khi `lo` là pivot.
2. Từ pivot biết hai đoạn tăng dần; so `target` với `[nums[pivot], nums[n−1]]` để chọn đoạn, rồi binary search chuẩn.

Ưu điểm lớn là **dễ chứng minh đúng**: mỗi lượt có một bất biến đơn giản. Nhược điểm: ~2 log n bước, và hai vòng có điều kiện dừng khác nhau (`lo < hi` với `hi = mid` so với `lo <= hi` với `hi = mid − 1`) – trộn nhầm là vòng lặp vô hạn hoặc bỏ sót.

**Binary search một lượt** dựa trên nhận xét: với mọi `mid`, **ít nhất một trong hai nửa `[lo, mid]` và `[mid, hi]` tăng dần** (vách xoay chỉ nằm ở tối đa một nửa). So `nums[lo] <= nums[mid]` cho biết nửa trái có tăng dần không. Với nửa tăng dần, kiểm tra `target` có nằm trong khoảng giá trị của nó chỉ cần hai phép so sánh; nếu có thì vào nửa đó, nếu không thì chắc chắn ở nửa kia. Mỗi bước loại một nửa ⇒ log n bước, một vòng duy nhất.

## Bảng so sánh nhanh

| | Quét tuyến tính | Pivot + binary search | Một lượt |
|---|---|---|---|
| Thời gian | O(n) | O(log n), ~2 log n bước | O(log n), ~log n bước |
| Bộ nhớ | O(1) | O(1) | O(1) |
| Worst case | target không có ⇒ n bước | luôn ~2 log n | luôn ~log n |
| Có phần tử trùng (LC 81) | vẫn đúng | tìm pivot suy biến O(n) | cần thêm nhánh `lo++`, worst O(n) |
| Độ khó code | Rất dễ | Trung bình – hai bất biến | Khó nhất – 4 nhánh, dễ sai `<` / `≤` |

## Xếp hạng

1. **Binary search một lượt** – O(log n), một vòng. Đáp án mong đợi.
2. **Pivot + binary search** – cùng O(log n) nhưng hai lượt. Hoàn toàn chấp nhận được trong phỏng vấn, đặc biệt nếu bạn tự tin hơn với nó.
3. **Quét tuyến tính** – O(n), vi phạm yêu cầu đề.

## Khi nào thứ hạng đổi

- **Nhiều truy vấn** trên cùng một mảng ⇒ tìm pivot một lần O(log n), mỗi truy vấn chỉ còn một binary search chuẩn – pivot + binary search thắng về độ rõ ràng, hằng số tương đương.
- **Có phần tử trùng** (LC 81) ⇒ cả hai cách binary search đều suy biến O(n) worst case (vd `[1,1,1,1,0,1,1]`); khi đó quét tuyến tính đơn giản mà không thua về bậc.
- **Đề hỏi thêm số lần xoay / giá trị min** ⇒ pivot là sản phẩm phụ miễn phí của cách 2.
- n rất nhỏ (≤ ~32) ⇒ quét tuyến tính thường nhanh hơn trên thực tế nhờ không rẽ nhánh khó đoán.
