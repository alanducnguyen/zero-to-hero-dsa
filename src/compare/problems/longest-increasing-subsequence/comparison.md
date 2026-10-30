## Phân tích

**Đệ quy lấy/bỏ** duyệt mọi dãy con: mỗi phần tử hoặc bỏ, hoặc lấy nếu lớn hơn phần tử lấy trước. Với mảng tăng dần mọi nhánh đều hợp lệ ⇒ đúng 2ⁿ lá. Giá trị thật sự: nó lộ ra **trạng thái** `(i, prev)` – chỉ có O(n²) cặp, nên memo hoá là thành O(n²).

**DP O(n²)** đổi góc nhìn: `dp[i]` = LIS **kết thúc đúng tại i**. Ràng buộc "kết thúc tại i" là mấu chốt – nhờ biết phần tử cuối là `nums[i]`, ta mới kiểm tra được có nối thêm được không. `dp[i] = 1 + max dp[j]` với `j < i`, `nums[j] < nums[i]`; đáp án là `max dp` (LIS có thể kết thúc ở bất kỳ đâu). **Khôi phục dãy thật** rất dễ: lưu `parent[i] = j` khi cập nhật rồi lần ngược từ chỉ số có dp lớn nhất.

**Patience sorting** giữ `tails[k]` = phần tử cuối **nhỏ nhất** trong mọi dãy tăng dài `k + 1` đã thấy. Bất biến: `tails` tăng ngặt (nếu đuôi của dãy dài k+2 nhỏ hơn hoặc bằng đuôi dãy dài k+1, cắt bớt nó sẽ cho dãy dài k+1 có đuôi nhỏ hơn – mâu thuẫn). Nhờ tăng ngặt nên tìm nhị phân `lower_bound(x)`: nếu vượt mọi đuôi thì nối dài, không thì thay đuôi đó bằng `x` nhỏ hơn (tham lam: đuôi nhỏ hơn không bao giờ tệ hơn). Mỗi phần tử O(log n) ⇒ O(n log n).

Cái bẫy: `tails` **không phải** một LIS. Với `[3, 4, 5, 1]`, kết thúc `tails = [1, 4, 5]` – không phải dãy con hợp lệ (1 đứng sau 5), nhưng độ dài 3 vẫn đúng. Muốn dãy thật phải lưu chỉ số trong `tails` và `parent[i]` = chỉ số đứng ở `tails[lo − 1]` lúc chèn.

## Xếp hạng

1. **Patience sorting + nhị phân** – O(n log n) / O(n). Đáp án tối ưu khi chỉ cần độ dài.
2. **DP O(n²)** – O(n²) / O(n). Đơn giản, khôi phục dãy và mở rộng biến thể dễ nhất.
3. **Đệ quy lấy/bỏ** – O(2ⁿ). Chỉ để mở đầu.

## Khi nào thứ hạng đổi

- **n ≤ vài nghìn và cần dãy thật / đếm số LIS (LC 673)**: DP O(n²) thắng vì đơn giản và mở rộng tự nhiên; patience đếm được nhưng cần Fenwick/segment tree.
- **Điều kiện so sánh không phải thứ tự toàn phần** (ví dụ Largest Divisible Subset – chia hết): chỉ DP O(n²) áp dụng được, vì không có bất biến sắp xếp để tìm nhị phân.
- **Russian Doll Envelopes (LC 354)**: sắp theo rộng tăng, cao giảm, rồi patience trên chiều cao – O(n log n) bắt buộc với n = 10⁵.
- **Dãy không giảm**: đổi `lower_bound` thành `upper_bound` (`tails[mid] ≤ x` ⇒ đi phải). Nhầm chỗ này là lỗi phổ biến nhất.
