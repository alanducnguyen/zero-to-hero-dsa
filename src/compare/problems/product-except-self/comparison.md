## Phân tích

Mấu chốt: `answer[i] = (tích bên trái i) × (tích bên phải i)`. Bốn lời giải khác nhau ở chỗ tính hai đại lượng này thế nào.

**Brute force** tính lại tích từ đầu cho mỗi `i` ⇒ n(n−1) phép nhân, O(n²). Đúng, O(1) bộ nhớ, nhưng n = 10⁵ là 10¹⁰ phép – không chạy kịp. Lãng phí nằm ở chỗ `answer[i]` và `answer[i+1]` chia sẻ gần như toàn bộ các thừa số mà không tái dùng được gì.

**Tích toàn bộ rồi chia** là ý tưởng đầu tiên của hầu hết mọi người: O(n), O(1). Nhưng (1) **đề cấm phép chia**; (2) số 0 làm hỏng ngây thơ `total / nums[i]` – một số 0 khiến vị trí đó thành 0/0 = NaN, phải đếm số 0 và xử lý ba trường hợp (0, 1, ≥ 2 số 0); (3) với số thực, phép chia gây sai số làm tròn, và trong số học modulo (bài biến thể "tích mod p") chia cần nghịch đảo modulo – không tồn tại khi `nums[i]` chia hết cho p. Nêu được những lý do này cho thấy bạn hiểu *tại sao* đề cấm chia.

**Prefix + suffix hai mảng** tách công thức thành hai mảng tích luỹ: `prefix[i] = prefix[i−1]·nums[i−1]`, `suffix[i] = suffix[i+1]·nums[i+1]`. Ba lượt O(n), không chia, số 0 tự đúng. Tốn thêm 2n ô nhớ.

**Prefix trong output + suffix chạy** là nhận xét tiếp theo: mảng `prefix` có thể ghi thẳng vào `answer`, và khi đi ngược ta chỉ cần *tích của phần đã đi qua* ⇒ một biến `suffix`. Hai lượt, O(1) bộ nhớ phụ. Cái giá duy nhất: thứ tự hai lệnh trong vòng ngược phải đúng (dùng `suffix` rồi mới nhân `nums[i]`).

| | Brute force | Chia | Prefix + suffix | Prefix + suffix chạy |
|---|---|---|---|---|
| Thời gian | O(n²) | O(n) | O(n) | O(n) |
| Bộ nhớ phụ | O(1) | O(1) | O(n) | O(1) |
| Không chia | ✓ | ✗ | ✓ | ✓ |
| Xử lý số 0 | tự nhiên | phải đếm riêng | tự nhiên | tự nhiên |

## Xếp hạng

1. **Prefix trong output + suffix chạy** – O(n), O(1) phụ, không chia. Đáp án cuối cùng được kỳ vọng.
2. **Prefix + suffix hai mảng** – cùng ý tưởng, dễ giải thích hơn; nên trình bày làm bước đệm rồi tối ưu bộ nhớ.
3. **Chia** – O(n)/O(1) nhưng vi phạm ràng buộc đề và phải xử lý số 0; chỉ dùng khi được phép chia và dữ liệu là số nguyên.
4. **Brute force** – O(n²), chỉ để khởi động.

## Khi nào thứ hạng đổi

- Được phép chia, dữ liệu số nguyên, cần code ngắn nhất ⇒ lời giải **chia** (có đếm số 0) chấp nhận được.
- Mảng thay đổi liên tục và hỏi tích trừ một vị trí nhiều lần ⇒ **segment tree** lưu tích đoạn: cập nhật và truy vấn O(log n).
- Cần tích mọi đoạn `[l, r]` (không chỉ "trừ một phần tử") ⇒ prefix product + chia chỉ đúng khi không có số 0; tổng quát hơn dùng sparse table / segment tree.
