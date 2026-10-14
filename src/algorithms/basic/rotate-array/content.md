## Bài toán

Xoay mảng sang phải `k` bước, **tại chỗ** với O(1) bộ nhớ phụ. `[1,2,3,4,5,6,7], k=3` → `[5,6,7,1,2,3,4]`.

LeetCode 189 ghi rõ "hãy thử ít nhất 3 cách" – người phỏng vấn muốn thấy bạn đi từ cách dễ (mảng phụ O(n)) tới cách tối ưu (đảo ba lần) và giải thích vì sao nó đúng.

## Ý tưởng / Trực giác

Xoay phải `k` = đưa `k` phần tử cuối lên đầu, giữ nguyên thứ tự bên trong hai khối: `[A | B] → [B | A]`. Đảo toàn bộ cho `[B' | A']` (mỗi khối đúng vị trí nhưng ngược thứ tự bên trong). Đảo lại từng khối ⇒ `[B | A]`. Ba lần đảo, mỗi lần O(độ dài) tại chỗ.

`k` có thể lớn hơn `n`: xoay `n` bước là về như cũ ⇒ lấy `k mod n`.

## Thuật toán từng bước

1. `k %= n`.
2. `reverse(0, n−1)`; `reverse(0, k−1)`; `reverse(k, n−1)`.

Tab **Debug**: vùng cyan là đoạn đang đảo, hai ô đỏ đang hoán đổi. Preset "k > n" cho thấy bước lấy dư.

## Chứng minh đúng

Gọi `A = nums[0..n−k)`, `B = nums[n−k..n)`. Đảo toàn bộ: `rev(A·B) = rev(B)·rev(A)`. Đảo `k` phần tử đầu (`rev(B)` dài `k`): được `B·rev(A)`. Đảo phần còn lại: `B·A` – chính là kết quả xoay phải `k`. Mỗi `reverse` đúng vì hoán đổi đối xứng tới khi hai con trỏ gặp nhau.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ |
|---|---|---|
| Mảng phụ `res[(i+k)%n] = nums[i]` | O(n) | O(n) |
| Xoay từng bước k lần | O(n·k) | O(1) |
| Đảo ba lần | O(n) | O(1) |
| Cycle replacement (juggling) | O(n) | O(1), đúng 1 lần ghi mỗi phần tử |

## Tradeoff

- **Đảo ba lần ↔ Juggling:** juggling (đi theo chu trình `i → (i+k) mod n`, số chu trình = gcd(n,k)) ít phép ghi hơn (n thay vì 2n) nhưng khó đúng; đảo ba lần đơn giản, cache tốt, thường được chọn.
- **Tại chỗ ↔ Mảng phụ:** nếu được O(n) bộ nhớ, mảng phụ dễ nhất; tại chỗ cần khi mảng lớn hoặc đề bắt buộc.
- **Xoay trái:** xoay trái `k` = xoay phải `n − k`, hoặc đổi thứ tự đảo.

## Lợi / Hại

**Lợi:** O(n)/O(1), dùng lại `reverse` – mẹo tổng quát (đảo từ trong câu: đảo cả chuỗi rồi đảo từng từ).
**Hại:** mỗi phần tử ghi 2 lần; không áp dụng cho linked list (không truy cập ngẫu nhiên – Rotate List làm bằng nối vòng).

## Use case thực tế

- **Circular buffer / ring buffer:** xoay chỉ số đầu thay vì dịch dữ liệu.
- **Lịch & ca trực:** xoay danh sách ca theo tuần.
- **Mật mã cổ điển:** Caesar shift trên bảng chữ cái là xoay mảng.
- **Đồ hoạ:** cuộn ảnh/tile map vòng tròn, xoay hàng pixel.
- **Load balancing round-robin:** xoay danh sách server.

## Lỗi thường gặp

1. Quên `k %= n` ⇒ chỉ số âm/ngoài mảng khi k > n.
2. `reverse(0, k)` thay vì `reverse(0, k−1)` ⇒ lệch 1.
3. Xoay trái nhầm thành phải (hoặc ngược lại).
4. Tạo mảng mới rồi gán `nums = res` – không sửa tại chỗ (LeetCov kiểm tra tại chỗ).

## Biến thể

- **Rotate List (61):** nối thành vòng, cắt tại `n − k`.
- **Rotate Image (48):** chuyển vị rồi đảo từng hàng.
- **Reverse Words in a String (151):** đảo cả chuỗi rồi đảo từng từ.
- **Juggling / cycle replacement:** O(1) bộ nhớ, n phép ghi.
