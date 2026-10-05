## Cách trình bày trong phỏng vấn

1. Nêu HashMap O(n)/O(n) trong 1 câu, rồi "yêu cầu O(1) bộ nhớ gợi ý bit manipulation".
2. Nêu ba tính chất XOR và kết luận "các cặp triệt tiêu".
3. Code 3 dòng. Chạy tay với `[4,1,2,1,2]` theo nhị phân để chứng minh bạn hiểu từng bit.
4. Chủ động nêu giới hạn: không dùng cho "3 lần", và cách xử lý (đếm bit mod 3).
5. Sẵn sàng với bộ mẹo: `n & (n−1)`, `n & −n`, `x ^ y` để swap, `1 << k` để tạo mask, `>>> 0` trong JS.

## Bảng mẹo bit nên thuộc

| Mục đích | Biểu thức | Ghi chú |
|---|---|---|
| Xoá bit 1 thấp nhất | `n & (n − 1)` | Đếm bit, kiểm tra 2^k |
| Lấy bit 1 thấp nhất | `n & −n` | Fenwick tree, tách nhóm |
| Kiểm tra bit k | `(n >> k) & 1` | |
| Bật / tắt / lật bit k | `n \| (1<<k)`, `n & ~(1<<k)`, `n ^ (1<<k)` | |
| Luỹ thừa của 2 | `n > 0 && (n & (n−1)) === 0` | |
| Chia / nhân 2^k | `n >> k`, `n << k` | Cẩn thận số âm |
| `%` với 2^k | `n & (2^k − 1)` | Hash table |
| Swap không biến tạm | `a ^= b; b ^= a; a ^= b` | Trick, đừng dùng production |
| Unsigned 32 trong JS | `n >>> 0` | |

## Câu hỏi follow-up thường gặp

- **Mọi số xuất hiện 3 lần trừ một?** Với mỗi bit, đếm số phần tử có bit đó = 1; lấy mod 3 ⇒ bit của đáp án. O(32n). Hoặc máy trạng thái `ones = (ones ^ x) & ~twos; twos = (twos ^ x) & ~ones`.
- **Hai số xuất hiện một lần?** `xor = a ^ b ≠ 0`; lấy `bit = xor & −xor` (một bit a, b khác nhau); XOR riêng các số có bit đó và không có ⇒ a, b.
- **Thiếu một số trong 0..n?** XOR cả chỉ số và giá trị; hoặc tổng Gauss (cẩn thận tràn ở ngôn ngữ 32-bit).
- **Đếm bit 1 nhanh nhất?** Lệnh CPU `popcnt`; trong JS không có, dùng Kernighan hoặc bảng tra 8 bit.
- **Tại sao `n & (n−1)` xoá bit thấp nhất?** Giải thích bằng dạng `A1000` → `A0111`, AND cho `A0000`.
- **JS xử lý bit 64-bit thế nào?** Toán tử bit chỉ 32-bit; dùng `BigInt` (`1n << 40n`) cho rộng hơn.
- **Ứng dụng bitmask DP?** Trạng thái = tập con đã chọn (2ⁿ), ví dụ TSP, Partition to K Equal Subsets.
- **XOR có dùng được cho chuỗi?** XOR mã char; cùng tính chất (tìm ký tự thêm vào – 389).

## Checklist nhận diện pattern

- "O(1) bộ nhớ" + "xuất hiện chẵn lần trừ một" ⇒ XOR.
- "Số bit 1", "luỹ thừa của 2", "bit thấp nhất" ⇒ `n & (n−1)`, `n & −n`.
- "Tập con", "chọn/không chọn với n ≤ 20" ⇒ bitmask.
- "Cờ / quyền / trạng thái bật tắt" ⇒ bit flags.

## Bài luyện tập liên quan

- 136 Single Number → 137 Single Number II → 260 Single Number III.
- 191 Number of 1 Bits, 338 Counting Bits, 231 Power of Two, 342 Power of Four.
- 268 Missing Number, 389 Find the Difference, 461 Hamming Distance, 190 Reverse Bits.
- 78 Subsets (bitmask), 1239 Maximum Length of Concatenated String (bitmask), 847 Shortest Path Visiting All Nodes (bitmask BFS).
