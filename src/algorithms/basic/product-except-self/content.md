## Bài toán

Cho mảng số nguyên `nums` độ dài n, trả về mảng `answer` với `answer[i]` = tích của **mọi phần tử trừ `nums[i]`**. Ràng buộc của LeetCode 238: **không dùng phép chia**, chạy O(n), và (follow-up) chỉ dùng O(1) bộ nhớ phụ – mảng output không tính.

Ví dụ: `[1, 2, 3, 4]` ⇒ `[24, 12, 8, 6]`. Với `[-1, 1, 0, -3, 3]` ⇒ `[0, 0, 9, 0, 0]`.

Đây là một trong những câu "Array" được hỏi nhiều nhất ở Amazon, Meta, Apple: đề ngắn, lời giải ngắn, nhưng kiểm tra bạn có nhận ra **tách bài toán thành "bên trái" × "bên phải"** – cùng tư duy với prefix sum.

Trang **Nhiều lời giải** (/compare/product-except-self) so sánh trực tiếp brute force O(n²), cách dùng phép chia (và bẫy số 0), hai mảng prefix/suffix O(n) bộ nhớ và cách tối ưu O(1) trình bày ở đây.

## Ý tưởng / Trực giác

Tích mọi phần tử trừ `nums[i]` = (tích mọi thứ **bên trái** i) × (tích mọi thứ **bên phải** i). Hai đại lượng này chính là **prefix product** và **suffix product** – giống prefix sum nhưng thay `+` bằng `×` và phần tử đơn vị 0 bằng 1.

Cách trực tiếp: tạo hai mảng `L` và `R` rồi nhân từng ô – O(n) bộ nhớ phụ. Để xuống O(1), nhận xét:
1. Mảng output được phép dùng miễn phí ⇒ lưu `L` ngay trong `answer`.
2. `R` chỉ cần đọc theo thứ tự từ phải sang trái, mỗi giá trị dùng đúng một lần ⇒ thay bằng **một biến chạy** `suffix`.

Hình dung một hàng người: lượt đi, mỗi người nhận "tích của những người phía trước"; lượt về, một người cầm "tích của những người phía sau" đi ngược và nhân vào từng người.

## Thuật toán từng bước

1. `answer = [1, 1, …, 1]`, `prefix = 1` (tích rỗng).
2. Duyệt `i = 0 → n−1`: `answer[i] = prefix` (**trước** khi nhân) rồi `prefix *= nums[i]`.
3. `suffix = 1`. Duyệt `i = n−1 → 0`: `answer[i] *= suffix` rồi `suffix *= nums[i]`.
4. Trả `answer`.

Trong JavaScript, `-1 × 0 = -0`; impl cộng thêm `+ 0` để chuẩn hoá `-0` thành `0`, tránh so sánh `toEqual` thất bại và tránh in ra `-0`.

Tab **Debug**: hàng `nums` tô cyan phần đã nhân vào prefix, vàng phần đã nhân vào suffix, tím phần tử đang bỏ qua; hàng `answer` cho thấy giá trị được ghi rồi nhân thêm.

## Chứng minh đúng

**Bất biến lượt 1:** đầu vòng i, `prefix = nums[0] × … × nums[i−1]` (bằng 1 khi i = 0). Ghi `answer[i] = prefix` rồi nhân `nums[i]` giữ bất biến cho i+1. Sau lượt 1: `answer[i] = L[i]`.

**Bất biến lượt 2:** đầu vòng i (đi ngược), `suffix = nums[i+1] × … × nums[n−1]` (1 khi i = n−1). Sau `answer[i] *= suffix`, `answer[i] = L[i] × R[i]` = tích mọi phần tử trừ `nums[i]`. Nhân `nums[i]` vào suffix giữ bất biến cho i−1. Mỗi ô được nhân đúng một lần ở lượt 2 nên không có ô nào bị nhân thừa.

Không có phép chia nên các số 0 không gây lỗi: ô nào có 0 ở trái/phải thì tích tự nhiên bằng 0.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ phụ | Ghi chú |
|---|---|---|---|
| Brute force (2 vòng lồng) | O(n²) | O(1) | Quá chậm với n = 10⁵ |
| Tổng tích ÷ nums[i] | O(n) | O(1) | Vi phạm đề; sai/ phải xử lý riêng khi có 0 |
| Hai mảng L, R | O(n) | O(n) | Dễ hiểu nhất |
| **Prefix trong output + biến suffix** | **O(n)** | **O(1)** | Lời giải tối ưu |

## Tradeoff

- **Hai mảng L/R ↔ một biến suffix:** hai mảng dễ giải thích và debug hơn; bản O(1) tiết kiệm bộ nhớ nhưng ghi đè output nên khó "nhìn" giá trị trung gian. Trong phỏng vấn, trình bày L/R trước rồi tối ưu là chiến lược an toàn.
- **Phép chia ↔ không chia:** chia nhanh để nghĩ nhưng phải đếm số 0 (0 số 0 / 1 số 0 / ≥ 2 số 0) và không áp dụng được cho phép toán không có nghịch đảo (XOR có nghịch đảo, còn max, min, gcd thì không).
- **Tràn số:** tích tăng rất nhanh; LeetCode đảm bảo tích vừa 32-bit, nhưng thực tế cần `BigInt`/modulo hoặc làm việc với log.

## Lợi / Hại

**Lợi**
- O(n), hai lượt tuyến tính, cache-friendly.
- O(1) bộ nhớ phụ; không phép chia ⇒ xử lý số 0 tự nhiên.
- Tổng quát hoá cho mọi phép toán kết hợp (associative): tổng, max, min, gcd, OR…

**Hại**
- Hai lượt duyệt, không làm "online" được (cần biết toàn bộ mảng).
- Tích dễ tràn; `-0` trong JS cần chuẩn hoá.
- Ghi đè output khiến code khó đọc hơn bản L/R.

## Use case thực tế

- **"Leave-one-out" trong thống kê / ML:** tính đại lượng tổng hợp trừ từng phần tử (jackknife, cross-validation) mà không tính lại từ đầu.
- **Xác suất độc lập:** xác suất mọi sự kiện khác xảy ra = tích các xác suất trừ một – dùng trong mô hình độ tin cậy hệ thống (reliability) khi phân tích từng linh kiện.
- **Mật mã / số học modulo:** khi modulo không nguyên tố, không có nghịch đảo để chia ⇒ bắt buộc prefix × suffix (ví dụ trong secret sharing, CRT).
- **Xử lý tín hiệu / bảng điều khiển:** max/min của mọi kênh trừ một kênh dùng cùng kỹ thuật prefix–suffix.

## Lỗi thường gặp

1. Nhân `nums[i]` **trước** khi ghi `answer[i]` ⇒ answer chứa chính nó.
2. Khởi tạo `prefix`/`suffix` = 0 thay vì 1 ⇒ mọi thứ thành 0.
3. Dùng phép chia và quên trường hợp có số 0 (chia cho 0 ra `Infinity`/`NaN`).
4. Quên rằng JS sinh `-0` (ví dụ `-1 × 0`) ⇒ `toEqual([0])` thất bại; chuẩn hoá bằng `x + 0` hoặc `x || 0`.
5. Lặp lượt 2 sai chiều hoặc lệch chỉ số `n − 1`.

## Biến thể

- **Trapping Rain Water (42):** prefix max và suffix max – cùng khung "trái × phải".
- **Find Pivot Index (724):** prefix sum so với suffix sum.
- **Maximum Product Subarray (152):** theo dõi max và min tích kết thúc tại i (số âm đảo dấu).
- **Candy (135), Shortest Distance to a Character (821):** hai lượt trái → phải và phải → trái.
- **Range product query với cập nhật:** segment tree lưu tích (có modulo).
