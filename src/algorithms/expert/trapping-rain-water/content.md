## Bài toán

Cho mảng `height` biểu diễn độ cao các cột rộng 1. Sau cơn mưa, tính tổng lượng nước đọng lại giữa các cột.

`[0,1,0,2,1,0,1,3,2,1,2,1]` → 6. `[4,2,0,3,2,5]` → 9.

Trapping Rain Water (LeetCode 42, Hard) là bài được hỏi nhiều nhất trong nhóm Hard vì có **ba lời giải đẹp** (prefix max, monotonic stack, hai con trỏ) và lời giải tốt nhất chỉ 15 dòng.

## Ý tưởng / Trực giác

Nước tại cột `i` cao tới mức nào? Bị chặn bởi bức tường cao nhất bên trái và bức tường cao nhất bên phải:

`water[i] = min(maxLeft[i], maxRight[i]) − height[i]` (nếu dương).

Tính hai mảng prefix max và suffix max cho O(n)/O(n). Để xuống O(1) bộ nhớ, dùng **hai con trỏ**: nếu `height[left] < height[right]` thì chắc chắn `rightMax ≥ height[right] > height[left]`... chính xác hơn, bên phải có tường ≥ `height[right]`, trong khi mức nước tại `left` là `min(leftMax, maxRight thật)`. Vì `maxRight thật ≥ height[right] > height[left]` và ta chỉ xử lý khi `leftMax ≤ rightMax` (bất biến), mức nước tại `left` bằng `leftMax − height[left]` – không cần biết bên phải chính xác. Đối xứng cho phía phải.

## Thuật toán từng bước

1. `left = 0`, `right = n−1`, `leftMax = rightMax = water = 0`.
2. Khi `left < right`: nếu `height[left] < height[right]`: `leftMax = max(leftMax, height[left])`, `water += leftMax − height[left]`, `left++`. Ngược lại làm tương tự với `right`.
3. Trả về `water`.

Ở tab **Debug**, hai con trỏ L/R, cột cyan là cột có nước đọng, cột xanh lá là tường (không đọng); bảng trạng thái cho thấy leftMax/rightMax và tổng.

## Chứng minh đúng

Bất biến: khi xử lý bên trái (`height[left] < height[right]`), ta có `rightMax ≥ height[right] > height[left]`, và `leftMax` là max của `height[0..left]`. Cần chứng minh `min(maxLeft[left], maxRight[left]) = leftMax` khi `leftMax ≤ rightMax`... Lập luận chuẩn: thuật toán chỉ di chuyển con trỏ nhỏ hơn. Gọi `M_R` = max thật của `height[left..n−1]` ≥ `height[right]`. Khi `height[left] < height[right]`: nếu `leftMax ≤ height[right]` thì `min(leftMax, M_R) = leftMax` ⇒ công thức đúng. Nếu `leftMax > height[right]`: điều này không thể xảy ra đồng thời với việc con trỏ phải chưa bị đẩy qua tường ≥ leftMax... Phiên bản gọn và chặt hơn: xét điều kiện `leftMax < rightMax` thay vì so `height` (biến thể tương đương); khi `leftMax < rightMax`, mọi phần tử bên phải `right` đều ≤ `rightMax`... và tồn tại tường `rightMax` bên phải ⇒ `maxRight[left] ≥ rightMax > leftMax` ⇒ `min = leftMax`. Phiên bản so `height[left] < height[right]` tương đương vì `leftMax ≤ rightMax` luôn đúng sau mỗi bước ở nhánh đó (quy nạp).

Mỗi cột được tính đúng một lần (khi con trỏ đi qua), tổng chính là đáp án.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ |
|---|---|---|
| Hai con trỏ | O(n) | O(1) |
| Prefix max + suffix max | O(n) | O(n) |
| Monotonic stack | O(n) | O(n) |
| Brute force (max trái/phải mỗi cột) | O(n²) | O(1) |

## Tradeoff

- Hai con trỏ tối ưu nhưng chứng minh khó nhất; phỏng vấn nên trình bày prefix/suffix trước rồi tối ưu.
- Stack tính nước theo **lớp ngang**, tự nhiên khi dữ liệu đến dần và cần biết "hố" nào vừa đầy.
- Prefix/suffix dễ hiểu, dễ mở rộng (vd: cột có độ rộng khác nhau).

## Lợi / Hại

**Lợi:** O(n)/O(1); khung "min của hai max" dùng lại cho Container With Most Water, Product of Array Except Self (tiền tố/hậu tố). **Hại:** không mở rộng trực tiếp sang 2D (Trapping Rain Water II cần heap + BFS từ biên).

## Use case thực tế

- Mô phỏng thuỷ văn/địa hình đơn giản: thể tích nước đọng trên mặt cắt (1D) hoặc DEM (2D).
- Tính dung lượng "hố" trong biểu đồ tải/giá: khoảng trống giữa hai đỉnh.
- Xử lý ảnh: lấp đầy vùng lõm (morphological filling) trên histogram.
- Phân tích skyline/đồ thị cột: phần "âm" giữa các cực đại.

## Lỗi thường gặp

- Dùng `height[left] <= height[right]` hay `<` đều đúng, nhưng đổi `leftMax`/`rightMax` sai nhánh thì sai.
- Quên cập nhật `leftMax` trước khi cộng nước ⇒ nước âm.
- Prefix/suffix: lấy `maxLeft[i]` không bao gồm `height[i]` rồi quên `max(0, …)`.
- Với stack: tính độ rộng `i − stack.top − 1` sai một đơn vị.

## Biến thể

- **Container With Most Water (11):** hai con trỏ, nhưng tối ưu `min(h[l], h[r]) · (r − l)`.
- **Trapping Rain Water II (407):** 2D, min-heap bắt đầu từ biên, BFS vào trong.
- **Cột có độ rộng:** nhân `water[i]` với `width[i]`.
- **Luồng dữ liệu (online):** monotonic stack cho phép tính dần khi cột mới đến.
- **Hỏi vị trí/độ sâu hố lớn nhất:** giữ `water[i]` thay vì tổng.
