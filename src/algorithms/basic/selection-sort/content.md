## Bài toán

Sắp xếp mảng `n` số tăng dần. Selection Sort cùng "lớp" O(n²) với Bubble và Insertion Sort, nhưng có một tính chất độc nhất: **số lần hoán đổi tối đa n−1**, ít nhất trong mọi thuật toán sắp xếp dựa trên so sánh. Người phỏng vấn dùng nó để hỏi về **stable sort** (Selection Sort không stable, và đó là câu hỏi bẫy) và về tradeoff giữa chi phí đọc và chi phí ghi.

## Ý tưởng / Trực giác

Chia mảng thành hai phần: bên trái đã sắp xếp (ban đầu rỗng), bên phải chưa sắp xếp. Mỗi lượt, **tìm phần tử nhỏ nhất** của phần chưa sắp xếp và đưa nó về đầu phần đó bằng **một** hoán đổi. Phần đã sắp xếp lớn thêm một.

Khác Bubble Sort (hoán đổi liên tục trong lúc so sánh), Selection Sort chỉ **ghi nhớ vị trí** min rồi hoán đổi một lần. Vì vậy nó đọc nhiều nhưng ghi rất ít.

## Thuật toán từng bước

1. Với `i` từ `0` đến `n-2`:
   - `minIdx = i`.
   - Với `j` từ `i+1` đến `n-1`: nếu `a[j] < a[minIdx]` thì `minIdx = j`.
   - Nếu `minIdx ≠ i`: hoán đổi `a[i]` ↔ `a[minIdx]`.
2. Trả `a`.

Tab **Debug**: cột tím là min tạm thời, cột vàng đang so sánh, vùng xanh lá bên trái là phần đã sắp xếp. Preset "Mất stable" `[4, 2, 4, 1]`: hãy theo dõi hai số 4 đổi chỗ cho nhau sau lượt đầu.

## Chứng minh đúng

**Bất biến:** trước lượt `i`, `a[0..i)` chứa `i` phần tử nhỏ nhất của mảng, theo thứ tự tăng dần.

- Khởi tạo: `i = 0`, đoạn rỗng – đúng.
- Duy trì: vòng trong tìm đúng min của `a[i..n)` (quy nạp theo `j`: `a[minIdx]` là min của `a[i..j]`). Hoán đổi đưa min về `a[i]`. Vì mọi phần tử trong `a[0..i)` ≤ min này (chúng là `i` phần tử nhỏ nhất), `a[0..i]` vẫn tăng dần và là `i+1` phần tử nhỏ nhất.
- Kết thúc: `i = n−1` ⇒ `n−1` phần tử nhỏ nhất đã đúng chỗ, phần tử còn lại là lớn nhất ⇒ sắp xếp.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian (mọi trường hợp) | O(n²) | Luôn n(n−1)/2 so sánh, không dừng sớm được |
| Hoán đổi | ≤ n−1 | Mỗi lượt tối đa 1 hoán đổi |
| Bộ nhớ | O(1) | In-place |

Không giống Bubble/Insertion, Selection Sort **không adaptive**: mảng đã sắp xếp vẫn tốn O(n²) so sánh vì không có cách nào biết min mà không quét.

## Tradeoff

- **Ít ghi ↔ Nhiều đọc:** O(n) ghi, O(n²) đọc. Thắng khi ghi đắt: bộ nhớ flash/EEPROM có giới hạn số lần ghi, hoặc phần tử là object lớn mà hoán đổi tốn nhiều (dù trong JS chỉ đổi tham chiếu).
- **Không stable:** hoán đổi "nhảy xa" làm phần tử bằng nhau đổi thứ tự. Có thể làm stable bằng cách **chèn** thay vì hoán đổi (dịch đoạn `a[i..minIdx)` sang phải) – nhưng lúc đó O(n²) ghi, mất lợi thế.
- **Không adaptive ↔ Đơn giản:** Insertion Sort nhanh hơn với dữ liệu gần sắp xếp; Selection Sort có thời gian **dự đoán được** (luôn như nhau) – hữu ích trong hệ thống thời gian thực cần worst case ổn định.
- **Selection ↔ Heap Sort:** Heap Sort chính là Selection Sort với "tìm min" được tăng tốc bằng heap O(log n) ⇒ O(n log n).

## Lợi / Hại

**Lợi**
- Số hoán đổi tối thiểu (n−1).
- Thời gian chạy không phụ thuộc dữ liệu – dễ dự đoán.
- Code đơn giản, O(1) bộ nhớ.

**Hại**
- Luôn O(n²), kể cả mảng đã sắp xếp.
- Không stable.
- Thực tế chậm hơn Insertion Sort với n nhỏ.

## Use case thực tế

- **Bộ nhớ giới hạn số lần ghi** (flash, EEPROM trên vi điều khiển): tối thiểu hoá ghi quan trọng hơn so sánh.
- **Top-k nhỏ:** chạy `k` lượt Selection Sort để lấy k phần tử nhỏ nhất trong O(n·k) – đơn giản hơn heap khi k ≤ 3.
- **Hệ thống nhúng / thời gian thực:** cần worst case cố định, không cần nhanh.
- **Nền của Heap Sort:** hiểu Selection Sort để hiểu vì sao Heap Sort là O(n log n).

## Lỗi thường gặp

1. Hoán đổi ngay trong vòng trong (thành Bubble Sort biến thể, mất lợi thế ít ghi).
2. Chạy `i` tới `n−1` thay vì `n−2` – không sai nhưng thừa một lượt.
3. Tin rằng Selection Sort stable – sai; test `[4a, 2, 4b, 1]`.
4. Dùng `<=` trong so sánh min ⇒ chọn min **cuối cùng**, hoán đổi nhiều hơn mà không có lợi.
5. Thêm "dừng sớm" khi một lượt không hoán đổi – **sai**: lượt không hoán đổi chỉ nói `a[i]` đã là min của phần còn lại, không nói phần còn lại đã sắp xếp (ví dụ `[1, 3, 2]`).

## Biến thể

- **Double Selection Sort:** mỗi lượt tìm cả min và max, đưa về hai đầu ⇒ giảm một nửa số lượt (vẫn O(n²)).
- **Stable Selection Sort:** chèn thay vì hoán đổi.
- **Heap Sort:** dùng heap để tìm min/max O(log n).
- **Partial Selection (top-k):** dừng sau k lượt.
