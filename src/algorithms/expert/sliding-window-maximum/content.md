## Bài toán

Cho mảng `nums` và cửa sổ độ dài `k` trượt từ trái sang phải. Trả về max của mỗi cửa sổ.

`[1,3,-1,-3,5,3,6,7], k=3` → `[3,3,5,5,6,7]`.

Sliding Window Maximum (LeetCode 239, Hard) là bài **monotonic deque** chuẩn mực. Nó tách người "biết sliding window" khỏi người "biết tối ưu sliding window": brute force O(nk) ai cũng viết được; heap O(n log k) là mức khá; deque O(n) là mức người phỏng vấn muốn thấy.

## Ý tưởng / Trực giác

Hãy nghĩ về các phần tử trong cửa sổ như ứng viên cho chức max. Khi phần tử mới `x` vào, mọi phần tử **cũ hơn và nhỏ hơn hoặc bằng** `x` trở nên vô dụng: chúng rời cửa sổ trước `x` và không bao giờ lớn hơn `x`. Loại chúng ngay.

Phần còn lại trong deque là các phần tử **giảm dần** theo giá trị (và tăng dần theo chỉ số). Đầu deque là max. Khi đầu rời cửa sổ (chỉ số ≤ i − k), bỏ nó.

Mỗi phần tử vào deque một lần, ra một lần ⇒ O(n) dù có vòng while bên trong.

## Thuật toán từng bước

Với mỗi `i`:
1. Pop cuối deque khi `nums[cuối] ≤ nums[i]`.
2. Push `i`.
3. Nếu `đầu ≤ i − k` ⇒ bỏ đầu.
4. Nếu `i ≥ k − 1` ⇒ ghi `nums[đầu]`.

Tab **Debug**: cột cyan là cửa sổ, cột tím là ứng viên trong deque, cột đỏ vừa bị loại; deque hiển thị `idx:val`. Preset "Giảm dần" cho thấy deque đầy; "Tăng dần" cho thấy deque luôn một phần tử.

## Chứng minh đúng

**Bất biến (sau bước 3 tại i):** deque chứa đúng các chỉ số `j` trong cửa sổ `[i−k+1, i]` sao cho **không có** `j' > j` trong cửa sổ với `nums[j'] ≥ nums[j]` (tức `j` là "max của hậu tố bắt đầu từ j"). Các giá trị trong deque giảm ngặt.

- Bước 1 loại đúng những `j` có `nums[j] ≤ nums[i]` với `j < i` – chúng vi phạm điều kiện với `j' = i`. Những `j` còn lại có `nums[j] > nums[i]` nên vẫn thoả.
- Bước 2 thêm `i` (hậu tố `[i, i]` – hiển nhiên thoả).
- Bước 3 bỏ chỉ số ngoài cửa sổ; chỉ đầu deque có thể ngoài vì chỉ số tăng dần trong deque và cửa sổ trượt 1.
- Max của cửa sổ chắc chắn thoả điều kiện "không có phần tử sau lớn hơn hoặc bằng" (lấy max có chỉ số lớn nhất) ⇒ nằm trong deque; và vì deque giảm dần, nó ở đầu.

**O(n):** mỗi chỉ số push 1 lần, pop (cuối) hoặc bỏ (đầu) tối đa 1 lần ⇒ ≤ 2n thao tác.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ |
|---|---|---|
| Brute force | O(n·k) | O(1) |
| Max-heap với lazy deletion | O(n log n) | O(n) |
| Multiset / balanced BST | O(n log k) | O(k) |
| **Monotonic deque** | **O(n)** | O(k) |
| Sparse table (truy vấn bất kỳ) | O(n log n) build, O(1) truy vấn | O(n log n) |

## Tradeoff

- **Deque O(n) ↔ Heap O(n log k):** heap tổng quát hơn (cửa sổ không cố định, nhiều loại truy vấn) nhưng chậm hơn và cần lazy deletion. Deque chỉ cho cửa sổ trượt một chiều.
- **Cửa sổ cố định ↔ Cửa sổ thay đổi:** deque vẫn dùng được khi cửa sổ co giãn theo điều kiện (1438: giữ cả max-deque và min-deque).
- **`≤` ↔ `<` khi pop:** `≤` loại cả phần tử bằng ⇒ deque ngắn hơn; `<` giữ phần tử bằng – cả hai đúng cho max, nhưng nếu cần "chỉ số của max đầu tiên" thì dùng `<`.
- **Mảng + con trỏ head ↔ Deque thật:** JS không có deque; dùng mảng với `head` (như code) hoặc circular buffer; `shift()` là O(n).
- **Online / stream:** thuật toán là online, nhưng chỉ cho max; min cần deque riêng.

## Lợi / Hại

**Lợi**
- Tuyến tính, O(k) bộ nhớ, không cấu trúc dữ liệu phức tạp.
- Mở rộng cho min, cho DP với ràng buộc cửa sổ (Jump Game VI), cho "shortest subarray với tổng ≥ K" trên prefix sum.

**Hại**
- Chỉ cho cửa sổ trượt một chiều (chỉ số vào/ra theo thứ tự).
- Bất biến đơn điệu khó nhớ chiều; dễ nhầm pop đầu/cuối.

## Use case thực tế

- **Giám sát hệ thống / time-series:** max/min độ trễ, CPU trong cửa sổ 1 phút trượt – O(1) mỗi điểm.
- **Tài chính:** chỉ báo kỹ thuật (Donchian channel, rolling high/low), phát hiện breakout.
- **Xử lý ảnh:** max/min filter (dilation/erosion 1D) với van Herk/Gil–Werman là ý tưởng tương tự.
- **Mạng / rate limiting:** đỉnh lưu lượng trong cửa sổ trượt.
- **Game / vật lý:** va chạm với vật cao nhất trong vùng nhìn.
- **DP tối ưu:** chuyển O(n·k) thành O(n) cho các bài "nhảy tối đa k bước" (Jump Game VI), "chọn phần tử cách nhau ≤ k".

## Lỗi thường gặp

1. Lưu **giá trị** vào deque thay vì chỉ số ⇒ không biết khi nào rời cửa sổ.
2. Pop đầu bằng `while` so sánh giá trị thay vì kiểm tra chỉ số `≤ i − k`.
3. Dùng `shift()` của JS ⇒ O(n) mỗi lần.
4. Bắt đầu ghi kết quả trước khi `i ≥ k − 1`.
5. Chiều đơn điệu ngược (giữ tăng dần) ⇒ đầu deque là min.
6. k > n hoặc k = 0 không xử lý.

## Biến thể

- **Sliding Window Minimum:** pop khi `nums[cuối] ≥ nums[i]`.
- **Longest Subarray with |max − min| ≤ limit (1438):** hai deque + cửa sổ co giãn.
- **Shortest Subarray with Sum ≥ K (862):** deque tăng dần trên prefix sum.
- **Jump Game VI (1696):** `dp[i] = nums[i] + max(dp[i−k..i−1])` với deque.
- **Constrained Subsequence Sum (1425):** tương tự.
- **Max queue bằng hai stack:** cách khác đạt O(1) amortized, dùng khi cần queue tổng quát với max.
