## Bài toán

Mảng `nums` trong đó mọi số xuất hiện **đúng hai lần** trừ một số xuất hiện một lần. Tìm số đó trong **O(n) thời gian và O(1) bộ nhớ** (LeetCode 136).

Yêu cầu O(1) bộ nhớ loại bỏ HashMap, và đó là lúc bit manipulation xuất hiện. Bài này cùng với "đếm bit 1" và "kiểm tra luỹ thừa 2" là bộ ba câu hỏi bit cơ bản mà Google, Apple, Nvidia hỏi để kiểm tra bạn có hiểu máy tính thực sự làm việc với số như thế nào.

## Ý tưởng / Trực giác

**XOR** (`^`) là phép "cộng không nhớ" theo từng bit: 1 nếu hai bit khác nhau, 0 nếu giống. Ba tính chất:
- `a ^ a = 0` – một số XOR chính nó bằng 0.
- `a ^ 0 = a`.
- Giao hoán, kết hợp – thứ tự không quan trọng.

Vậy XOR toàn bộ mảng: mọi cặp giống nhau "gặp nhau" và triệt tiêu thành 0, chỉ còn số lẻ loi. Giống như bật/tắt công tắc: bấm hai lần trở về trạng thái cũ.

**Hai mẹo bit đi kèm** (được debug ở phần sau của trace):
- `n & (n − 1)` xoá bit 1 **thấp nhất**: `n − 1` lật bit 1 thấp nhất thành 0 và mọi bit 0 bên phải thành 1; AND với `n` giữ phần bên trái, xoá phần bên phải.
- `n & −n` **giữ lại** đúng bit 1 thấp nhất (vì `−n` là bù 2 của `n`).

## Thuật toán từng bước

1. `acc = 0`.
2. Với mỗi `x`: `acc ^= x`.
3. Trả `acc`.

Đếm bit 1: lặp `n &= n − 1`, đếm số vòng. Luỹ thừa của 2 ⇔ `n > 0 && (n & (n − 1)) === 0`.

Tab **Debug**: mỗi số hiện dưới dạng 8 bit; bit vàng là bit sắp bị lật, bit đỏ vừa lật. Sau khi tìm được kết quả, trace đếm bit 1 của nó bằng `n & (n − 1)`.

## Chứng minh đúng

Gọi số lẻ loi là `s`, các số còn lại là `p₁, p₁, p₂, p₂, …`. Theo giao hoán và kết hợp:

`acc = s ^ (p₁ ^ p₁) ^ (p₂ ^ p₂) ^ … = s ^ 0 ^ 0 ^ … = s`.

**`n & (n − 1)` xoá bit 1 thấp nhất:** viết `n = A·1·0…0` (A là phần cao, rồi bit 1 thấp nhất, rồi k bit 0). `n − 1 = A·0·1…1`. AND: `A·0·0…0`. Phần A giữ nguyên, bit 1 thấp nhất và các bit sau bị xoá. Số vòng lặp đúng bằng số bit 1.

**Luỹ thừa 2:** có đúng một bit 1 ⇔ xoá bit 1 thấp nhất cho 0.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Single Number | O(n) / O(1) | Một lượt XOR |
| countBits (Kernighan) | O(số bit 1) | Tối đa 32 vòng, thường ít hơn nhiều |
| isPowerOfTwo | O(1) | |
| HashMap/Set (để so sánh) | O(n) / O(n) | Tốn bộ nhớ, chậm hơn 5–10× thực tế |

## Tradeoff

- **XOR ↔ HashMap:** XOR O(1) bộ nhớ, nhanh, nhưng chỉ đúng với "xuất hiện chẵn lần trừ một số". Bài "xuất hiện 3 lần trừ một" (137) cần đếm bit theo mod 3 hoặc máy trạng thái 2 bit – XOR đơn thuần không đủ. HashMap tổng quát hơn.
- **Hai số lẻ loi (260):** XOR cho `a ^ b`; tách nhóm theo một bit khác nhau (`diff & −diff`), XOR từng nhóm.
- **JavaScript và 32-bit:** toán tử bit trong JS chuyển số sang **int32 có dấu**. `1 << 31` âm; số > 2³¹ bị cắt. Với số lớn dùng `BigInt` hoặc `>>> 0` để ép về unsigned 32.
- **Đọc được ↔ Nhanh:** mẹo bit khó đọc; trong production hãy đặt tên hàm (`lowestSetBit`, `clearLowestBit`) và comment. Trong phỏng vấn, giải thích bằng lời trước khi viết.

## Lợi / Hại

**Lợi**
- Cực nhanh: một chu kỳ CPU mỗi phép, không cấp phát bộ nhớ.
- O(1) bộ nhớ – quan trọng trong embedded, kernel, GPU.
- Nền cho bitmask DP, bitset, Bloom filter, hashing.

**Hại**
- Dễ sai dấu/tràn, khó đọc.
- Chỉ áp dụng khi bài toán có cấu trúc "chẵn/lẻ", "tập con", "cờ".
- JS giới hạn 32-bit cho toán tử bit.

## Use case thực tế

- **Cờ (flags) và quyền:** `READ | WRITE`, `perm & WRITE`, Unix file mode, feature flags.
- **Parity / checksum / RAID 5:** XOR các khối để khôi phục khối mất.
- **Mã hoá:** one-time pad, stream cipher là XOR với khoá; XOR swap.
- **Đồ hoạ:** XOR để vẽ/xoá con trỏ chuột, bitmask cho pixel, mặt nạ alpha.
- **Bitmap index / bitset:** cơ sở dữ liệu nén cột, Roaring bitmap, Bloom filter.
- **Networking:** subnet mask `ip & mask`, tính checksum.
- **Hash:** FNV, MurmurHash dùng XOR và dịch bit; `n & (size − 1)` thay cho `% size` khi size là luỹ thừa 2.
- **Bitmask DP:** Travelling Salesman trên n ≤ 20 với trạng thái 2ⁿ.

## Lỗi thường gặp

1. Dùng `^` nghĩ là luỹ thừa (trong JS `**` mới là luỹ thừa).
2. `1 << 31` trong JS là −2147483648; dùng `2 ** 31` hoặc `>>> 0`.
3. Áp dụng XOR cho bài "xuất hiện 3 lần" ⇒ sai.
4. `n & (n − 1) === 0` thiếu ngoặc: `===` có ưu tiên cao hơn `&` ⇒ phải viết `(n & (n − 1)) === 0`.
5. Quên `n > 0` khi kiểm tra luỹ thừa 2 (0 và số âm).
6. Dùng `>>` (giữ dấu) thay `>>>` khi cần dịch logic với số âm.

## Biến thể

- **Missing Number (268):** XOR tất cả chỉ số 0..n với tất cả phần tử.
- **Single Number II (137):** đếm từng bit mod 3; hoặc máy trạng thái `ones`, `twos`.
- **Single Number III (260):** hai số lẻ loi, tách bằng `diff & −diff`.
- **Counting Bits (338):** `dp[i] = dp[i >> 1] + (i & 1)` hoặc `dp[i & (i − 1)] + 1`.
- **Reverse Bits (190), Power of Four (342), Hamming Distance (461):** cùng bộ công cụ.
- **Subsets bằng bitmask (78):** mask từ 0 đến 2ⁿ − 1, bit i = chọn phần tử i.
- **Gray code, XOR linked list, bit tricks của Hacker's Delight.**
