## Bài toán

Koko có `n` đống chuối, đống thứ `i` có `piles[i]` quả. Lính gác quay lại sau `h` giờ (`h ≥ n`). Mỗi giờ Koko chọn **một** đống và ăn tối đa `k` quả từ đống đó; nếu đống còn ít hơn `k` quả, cô ăn hết đống và **không** chuyển sang đống khác trong giờ đó. Tìm tốc độ nguyên `k` **nhỏ nhất** để ăn hết toàn bộ chuối trong `h` giờ.

Ví dụ: `piles = [3, 6, 7, 11]`, `h = 8` ⇒ `k = 4` (mất 1 + 2 + 2 + 3 = 8 giờ). Với `k = 3` cần 1 + 2 + 3 + 4 = 10 giờ – không kịp.

## Ý tưởng / Trực giác

Thay vì tìm kiếm trên **mảng đầu vào**, ta tìm kiếm trên **không gian đáp án**: tốc độ `k` chỉ có thể nằm trong `[1, max(piles)]`. Tốc độ lớn hơn `max(piles)` vô ích vì mỗi đống đã mất đúng 1 giờ.

Định nghĩa vị từ `canFinish(k) = (Σ ceil(p / k)) ≤ h`. Điểm mấu chốt: vị từ này **đơn điệu** (monotonic predicate). Ăn nhanh hơn không bao giờ làm tốn thêm giờ, nên khi `k` tăng, tổng giờ chỉ giảm hoặc giữ nguyên. Vì vậy trên trục `k = 1, 2, …, max` các giá trị của vị từ có dạng:

```
false false false … false true true … true
```

Đáp án là **điểm chuyển** – chỉ số `true` đầu tiên. Bất cứ khi nào bạn thấy một chuỗi dạng "toàn false rồi toàn true", binary search tìm điểm chuyển trong `O(log M)` phép thử, mỗi phép thử tốn `O(n)`.

Đây chính là pattern **"binary search on the answer"**: đề hỏi "giá trị nhỏ nhất/lớn nhất sao cho điều kiện X thỏa", và kiểm tra X với một giá trị cố định thì dễ (thường là tham lam O(n)).

## Thuật toán từng bước

1. `lo = 1`, `hi = max(piles)` – khoảng chắc chắn chứa đáp án (`hi` luôn thỏa).
2. Trong khi `lo < hi`:
   - `mid = lo + ⌊(hi − lo) / 2⌋` (viết như vậy để tránh tràn số ở ngôn ngữ có int 32 bit).
   - Tính `hours = Σ ceil(p / mid)`.
   - Nếu `hours ≤ h`: `mid` đủ nhanh ⇒ đáp án nằm trong `[lo, mid]` ⇒ `hi = mid`.
   - Ngược lại: `mid` quá chậm ⇒ đáp án nằm trong `[mid + 1, hi]` ⇒ `lo = mid + 1`.
3. Khi `lo == hi`, trả về `lo`.

Chú ý cặp `hi = mid` (không trừ 1) và `mid` làm tròn **xuống**: nhờ vậy khi còn 2 phần tử, `mid = lo`, và mỗi nhánh đều thu hẹp khoảng ít nhất 1 ⇒ vòng lặp luôn dừng.

## Chứng minh đúng

**Bất biến:** đáp án `k*` luôn nằm trong `[lo, hi]`, và `canFinish(hi)` đúng.

- Khởi tạo: `canFinish(max(piles))` đúng vì tổng giờ là `n ≤ h`; `k* ≥ 1` hiển nhiên.
- Nếu `canFinish(mid)` đúng thì `k* ≤ mid` (k* là nhỏ nhất) ⇒ gán `hi = mid` giữ bất biến.
- Nếu `canFinish(mid)` sai thì theo tính đơn điệu mọi `k ≤ mid` đều sai ⇒ `k* ≥ mid + 1` ⇒ gán `lo = mid + 1` giữ bất biến.
- Kích thước khoảng giảm nghiêm ngặt mỗi vòng (vì `lo ≤ mid < hi`), nên vòng lặp kết thúc với `lo == hi == k*`.

Tính đơn điệu: với `k1 < k2`, ta có `ceil(p/k1) ≥ ceil(p/k2)` cho mọi `p`, cộng lại được `hours(k1) ≥ hours(k2)`.

## Độ phức tạp

| Thành phần | Chi phí |
|---|---|
| Số vòng binary search | `O(log M)`, `M = max(piles)` |
| Mỗi lần kiểm tra vị từ | `O(n)` |
| Tổng thời gian | `O(n · log M)` |
| Bộ nhớ phụ | `O(1)` |

Với `n = 10⁴`, `M = 10⁹`: khoảng 30 × 10⁴ = 3·10⁵ phép tính – rất nhanh. Duyệt tuyến tính mọi `k` sẽ là `O(n · M)` – không khả thi.

## Tradeoff

- **Duyệt tuyến tính k từ 1 lên:** dễ viết, đúng, nhưng `O(n · M)`. Chỉ dùng được khi `M` nhỏ.
- **Thu hẹp cận:** có thể đặt `lo = ceil(Σp / h)` (không thể nhanh hơn trung bình) để giảm vài vòng, nhưng không đổi độ phức tạp tiệm cận.
- **Template `lo <= hi` với biến `ans`:** cũng đúng, nhưng dễ nhầm điều kiện cập nhật. Template `lo < hi` + `hi = mid` gọn hơn cho bài "tìm true đầu tiên".

## Lợi / Hại

**Lợi:** độ phức tạp log theo miền giá trị, code ngắn, áp dụng cho cả họ bài tối ưu hóa có vị từ đơn điệu.

**Hại:** cần **chứng minh** được tính đơn điệu – nếu vị từ không đơn điệu, binary search cho kết quả sai mà không báo lỗi. Ngoài ra phải xác định đúng cận `[lo, hi]` chứa đáp án.

## Use case thực tế

- **Capacity planning:** tìm số máy/throughput nhỏ nhất để xử lý hàng đợi job trong SLA.
- **Rate limiting / batching:** chọn batch size nhỏ nhất để hoàn thành ETL trong cửa sổ bảo trì.
- **Video streaming:** chọn bitrate lớn nhất mà buffer không cạn (vị từ đơn điệu theo bitrate).
- **`git bisect`:** tìm commit đầu tiên gây lỗi – cùng ý tưởng "điểm chuyển false → true".

## Lỗi thường gặp

- Dùng `p / k` chia nguyên thay vì `ceil` – đống lẻ vẫn tốn trọn một giờ. Trong ngôn ngữ int, viết `(p + k − 1) / k`.
- Đặt `lo = 0` ⇒ chia cho 0 khi `mid = 0`.
- Viết `hi = mid − 1` với template `lo < hi` ⇒ có thể bỏ lỡ chính đáp án.
- Tổng `hours` tràn int 32 bit khi `k` nhỏ và `piles` lớn – dùng `long` hoặc dừng sớm khi `hours > h`.
- Nhầm hướng: `hours ≤ h` nghĩa là **đủ nhanh** ⇒ thu `hi`, không phải `lo`.

## Biến thể

- **LC 1011 – Capacity To Ship Packages:** tìm tải trọng nhỏ nhất để ship trong D ngày, cận `[max(w), Σw]`.
- **LC 410 – Split Array Largest Sum:** tối thiểu hóa tổng lớn nhất khi chia mảng thành m đoạn.
- **LC 1482 – Minimum Days to Make m Bouquets:** binary search trên số ngày.
- **LC 774 – Minimize Max Distance to Gas Station:** binary search trên số thực, dừng theo độ chính xác ε.
- **Tìm lớn nhất thỏa** (vị từ dạng true…true false…false): đổi sang `mid` làm tròn lên và `lo = mid`.
