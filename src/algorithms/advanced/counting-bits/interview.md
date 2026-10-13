## Cách trình bày trong phỏng vấn

1. Nêu cách đếm từng số bằng Kernighan `i & (i−1)` O(n log n) để chứng tỏ biết cơ bản.
2. Quan sát: bỏ bit cuối cho số nhỏ hơn đã tính ⇒ `bits[i] = bits[i >> 1] + (i & 1)`.
3. Viết 3 dòng code, chạy tay 0..7.
4. Nêu hai công thức tương đương (`i & (i−1)`, offset) để cho thấy hiểu bản chất.
5. Liên hệ bitmask DP (dùng mảng này để tra popcount O(1)).

## Câu hỏi follow-up thường gặp

- **Giải thích `i & (i−1)`?** Trừ 1 làm bit 1 thấp nhất thành 0 và các bit 0 sau nó thành 1; AND xoá đúng bit 1 thấp nhất.
- **O(1) mỗi số không cần DP?** SWAR popcount hoặc lệnh phần cứng `popcnt`; JS không có sẵn, có thể dùng bảng 8-bit.
- **Chỉ cần một số rất lớn (BigInt)?** Kernighan trên BigInt, hoặc chia thành khối 32 bit.
- **Bộ nhớ O(1)?** Không thể nếu phải trả về cả mảng; nếu chỉ cần tổng số bit 1 của 0..n thì có công thức toán học O(log n).
- **Vì sao gọi là DP?** Bài con `bits[i >> 1]` được dùng lại bởi 2 bài lớn (`2k`, `2k+1`), overlapping subproblems.
- **n = 10⁹?** Không tạo mảng; dùng công thức đếm tổng bit theo từng vị trí bit.

## Checklist nhận diện pattern

- "Số bit 1 của mọi số trong dải" ⇒ DP theo `i >> 1` hoặc `i & (i−1)`.
- Bài bitmask với n ≤ 20 cần popcount nhiều lần ⇒ tiền tính mảng này.
- Chỉ một số ⇒ Kernighan.

## Bài luyện tập

- 338 Counting Bits → 191 Number of 1 Bits → 1356 Sort Integers by The Number of 1 Bits.
- 231 Power of Two, 342 Power of Four, 461 Hamming Distance, 477 Total Hamming Distance.
- 1611 Minimum One Bit Operations (Gray code), bài TSP bitmask bất kỳ.
