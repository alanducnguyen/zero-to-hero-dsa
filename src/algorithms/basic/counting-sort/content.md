## Bài toán

Sắp xếp `n` số nguyên nằm trong miền `[0, k]` với `k` nhỏ (ví dụ điểm thi 0–100, tuổi, mã màu). Counting Sort làm việc này trong **O(n + k)** – nhanh hơn mọi thuật toán so sánh khi `k = O(n)`.

Người phỏng vấn hỏi Counting Sort để kiểm tra bạn có biết **giới hạn Ω(n log n) chỉ áp dụng cho sắp xếp bằng so sánh** không, và bạn có nhận ra khi nào dữ liệu cho phép vượt giới hạn đó. Sort Colors (LeetCode 75) và H-Index (274) là hai bài ứng dụng trực tiếp.

## Ý tưởng / Trực giác

Thay vì so sánh các phần tử với nhau, **đếm** mỗi giá trị xuất hiện bao nhiêu lần. Có bảng đếm rồi, sắp xếp chỉ là "xuất ra 0 `count[0]` lần, rồi 1 `count[1]` lần, …".

Để giữ **stable** (phần tử bằng nhau giữ thứ tự ban đầu – cần cho Radix Sort và cho sắp xếp object theo key), thêm bước **cộng dồn**: `count[v]` = số phần tử ≤ `v` = vị trí cuối cùng mà giá trị `v` chiếm. Rồi duyệt input **từ phải sang trái**, đặt mỗi phần tử vào `count[x] − 1` và giảm `count[x]`.

## Thuật toán từng bước

1. `k = max(a)`; `count[0..k] = 0`.
2. Đếm: `count[x]++` cho mỗi `x`.
3. Cộng dồn: `count[v] += count[v−1]` cho `v = 1..k`.
4. Duyệt `i` từ `n−1` về `0`: `count[a[i]]--`; `out[count[a[i]]] = a[i]`.

Tab **Debug**: ba hàng input / count / out. Giai đoạn đếm cột count mọc lên; giai đoạn cộng dồn count thành "vị trí"; giai đoạn đặt, duyệt ngược và các ô out được điền từ phải vào cho mỗi giá trị. Preset "Nhiều trùng" cho thấy stable.

## Chứng minh đúng

**Sau cộng dồn:** `count[v]` = số phần tử có giá trị ≤ `v`. Vậy các phần tử giá trị `v` chiếm đúng các vị trí `count[v−1] .. count[v]−1` trong mảng sắp xếp.

**Đặt phần tử:** duyệt ngược, phần tử giá trị `v` gặp đầu tiên (tức là phần tử **cuối cùng** trong input) được đặt vào `count[v]−1` – vị trí cuối của khối `v`; phần tử `v` tiếp theo (đứng trước trong input) vào vị trí liền trước. Vậy thứ tự tương đối được giữ ⇒ **stable**. Mỗi vị trí trong khối được dùng đúng một lần ⇒ không ghi đè.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n + k) | Đếm O(n), cộng dồn O(k), đặt O(n) |
| Bộ nhớ | O(n + k) | `count` k+1 phần tử, `out` n phần tử |
| Khi k = O(n) | O(n) | Tuyến tính – vượt Ω(n log n) |
| Khi k ≫ n | Tệ | Ví dụ n = 10 số trong [0, 10⁹]: O(10⁹) |

## Tradeoff

- **Miền giá trị nhỏ ↔ Tổng quát:** Counting Sort chỉ dùng được cho số nguyên (hoặc key ánh xạ được về số nguyên nhỏ). Miền lớn ⇒ Radix Sort (Counting Sort theo từng chữ số) hoặc quay về so sánh.
- **Stable (3 bước) ↔ Không stable (2 bước):** nếu chỉ cần sắp xếp số nguyên thuần, bỏ cộng dồn và xuất trực tiếp từ bảng đếm – ít code, ít bộ nhớ (không cần `out`).
- **Bộ nhớ O(k):** với k = 2³², bảng đếm 16 GB – không khả thi; Radix với 8 bit/lần chỉ cần 256 ô.
- **Số âm:** dịch `offset = −min` để đưa về [0, k].
- **Cache:** với k lớn, truy cập `count[x]` ngẫu nhiên gây cache miss; Radix Sort chọn số bit mỗi lượt để `count` vừa cache L1.

## Lợi / Hại

**Lợi**
- Tuyến tính khi miền nhỏ; stable; đơn giản; không đệ quy.
- Là bước con của Radix Sort và Bucket Sort.
- Bảng đếm dùng được cho nhiều việc khác: histogram, mode, H-Index.

**Hại**
- Phụ thuộc miền giá trị; vô dụng với float hoặc key lớn/rời rạc.
- O(n + k) bộ nhớ phụ, không in-place.

## Use case thực tế

- **Sắp xếp theo khoá nhỏ:** điểm (0–100), tuổi, mã quốc gia, mức ưu tiên, byte (0–255).
- **Radix Sort:** sắp xếp số nguyên 32/64-bit, chuỗi độ dài cố định (biển số, mã sản phẩm) – nhanh hơn Quick Sort trên mảng lớn.
- **Histogram / phân tích ảnh:** cân bằng histogram, đếm pixel theo cường độ.
- **Database / analytics:** GROUP BY và sắp xếp theo cột có ít giá trị phân biệt (low-cardinality).
- **Suffix array, DC3:** dùng counting sort tuyến tính ở lõi.
- **Sort Colors (Dutch flag):** đếm 3 giá trị rồi ghi lại – hoặc 3-way partition một lượt.

## Lỗi thường gặp

1. Dùng `count` với giá trị âm ⇒ chỉ số âm; cần offset.
2. Quên cộng dồn rồi dùng `count[x]` làm vị trí ⇒ ghi đè.
3. Duyệt xuôi thay vì ngược ở bước đặt ⇒ mất stable (vẫn đúng giá trị).
4. `k` lấy từ giá trị lớn nhất nhưng input có thể rỗng ⇒ `Math.max()` = −Infinity.
5. Dùng cho float / chuỗi mà không ánh xạ về số nguyên nhỏ.
6. `new Array(k+1)` với k = 10⁹ ⇒ hết bộ nhớ – cần kiểm tra k trước.

## Biến thể

- **Phiên bản không stable:** xuất thẳng từ bảng đếm.
- **Radix Sort (LSD):** counting sort stable theo từng chữ số từ thấp lên cao, O(d·(n + b)).
- **Bucket Sort:** chia miền thành bucket, sắp xếp trong bucket (Insertion), tốt cho float phân bố đều.
- **Sort Colors (75):** 3 giá trị ⇒ đếm, hoặc Dutch National Flag một lượt O(1) bộ nhớ.
- **H-Index (274):** bảng đếm citations, duyệt ngược cộng dồn.
- **Maximum Gap (164):** bucket với kích thước ⌈(max−min)/(n−1)⌉, O(n).
