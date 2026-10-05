## Bài toán

Cho mảng `nums`, cần trả lời nhiều truy vấn "tổng các phần tử từ `l` đến `r`" nhanh. Mở rộng: đếm số subarray có tổng đúng bằng `k` (kể cả khi có số âm).

Prefix Sum là kỹ thuật tiền xử lý đơn giản nhất nhưng xuất hiện trong khoảng 10% bài mảng ở Meta và Amazon, thường dưới dạng ẩn: "subarray tổng k", "pivot index", "tổng hình chữ nhật trong ma trận", "số lượng đoạn chia hết cho k". Nó cũng là nền của Fenwick tree và nhiều bài DP.

## Ý tưởng / Trực giác

Định nghĩa `prefix[i]` = tổng `i` phần tử đầu (`prefix[0] = 0`). Khi đó mọi tổng đoạn là **hiệu hai prefix**: `sum(l..r) = prefix[r+1] − prefix[l]`. Tính prefix một lần O(n), trả lời mỗi truy vấn O(1).

Giống như đồng hồ công tơ mét: để biết quãng đường từ A đến B, chỉ cần số ở B trừ số ở A, không cần đo lại từng đoạn.

**Đếm subarray tổng k:** `sum(l..r) = k` ⇔ `prefix[l] = prefix[r+1] − k`. Duyệt `r`, hỏi HashMap "đã gặp bao nhiêu prefix bằng `prefix[r+1] − k`?" – chính xác pattern Two Sum trên mảng prefix. Hoạt động với số âm, điều mà sliding window không làm được.

## Thuật toán từng bước

**Build:** `prefix[0] = 0`; `prefix[i+1] = prefix[i] + nums[i]`.
**Query:** `prefix[r+1] − prefix[l]`.
**Đếm tổng k:** `seen = {0: 1}`, `run = 0`, `count = 0`; với mỗi `x`: `run += x`; `count += seen[run − k]`; `seen[run]++`.

Tab **Debug**: hàng prefix điền dần; truy vấn tô vùng đoạn và hai ô prefix được trừ; phần đếm hiển thị Map prefix → số lần gặp.

## Chứng minh đúng

**Tổng đoạn:** `prefix[r+1] = nums[0] + … + nums[r]`, `prefix[l] = nums[0] + … + nums[l−1]`. Hiệu = `nums[l] + … + nums[r]`. `prefix[0] = 0` làm trường hợp `l = 0` không cần xử lý riêng.

**Đếm tổng k:** tại bước `r` (sau khi cộng `nums[r]`, `run = prefix[r+1]`), `seen` chứa số lần xuất hiện của `prefix[0..r]` (bất biến: ghi sau khi đếm). Số subarray kết thúc tại `r` có tổng k = số `l ≤ r` với `prefix[l] = run − k` = `seen[run − k]`. Cộng dồn qua mọi `r` ⇒ đếm đủ, không trùng (mỗi cặp `(l, r)` đếm đúng một lần tại `r`).

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Build prefix | O(n) / O(n) | |
| Mỗi truy vấn tổng đoạn | O(1) | Hai phép đọc, một phép trừ |
| Đếm subarray tổng k | O(n) / O(n) | Map tối đa n+1 entry |
| Không tiền xử lý | O(n) mỗi truy vấn | q truy vấn ⇒ O(q·n) |

## Tradeoff

- **Prefix sum (tĩnh) ↔ Fenwick / Segment tree (động):** nếu `nums` **thay đổi** sau khi build, prefix phải tính lại O(n); Fenwick tree cho cả cập nhật và truy vấn O(log n).
- **Prefix sum + Map ↔ Sliding window:** sliding window O(1) bộ nhớ nhưng chỉ đúng khi mọi phần tử không âm (tính đơn điệu). Có số âm ⇒ bắt buộc prefix + Map.
- **Lưu `prefix` n+1 phần tử ↔ Tích luỹ trong một biến:** bài đếm chỉ cần biến chạy `run`; bài truy vấn ngẫu nhiên cần mảng.
- **2D:** prefix 2D `P[i][j]` cho tổng hình chữ nhật O(1) với công thức bao hàm – loại trừ; tốn O(m·n) bộ nhớ.
- **Tràn số:** tổng tiền tố lớn; trong JS an toàn tới 2⁵³, Java/C++ cần `long`.

## Lợi / Hại

**Lợi**
- Cực đơn giản, O(1) truy vấn.
- Kết hợp Map giải được lớp bài "subarray thoả điều kiện về tổng" với số âm.
- Mở rộng sang prefix XOR, prefix tích, prefix đếm (số lần xuất hiện), 2D.

**Hại**
- Dữ liệu tĩnh; cập nhật tốn O(n).
- O(n) bộ nhớ phụ.
- Không trực tiếp trả lời "max/min đoạn" (cần sparse table / segment tree).

## Use case thực tế

- **Analytics / time-series:** tổng doanh thu giữa hai ngày bất kỳ, tích luỹ lượt xem – mọi dashboard dùng cumulative sum.
- **Ảnh / thị giác máy tính:** integral image (prefix 2D) cho Haar features (Viola–Jones), box blur O(1) mỗi pixel.
- **Database:** window function `SUM() OVER (ORDER BY …)`, cột cumulative.
- **Hệ thống phân trang / offset:** vị trí byte bắt đầu của bản ghi thứ i = prefix độ dài.
- **Scheduling / difference array:** cộng một giá trị lên đoạn [l, r] cho nhiều truy vấn rồi lấy prefix một lần (xếp lịch họp, đặt chỗ máy bay).
- **Xác suất / lấy mẫu có trọng số:** prefix của trọng số + binary search.

## Lỗi thường gặp

1. Dùng `prefix` có n phần tử (không có `prefix[0] = 0`) ⇒ trường hợp `l = 0` phải xử lý riêng, dễ sai.
2. Quên `seen[0] = 1` ⇒ bỏ sót subarray bắt đầu từ đầu mảng.
3. Ghi `seen[run]++` **trước** khi đếm ⇒ đếm nhầm subarray rỗng khi k = 0.
4. Dùng sliding window cho bài tổng k với số âm ⇒ sai.
5. Lệch 1 giữa `r` và `r+1`.
6. Tràn số nguyên trong ngôn ngữ 32-bit.

## Biến thể

- **Pivot Index (724):** tìm i với `prefix[i] = total − prefix[i+1]`.
- **Subarray Sums Divisible by K (974):** Map theo `prefix mod k` (chuẩn hoá số âm).
- **Maximum Size Subarray Sum Equals k (325):** Map prefix → chỉ số đầu tiên, lấy độ dài lớn nhất.
- **Contiguous Array (525):** đổi 0 thành −1, tìm subarray tổng 0 dài nhất.
- **Range Sum Query 2D (304):** prefix 2D.
- **Difference array:** cập nhật đoạn O(1), phục hồi bằng prefix.
- **Prefix XOR:** đếm subarray có XOR = k (1442).
