## Bảng so sánh

| Lời giải | Thời gian | Bộ nhớ | Ý chính | Hạng |
|---|---|---|---|---|
| Đệ quy thuần | O(2ⁿ) (≈ O(φⁿ)) | O(n) stack | f(i) = f(i+1) + [cặp hợp lệ]·f(i+2) | 4 |
| Đệ quy + memo | O(n) | O(n) memo + O(n) stack | Mỗi hậu tố đếm một lần | 3 |
| DP mảng (bottom-up) | O(n) | O(n) | dp[i] từ dp[i−1], dp[i−2] | 2 |
| Hai biến lăn | O(n) | O(1) | Chỉ giữ dp[i−1], dp[i−2] | 1 |

## Phân tích

**Đệ quy thuần** là cách diễn đạt tự nhiên nhất: đứng ở vị trí `i`, hoặc lấy 1 chữ số, hoặc lấy 2. Nhưng hậu tố `s[i..]` được tới từ cả `i−1` lẫn `i−2`, nên số lời gọi tăng như Fibonacci – chuỗi `"111…1"` dài 40 đã cần hơn 10⁸ lời gọi. Xem cột "số lần gọi f(i)" trong trace: cùng một `i` bị gọi lại nhiều lần.

**Memo** giữ nguyên code đệ quy, chỉ thêm một dòng tra cache ⇒ O(n). Đây là bước chuyển dễ nhất khi đang trình bày. Nhược điểm: stack sâu n tầng, và hằng số của Map/lời gọi hàm lớn hơn vòng lặp.

**DP mảng** lật ngược chiều: `dp[i]` = số cách giải mã *tiền tố* i ký tự. Không đệ quy, dễ debug từng ô. Nhưng mỗi bước chỉ đọc hai ô ngay trước.

**Hai biến lăn** khai thác chính quan sát đó ⇒ O(1) bộ nhớ, cùng O(n) thời gian. Đây là đáp án người phỏng vấn mong chờ sau khi bạn đã trình bày được công thức.

## Bẫy '0' – nơi mọi lời giải đều có thể sai

- Đệ quy: phải kiểm tra `s[i] === '0'` **trước** khi xét cặp; khi đó cặp bắt đầu bằng s[i] ≠ '0' tự động ≥ 10.
- Bottom-up: điều kiện cặp là `10 ≤ two ≤ 26`, **không** chỉ `≤ 26` – nếu quên, `"06"` thành 6 và `"2101"` đếm thừa.
- `dp[0] = 1` (không phải 0): tiền tố rỗng là "một cách", nếu không mọi thứ cộng ra 0.

## Khi nào thứ hạng đổi

- **Cần liệt kê mọi cách giải mã** (không chỉ đếm) ⇒ backtracking (giống đệ quy thuần) là bắt buộc vì kết quả có thể lớn theo hàm mũ.
- **Decode Ways II** (có `'*'`) ⇒ vẫn hai biến lăn, nhưng phép chuyển phức tạp; DP mảng dễ debug hơn khi phỏng vấn.
- **Muốn trả lời nhiều truy vấn trên các tiền tố** ⇒ giữ cả mảng dp (hạng 2) có lợi hơn.
- **Ưu tiên code nhanh, ít lỗi chỉ số** ⇒ memo top-down viết thẳng từ định nghĩa, chấp nhận O(n) stack với n ≤ 100.
