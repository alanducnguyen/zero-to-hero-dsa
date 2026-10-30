## Phân tích

Trung vị chia mảng gộp thành hai nửa bằng nhau: **mọi phần tử nửa trái ≤ mọi phần tử nửa phải**. Bốn cách khác nhau ở việc có dựng mảng gộp hay không, và tìm "đường chia" nhanh tới đâu.

**Nối rồi sort**: O((m+n) log(m+n)). Bỏ phí thông tin đã sắp xếp, nhưng là oracle hoàn hảo để test.

**Merge**: bước trộn của merge sort cho mảng gộp trong O(m+n). Ổn nếu bạn cần cả mảng, nhưng nửa sau được trộn vô ích và tốn O(m+n) bộ nhớ.

**Đi nửa đường**: chỉ chạy ⌊(m+n)/2⌋ + 1 bước merge, nhớ `prev` và `cur`. O(m+n) thời gian, O(1) bộ nhớ. Đây là lời giải tuyến tính tốt nhất và chạy được trên hai stream – nhưng vẫn **không đạt O(log)**.

**Binary search vị trí cắt**: nửa trái gồm `i` phần tử đầu của mảng ngắn `a` và `j = half − i` phần tử đầu của `b`. Vì từng mảng đã sắp xếp, điều kiện hợp lệ chỉ còn hai phép so sánh chéo: `a[i−1] ≤ b[j]` và `b[j−1] ≤ a[i]`. Nếu `a[i−1] > b[j]` thì lấy quá nhiều từ a (giảm i), ngược lại tăng i – tính đơn điệu cho phép binary search. Tìm trên mảng ngắn nên O(log min(m,n)), và j luôn trong [0, n].

## Xếp hạng

1. **Binary search vị trí cắt** – O(log min(m,n))/O(1). Đáp án đề yêu cầu.
2. **Đi nửa đường** – O(m+n)/O(1). Chọn khi dữ liệu là stream hoặc cần lời giải ít rủi ro.
3. **Merge** – O(m+n)/O(m+n). Khi cần mảng gộp cho việc khác.
4. **Nối rồi sort** – O((m+n) log(m+n)). Chỉ làm oracle.

## Khi nào thứ hạng đổi

- **m, n nhỏ (vài chục)**: khác biệt không đo được; bản tuyến tính ít bug hơn đáng kể.
- **Dữ liệu là iterator/stream** (file đã sắp xếp trên đĩa): không truy cập ngẫu nhiên ⇒ đi nửa đường là tốt nhất.
- **Tìm phần tử thứ k bất kỳ**: biến thể "k-th element" (mỗi bước loại k/2 phần tử) O(log k) tổng quát hơn vị trí cắt.
- **Nhiều mảng / stream liên tục thêm phần tử**: dùng hai heap (Find Median from Data Stream) hoặc binary search trên giá trị.
