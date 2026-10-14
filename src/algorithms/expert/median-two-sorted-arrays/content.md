## Bài toán

Cho hai mảng đã sắp xếp `nums1` (m phần tử) và `nums2` (n phần tử). Tìm **trung vị** của hợp hai mảng với độ phức tạp O(log(m + n)).

`[1,3]` + `[2]` → 2. `[1,2]` + `[3,4]` → 2.5.

Trộn hai mảng rồi lấy giữa là O(m + n) – người phỏng vấn sẽ hỏi "tốt hơn được không?". Lời giải O(log min(m, n)) (LeetCode 4, Hard) là bài binary search "trên điểm cắt" chứ không phải trên giá trị.

## Ý tưởng / Trực giác

Trung vị chia hợp hai mảng thành nửa trái và nửa phải bằng nhau (lệch 1 nếu tổng lẻ) sao cho mọi phần tử trái ≤ mọi phần tử phải. Nửa trái phải gồm `i` phần tử đầu của A và `j = half − i` phần tử đầu của B. Vì A, B đã sắp xếp, chỉ cần kiểm tra **hai cặp biên**:

- `A[i−1] ≤ B[j]` (phần tử cuối trái của A không vượt đầu phải của B)
- `B[j−1] ≤ A[i]`

Nếu `A[i−1] > B[j]`: lấy quá nhiều từ A ⇒ giảm `i`. Nếu `B[j−1] > A[i]`: lấy quá ít ⇒ tăng `i`. Điều kiện này **đơn điệu theo i** nên nhị phân được. Chọn A là mảng ngắn để `j` luôn hợp lệ và chi phí O(log min(m, n)).

## Thuật toán từng bước

1. Đảm bảo `m ≤ n` (đổi chỗ nếu cần). `half = ⌊(m + n + 1) / 2⌋`.
2. `lo = 0`, `hi = m`. Lặp: `i = ⌊(lo + hi)/2⌋`, `j = half − i`. Lấy `Aleft, Aright, Bleft, Bright` với `±∞` ở biên.
3. Nếu `Aleft ≤ Bright` và `Bleft ≤ Aright`: tổng lẻ ⇒ `max(Aleft, Bleft)`; chẵn ⇒ `(max(Aleft, Bleft) + min(Aright, Bright)) / 2`.
4. Nếu `Aleft > Bright` ⇒ `hi = i − 1`; ngược lại `lo = i + 1`.

Ở tab **Debug**, dải cyan trên mỗi mảng là nửa trái hiện tại; ô vàng là phần tử cuối nửa trái, ô xanh dương là đầu nửa phải; ô đỏ là cặp vi phạm khiến phải dịch điểm cắt.

## Chứng minh đúng

**Tồn tại:** với `i*` = số phần tử của A nằm trong `half` phần tử nhỏ nhất của hợp (tie-break ưu tiên A), cắt `(i*, half − i*)` thoả hai điều kiện. `i*` ∈ [0, m] và `j = half − i* ∈ [0, n]` vì `m ≤ n`.

**Đơn điệu:** khi `i` tăng, `Aleft = A[i−1]` không giảm còn `Bright = B[half−i]` không tăng ⇒ `Aleft ≤ Bright` đúng với mọi `i ≤ i₁` nào đó và sai sau đó; tương tự `Bleft ≤ Aright` đúng với mọi `i ≥ i₂`. Nhị phân thu hẹp về `[i₂, i₁]` chứa `i*`.

**Kết quả:** khi cắt đúng, nửa trái có đúng `half` phần tử và tất cả ≤ nửa phải, nên max nửa trái là phần tử thứ `half` – trung vị khi tổng lẻ; với tổng chẵn trung vị là trung bình của phần tử thứ `half` và `half + 1` = min nửa phải.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ |
|---|---|---|
| Nhị phân điểm cắt | O(log min(m, n)) | O(1) |
| Trộn tới giữa (hai con trỏ) | O(m + n) | O(1) |
| Kth smallest bằng loại bỏ k/2 | O(log(m + n)) | O(1) |
| Gộp + sort | O((m+n) log(m+n)) | O(m + n) |

## Tradeoff

- Nhị phân điểm cắt nhanh nhất nhưng nhiều chi tiết biên (±∞, half với tổng lẻ, mảng rỗng) – dễ sai khi code lần đầu.
- Hai con trỏ O(m + n) đơn giản, đủ dùng khi mảng nhỏ hoặc cần code nhanh và chắc.
- Cách "kth smallest" tổng quát hơn (tìm phần tử thứ k bất kỳ) với cùng ý tưởng loại bỏ nửa.

## Lợi / Hại

**Lợi:** minh hoạ binary search trên "không gian đáp án" thay vì giá trị; dùng cho mọi truy vấn thứ k trên hai mảng sắp xếp. **Hại:** không mở rộng tự nhiên sang k mảng (dùng heap hoặc nhị phân giá trị thay thế).

## Use case thực tế

- Gộp thống kê từ hai shard/partition đã sắp xếp (percentile, median) mà không trộn dữ liệu.
- Tính median của hai luồng log đã sắp theo thời gian.
- Phân tích A/B: trung vị của hợp hai mẫu lớn đã sắp xếp.
- Nền của thuật toán tìm phần tử thứ k trên nhiều mảng phân tán.

## Lỗi thường gặp

- Không đổi chỗ để A ngắn hơn ⇒ `j` có thể âm hoặc vượt n.
- `half = (m + n) / 2` thay vì `(m + n + 1) / 2` ⇒ sai với tổng lẻ.
- Quên `±Infinity` tại biên `i = 0`, `i = m`, `j = 0`, `j = n`.
- `hi = m − 1` thay vì `hi = m` ⇒ bỏ trường hợp lấy toàn bộ A.
- Nhị phân trên giá trị thay vì vị trí – vẫn đúng nhưng O(log(range) · log n).

## Biến thể

- **Kth smallest của hai mảng:** cùng kỹ thuật với `half = k`.
- **Median của k mảng sắp xếp:** nhị phân trên giá trị + đếm `≤ x` bằng binary search mỗi mảng.
- **Median trong luồng dữ liệu:** hai heap (LeetCode 295).
- **Mảng có trọng số:** nhị phân trên tổng trọng số tích luỹ.
