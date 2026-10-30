## Bài toán

Cho mảng `nums` gồm `n` số nguyên **phân biệt** nằm trong đoạn `[0, n]`. Vì đoạn này có `n + 1` giá trị mà mảng chỉ có `n` phần tử, đúng **một** số bị thiếu. Hãy tìm số đó (LeetCode 268).

Ví dụ: `nums = [3, 0, 1, 5, 2]` ⇒ `n = 5`, đoạn `[0, 5]` thiếu `4`. `nums = [0, 1]` ⇒ thiếu `2` (số lớn nhất cũng có thể bị thiếu). `nums = [1]` ⇒ thiếu `0`.

Yêu cầu nâng cao: `O(n)` thời gian và `O(1)` bộ nhớ phụ.

## Ý tưởng / Trực giác

Có ba cách tiếp cận kinh điển, cùng một trực giác: **so sánh "tập đáng lẽ phải có" `{0..n}` với "tập thực tế" `nums`**.

1. **Tổng Gauss:** `0 + 1 + … + n = n(n+1)/2`. Lấy tổng kỳ vọng trừ tổng thực tế là ra số thiếu. Rất gọn, nhưng tổng có thể **tràn số** với `int32` (Java/C++) khi `n` lớn (khoảng `n > 65 535` là `n(n+1)/2` vượt `2³¹ − 1`). Trong JavaScript, `number` là double nên an toàn tới `2⁵³`, nhưng người phỏng vấn vẫn muốn bạn nhận ra rủi ro này.
2. **XOR (cách chính của bài):** XOR có ba tính chất: `x ^ x = 0`, `x ^ 0 = x`, và giao hoán/kết hợp. Nếu XOR toàn bộ `0..n` **và** toàn bộ `nums`, mỗi số có mặt xuất hiện đúng hai lần nên tự triệt tiêu, chỉ còn số thiếu (xuất hiện một lần). Không có phép cộng nên **không bao giờ tràn**.
3. **Cyclic sort:** vì giá trị nằm trong `[0, n]`, đặt mỗi giá trị `v` về đúng ô `v` bằng hoán đổi; sau đó quét tìm ô `i` đầu tiên có `nums[i] != i`. Cũng `O(n)` / `O(1)` nhưng **sửa mảng đầu vào**.

Mẹo gọn của cách XOR: thay vì hai vòng lặp, ta dùng chỉ số `i` làm đại diện cho "đáng lẽ có". Chỉ số chạy `0..n−1`, thiếu `n`, nên khởi tạo `xor = n`.

## Thuật toán từng bước

1. `n = nums.length`, `xor = n`.
2. Với mỗi `i` từ `0` đến `n − 1`:
   - `xor ^= i` (số kỳ vọng),
   - `xor ^= nums[i]` (số thực tế).
3. Trả về `xor`.

Chạy tay `[3, 0, 1, 5, 2]`: `xor = 5 ^ (0^3) ^ (1^0) ^ (2^1) ^ (3^5) ^ (4^2)`. Gom cặp: `0,0`, `1,1`, `2,2`, `3,3`, `5,5` triệt tiêu ⇒ còn `4`.

## Chứng minh đúng

Gọi `m` là số bị thiếu. Sau vòng lặp, `xor` bằng XOR của đa tập `A = {0, 1, …, n} ∪ nums` (chỉ số `0..n−1` cộng thêm `n` lúc khởi tạo, cùng mọi phần tử của mảng). Vì XOR giao hoán và kết hợp, thứ tự không ảnh hưởng.

Với mỗi `v ∈ [0, n]`, `v ≠ m`: `v` xuất hiện một lần trong `{0..n}` và một lần trong `nums` (phân biệt, nằm trong đoạn) ⇒ đóng góp `v ^ v = 0`. Riêng `m` xuất hiện một lần trong `{0..n}` và không có trong `nums` ⇒ đóng góp `m`. Vậy `xor = 0 ^ 0 ^ … ^ m = m`.

Xét theo **từng bit**: bit thứ k của kết quả là tính chẵn lẻ của số phần tử trong `A` có bit k bằng 1. Mọi số có mặt góp chẵn lần, chỉ `m` góp lẻ ⇒ các bit lẻ chính là bit của `m`.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ | Ghi chú |
|---|---|---|---|
| XOR chỉ số & giá trị | O(n) | O(1) | Không tràn, không sửa mảng |
| Tổng Gauss | O(n) | O(1) | Có thể tràn int32 |
| Cyclic sort | O(n) | O(1) | Sửa mảng đầu vào |
| Hash set | O(n) | O(n) | Dễ nghĩ ra nhất |
| Sắp xếp rồi quét | O(n log n) | O(1)–O(n) | Chậm hơn cần thiết |

## Tradeoff

- **XOR vs Gauss:** cùng một lần quét, nhưng XOR an toàn tràn số; Gauss dễ giải thích hơn với người không quen bit. Trong Java có thể sửa Gauss bằng cách cộng-trừ xen kẽ (`sum += i - nums[i]`) để giá trị trung gian luôn nhỏ.
- **XOR vs cyclic sort:** cyclic sort tổng quát hơn (tìm **nhiều** số thiếu, LC 448; tìm số trùng), nhưng phá hủy đầu vào. XOR chỉ giải được khi thiếu đúng **một** số.
- **XOR vs hash set:** hash set chịu được dữ liệu "bẩn" (có trùng, có số ngoài khoảng) nhưng tốn `O(n)` bộ nhớ.

## Lợi / Hại

**Lợi:**
- `O(n)` thời gian, `O(1)` bộ nhớ, một lần quét, không cấp phát.
- Không tràn số, không thay đổi mảng.
- Code 5 dòng, khó viết sai.

**Hại:**
- Phụ thuộc chặt vào giả thiết "phân biệt, trong `[0, n]`, thiếu đúng một". Nếu dữ liệu vi phạm, kết quả là rác mà không báo lỗi.
- Kém trực quan với người đọc chưa quen XOR – cần comment giải thích.

## Use case thực tế

- **Kiểm tra gói tin / số thứ tự:** tìm sequence number bị mất trong một lô gói tin đã đánh số liên tiếp.
- **Checksum đơn giản:** XOR của một khối dữ liệu dùng làm parity (RAID-5 khôi phục một ổ đĩa hỏng bằng XOR các ổ còn lại – đúng ý tưởng "XOR toàn bộ để tìm phần còn thiếu").
- **Kiểm kê:** phát hiện ID bị thiếu trong một dãy ID liên tục mà không cần bảng băm.

## Lỗi thường gặp

- **Quên khởi tạo `xor = n`** (khởi tạo bằng 0) ⇒ sai khi số thiếu là `n` hoặc ra kết quả lệch.
- **Dùng Gauss với `int` trong Java/C++** mà không nghĩ tới tràn số.
- **Nhầm `^` là lũy thừa** (trong JS/Java/C, `^` là XOR; lũy thừa là `**`).
- **Giả định mảng đã sắp xếp** rồi dùng binary search – đề không cho điều đó.
- Áp dụng XOR khi mảng có thể **trùng lặp** – số trùng lặp chẵn lần sẽ biến mất và làm sai kết quả.

## Biến thể

- **LC 136 – Single Number:** mọi số xuất hiện hai lần trừ một ⇒ XOR toàn bộ.
- **LC 260 – Single Number III:** hai số xuất hiện một lần ⇒ XOR toàn bộ rồi tách theo bit thấp nhất khác 0.
- **LC 448 – Find All Numbers Disappeared:** nhiều số thiếu ⇒ cyclic sort hoặc đánh dấu âm tại chỉ số.
- **LC 287 – Find the Duplicate Number:** một số trùng ⇒ Floyd fast/slow hoặc binary search trên giá trị.
- **LC 41 – First Missing Positive:** giá trị tùy ý ⇒ cyclic sort chỉ với các giá trị trong `[1, n]`.
- **Thiếu một và trùng một (LC 645 – Set Mismatch):** XOR cho `a ^ b`, sau đó tách bit như LC 260.
