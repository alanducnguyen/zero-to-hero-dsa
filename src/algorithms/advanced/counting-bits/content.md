## Bài toán

Cho `n`. Trả về mảng `bits` độ dài `n + 1` với `bits[i]` = số bit 1 trong biểu diễn nhị phân của `i`.

`n = 5` → `[0, 1, 1, 2, 1, 2]` (0, 1, 10, 11, 100, 101).

Counting Bits (LeetCode 338) là bài kết hợp **bit manipulation và DP**: đếm từng số bằng Kernighan tốn O(n log n); yêu cầu là O(n) một lượt.

## Ý tưởng / Trực giác

Số `i` viết nhị phân, bỏ bit cuối cùng ta được `i >> 1` (chia 2 làm tròn xuống) – một số **nhỏ hơn**, đã tính. Số bit 1 của `i` bằng số bit 1 của `i >> 1` cộng với bit cuối `i & 1`:

`bits[i] = bits[i >> 1] + (i & 1)`

Nói cách khác: `bits[2k] = bits[k]`, `bits[2k+1] = bits[k] + 1`. Bài con là "cùng số bỏ bit thấp nhất", luôn nhỏ hơn nên điền từ 1 tới n là xong.

## Thuật toán từng bước

1. `bits[0] = 0`.
2. Với `i = 1..n`: `bits[i] = bits[i >> 1] + (i & 1)`.
3. Trả về `bits`.

Ở tab **Debug**, ô tím là `i` đang tính, ô vàng là `i >> 1` được tái dùng; bảng nhị phân bên dưới cho thấy phép bỏ bit cuối.

## Chứng minh đúng

Với `i ≥ 1`, biểu diễn nhị phân của `i` là biểu diễn của `⌊i/2⌋` nối thêm bit `i mod 2` ở cuối (định nghĩa hệ nhị phân: `i = 2·⌊i/2⌋ + (i mod 2)`). Vậy popcount(`i`) = popcount(`⌊i/2⌋`) + (`i mod 2`). Vì `⌊i/2⌋ < i`, quy nạp mạnh theo `i` với cơ sở `bits[0] = 0` cho `bits[i]` đúng với mọi `i`.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ |
|---|---|---|
| DP `i >> 1` | O(n) | O(n) output |
| DP `i & (i−1)` (bỏ bit 1 thấp nhất) | O(n) | O(n) |
| DP theo luỹ thừa 2 gần nhất (`i − offset`) | O(n) | O(n) |
| Kernighan cho từng số | O(n log n) | O(n) |
| Lookup table 8 bit | O(n) | O(256) |

## Tradeoff

- Ba công thức DP tương đương O(n); `i >> 1` dễ chứng minh nhất, `i & (i−1)` ngắn nhất, `offset` trực quan về mặt "lặp lại khối".
- Kernighan tốt khi chỉ cần một vài số, không cần cả dải.
- Với phần cứng: lệnh `popcnt` O(1) mỗi số; trong JS không có, nên DP hoặc bảng tra là lựa chọn.

## Lợi / Hại

**Lợi:** O(n), code 3 dòng, minh hoạ cách tìm bài con bằng phép bit. **Hại:** chỉ hiệu quả khi cần cả dải `0..n`; `n` lớn tốn O(n) bộ nhớ.

## Use case thực tế

- Tiền tính popcount cho bitmask DP (TSP bitmask, subset DP) để tra O(1).
- Hamming weight của mọi mã trong bảng mã (error-correcting codes, hashing).
- Đếm bit để xếp hạng/sắp xếp theo số bit (Sort Integers by The Number of 1 Bits).
- Tính parity, kiểm tra luỹ thừa 2 (`bits[i] === 1`).

## Lỗi thường gặp

- `i / 2` thay vì `i >> 1` ⇒ chỉ số lẻ, truy cập `undefined`.
- Khởi tạo mảng độ dài `n` thay vì `n + 1`.
- Dùng `i % 2` với số âm (không xảy ra ở đây, nhưng `&` an toàn hơn).
- Dùng `toString(2)` đếm '1' cho mỗi số: đúng nhưng O(n log n) và tạo chuỗi.

## Biến thể

- **`bits[i] = bits[i & (i−1)] + 1`:** bỏ bit 1 thấp nhất.
- **`bits[i] = bits[i − offset] + 1`** với `offset` là luỹ thừa 2 lớn nhất ≤ i.
- **Number of 1 Bits (191):** Kernighan cho một số, O(số bit 1).
- **Popcount SWAR:** trick 64-bit trong O(1) cho một số (dùng trong thư viện).
- **Bitmask DP:** dùng mảng này để biết "đã chọn bao nhiêu phần tử" của mỗi mask.
