## Phân tích

**Đệ quy thuần** mô hình hoá thẳng quyết định ở nhà `i`: bỏ ⇒ `rob(i+1)`, cướp ⇒ `nums[i] + rob(i+2)`. Đúng nhưng mỗi lời gọi sinh hai lời gọi, và các nhánh chồng lấn nhau: `rob(i+2)` được gọi cả từ nhánh "bỏ" của `i` (qua `i+1`) lẫn nhánh "cướp". Số lời gọi tăng như Fibonacci ⇒ O(φⁿ). Tab Debug cho thấy với 5 nhà đã có 25 lời gọi cho chỉ 6 bài con khác nhau.

**Memo (top-down)** nhận ra `rob(i)` chỉ phụ thuộc `i` ⇒ có đúng n trạng thái. Lưu vào `Map` ⇒ O(n) thời gian. Nhược điểm còn lại là đệ quy: stack sâu n tầng, JS mặc định tràn khoảng 10⁴ tầng, và `Map` chậm hơn mảng vài lần.

**Bottom-up mảng dp** lật thứ tự: `dp[i]` = tốt nhất với `i` nhà đầu, tính từ trái sang phải để mọi giá trị cần dùng đã có sẵn. Không còn đệ quy, bảng dp còn giúp **truy vết** nhà nào được chọn (đi ngược: nếu `dp[i] ≠ dp[i−1]` thì nhà `i−1` được cướp).

**Hai biến** quan sát rằng công thức chỉ đọc `dp[i−1]` và `dp[i−2]` ⇒ chỉ cần giữ hai số. O(1) bộ nhớ, 5 dòng code – đáp án mà interviewer chờ.

## Xếp hạng

1. **Hai biến** – O(n)/O(1). Mặc định khi chỉ cần tổng.
2. **Bottom-up mảng dp** – O(n)/O(n). Chọn khi cần in ra các nhà được chọn.
3. **Memo** – O(n)/O(n) + stack. Hữu ích như bước trung gian, hoặc khi biến thể có trạng thái phức tạp.
4. **Đệ quy thuần** – O(φⁿ). Chỉ để dẫn dắt.

## Tradeoff chi tiết

| Tiêu chí | Đệ quy | Memo | Mảng dp | Hai biến |
|---|---|---|---|---|
| Độ sâu stack | n | n | 1 | 1 |
| Bộ nhớ phụ | O(n) stack | O(n) Map + stack | O(n) mảng | O(1) |
| Truy vết lời giải | khó | được (từ memo) | dễ | không |
| Độ dễ đọc | rất dễ | dễ | trung bình | cần giải thích |

## Khi nào thứ hạng đổi

- **Cần danh sách nhà** ⇒ mảng dp lên hạng 1 vì hai biến làm mất thông tin.
- **Vòng tròn (House Robber II)** ⇒ chạy hàm hai biến hai lần trên `nums[0..n−2]` và `nums[1..n−1]`.
- **Trên cây (House Robber III)** ⇒ không có thứ tự tuyến tính để bottom-up; dùng DFS trả về cặp `(cướp, không cướp)` – tinh thần của memo/top-down thắng.
- **Delete and Earn** ⇒ gom tiền theo giá trị rồi chạy đúng thuật toán hai biến.
