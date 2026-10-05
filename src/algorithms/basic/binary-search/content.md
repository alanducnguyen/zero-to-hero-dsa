## Bài toán

Cho mảng `a` gồm `n` số **đã sắp xếp tăng dần** và giá trị `target`. Trả về chỉ số của `target` trong mảng, hoặc `-1` nếu không có.

Binary Search là thuật toán được hỏi nhiều nhất ở vòng phone screen của Google và Meta, không phải vì nó khó mà vì **rất dễ viết sai** (Jon Bentley từng cho 200 lập trình viên chuyên nghiệp viết Binary Search, 90% có bug). Người phỏng vấn muốn thấy bạn xử lý biên (`lo <= hi` hay `lo < hi`? `mid + 1` hay `mid`?) một cách có hệ thống chứ không đoán mò.

## Ý tưởng / Trực giác

Hãy nghĩ tới trò "đoán số từ 1 đến 100": mỗi lần đoán số ở giữa, người đố nói "lớn hơn" hay "nhỏ hơn", bạn loại ngay một nửa. Chỉ cần 7 lần đoán (2⁷ = 128 > 100).

Với mảng sắp xếp, so sánh `target` với phần tử giữa `a[mid]`:
- bằng ⇒ xong;
- `a[mid] < target` ⇒ tất cả phần tử bên trái `mid` (kể cả `mid`) đều nhỏ hơn target ⇒ bỏ hết nửa trái;
- ngược lại bỏ nửa phải.

Mỗi bước giảm kích thước khoảng tìm kiếm **ít nhất một nửa** ⇒ tối đa ⌈log₂(n+1)⌉ bước.

## Thuật toán từng bước

1. `lo = 0`, `hi = n - 1` – khoảng đóng `[lo, hi]` là vùng có thể chứa target.
2. Khi `lo <= hi`:
   - `mid = lo + ⌊(hi - lo) / 2⌋`.
   - Nếu `a[mid] === target` trả về `mid`.
   - Nếu `a[mid] < target` thì `lo = mid + 1`, ngược lại `hi = mid - 1`.
3. Thoát vòng lặp ⇒ trả về `-1`.

Mở tab **Debug**, chọn preset "Không tồn tại" và quan sát vùng màu xám (đã loại) lớn dần sau mỗi bước, cho đến khi `lo` vượt `hi`.

## Chứng minh đúng

**Bất biến vòng lặp:** nếu `target` có trong mảng thì nó nằm trong `a[lo..hi]`.

- **Khởi tạo:** `[0, n-1]` là cả mảng – đúng.
- **Duy trì:** Nếu `a[mid] < target`, vì mảng tăng dần nên `a[lo..mid]` đều `< target` ⇒ loại an toàn, target (nếu có) nằm trong `[mid+1, hi]`. Đối xứng cho trường hợp còn lại.
- **Kết thúc:** Vòng lặp dừng khi tìm thấy (đúng) hoặc `lo > hi` – khoảng rỗng ⇒ theo bất biến, target không tồn tại ⇒ trả `-1` đúng.

**Dừng chắc chắn:** mỗi vòng lặp `hi - lo` giảm ít nhất 1 (vì `lo ≤ mid ≤ hi` và ta đặt `lo = mid+1` hoặc `hi = mid-1`), nên không bao giờ lặp vô hạn. Đây là bug kinh điển khi dùng `lo = mid` thay vì `mid + 1`.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian tốt nhất | O(1) | Trúng `mid` ngay bước đầu |
| Thời gian xấu nhất | O(log n) | Mỗi bước giảm nửa: n → n/2 → n/4 → … → 1 |
| Bộ nhớ | O(1) | Phiên bản lặp. Phiên bản đệ quy tốn O(log n) stack |

Với n = 1 tỷ phần tử, chỉ cần ~30 lần so sánh. Đó là lý do mọi DB index, mọi `std::lower_bound`, `Array.prototype` trong V8 (khi mảng sắp xếp) đều dựa trên nó.

## Tradeoff

- **Yêu cầu dữ liệu sắp xếp:** nếu phải sắp xếp trước (O(n log n)) chỉ để tìm 1 lần, Linear Search O(n) rẻ hơn. Binary Search thắng khi tìm **nhiều lần** trên cùng dữ liệu.
- **Yêu cầu truy cập ngẫu nhiên O(1):** trên linked list không dùng được (mỗi bước nhảy tới `mid` tốn O(n)).
- **Mảng tĩnh ↔ cập nhật thường xuyên:** chèn/xoá vào mảng sắp xếp tốn O(n). Nếu dữ liệu thay đổi liên tục, dùng BST cân bằng / B-tree (vẫn là "binary search" nhưng trên cây).
- **Cache:** với n nhỏ (< ~64) Linear Search thường nhanh hơn thực tế vì truy cập tuần tự tận dụng cache line, không có branch misprediction.

## Lợi / Hại

**Lợi**
- Cực nhanh, O(log n), bộ nhớ O(1).
- Nền tảng cho hàng chục biến thể: tìm biên trái/phải, tìm trên "không gian câu trả lời", tìm trên hàm đơn điệu.

**Hại**
- Nhiều chi tiết dễ sai: điều kiện dừng, cập nhật `lo`/`hi`, tràn số, mảng rỗng.
- Chỉ áp dụng khi có tính **đơn điệu** (monotonic) – bạn phải nhận ra tính chất này trong bài toán.

## Use case thực tế

- **Database index (B-tree):** mỗi node là mảng key sắp xếp, tìm trong node bằng binary search.
- **Git bisect:** tìm commit gây bug trong lịch sử – binary search trên trục thời gian với hàm đơn điệu "có bug / chưa có bug".
- **Rate limiting, time-series:** tìm vị trí timestamp trong mảng log đã sắp xếp (`lower_bound`).
- **Hệ thống phân tán:** consistent hashing tìm node kế tiếp trên vòng băm bằng binary search trên danh sách hash sắp xếp.
- **Game / đồ họa:** tìm keyframe trong animation timeline.
- **Tối ưu tham số:** "tốc độ ăn chuối nhỏ nhất để kịp giờ" (LeetCode 875) – binary search trên câu trả lời.

## Lỗi thường gặp

1. `while (lo < hi)` với khoảng đóng `[lo, hi]` ⇒ bỏ sót trường hợp 1 phần tử.
2. `lo = mid` thay vì `mid + 1` ⇒ lặp vô hạn khi `hi = lo + 1`.
3. `(lo + hi) / 2` tràn số trong Java/C++ khi `lo + hi > 2³¹` (trong JS không tràn nhưng hãy viết đúng thói quen).
4. Quên mảng chưa sắp xếp – binary search trên mảng không sắp xếp cho kết quả sai nhưng không báo lỗi.
5. Nhầm giữa "tìm bất kỳ vị trí" và "tìm vị trí **đầu tiên**" khi có phần tử trùng.

## Biến thể

- **Lower bound / Upper bound:** vị trí đầu tiên ≥ target / > target. Dùng khoảng nửa mở `[lo, hi)`, `while (lo < hi)`, `hi = mid` khi `a[mid] >= target`. Đây là dạng *quan trọng nhất* trong phỏng vấn.
- **Binary search trên câu trả lời:** khi bài toán hỏi "giá trị nhỏ nhất thoả điều kiện" và điều kiện đơn điệu theo giá trị (Koko Eating Bananas, Split Array Largest Sum).
- **Mảng xoay (rotated):** xác định nửa nào đang sắp xếp để quyết định đi hướng nào.
- **Exponential search:** khi không biết n (stream vô hạn), nhân đôi `hi` tới khi vượt target rồi binary search.
- **Interpolation search:** đoán `mid` theo tỉ lệ giá trị, O(log log n) với dữ liệu phân bố đều.
