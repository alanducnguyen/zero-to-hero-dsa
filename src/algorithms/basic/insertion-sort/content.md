## Bài toán

Sắp xếp mảng `n` số tăng dần. Insertion Sort là thuật toán O(n²) **duy nhất được dùng trong production**: `std::sort` của C++, `Arrays.sort` của Java, TimSort của Python/V8 đều chuyển sang Insertion Sort khi đoạn con nhỏ hơn ~16–32 phần tử. Người phỏng vấn hỏi nó để xem bạn có hiểu vì sao một thuật toán "chậm" lại thắng trong thực tế.

## Ý tưởng / Trực giác

Hãy nghĩ cách bạn xếp bài trên tay: cầm lá bài mới, lướt từ phải sang trái qua những lá đã xếp, **dịch** những lá lớn hơn sang phải, rồi **chèn** lá mới vào chỗ trống. Phần bài trên tay luôn có thứ tự.

Điểm mấu chốt: mỗi bước **dịch** chỉ tốn 1 phép gán (không phải 3 như hoán đổi), và nếu lá mới đã lớn hơn lá cuối cùng thì không cần dịch gì cả. Đó là lý do nó **adaptive**: dữ liệu gần sắp xếp chạy gần O(n).

## Thuật toán từng bước

1. Với `i` từ `1` đến `n-1`:
   - `key = a[i]`, `j = i-1`.
   - Khi `j ≥ 0` và `a[j] > key`: `a[j+1] = a[j]`, `j--`.
   - `a[j+1] = key`.
2. Trả `a`.

Tab **Debug**: cột tím là `key`, vùng xanh là phần đã sắp xếp; mỗi bước đỏ là một phép dịch. Preset "Gần sắp xếp" cho thấy vòng while gần như không chạy; "Ngược" cho thấy worst case với n(n−1)/2 phép dịch.

## Chứng minh đúng

**Bất biến:** trước lượt `i`, `a[0..i)` là một hoán vị của `i` phần tử đầu **ban đầu**, đã sắp xếp tăng dần.

- Khởi tạo: `i = 1`, một phần tử – sắp xếp hiển nhiên.
- Duy trì: vòng while dịch các phần tử `> key` sang phải một ô, giữ nguyên thứ tự tương đối giữa chúng; dừng tại `j` đầu tiên (từ phải) có `a[j] ≤ key`. Chèn `key` vào `j+1` ⇒ `a[0..j] ≤ key < a[j+2..i]` ⇒ `a[0..i]` sắp xếp và chứa đúng `i+1` phần tử đầu.
- Kết thúc: `i = n` ⇒ toàn mảng sắp xếp.

**Stable:** điều kiện `a[j] > key` (ngặt) ⇒ phần tử bằng `key` không bị dịch qua ⇒ `key` nằm **sau** các phần tử bằng nó ⇒ thứ tự ban đầu được giữ.

## Độ phức tạp

| Trường hợp | So sánh | Dịch | Giải thích |
|---|---|---|---|
| Tốt nhất (đã sắp xếp) | n−1 | 0 | Mỗi key chỉ so sánh 1 lần |
| Trung bình | ~n²/4 | ~n²/4 | Mỗi key dịch qua nửa phần đã sắp xếp |
| Xấu nhất (ngược) | n(n−1)/2 | n(n−1)/2 | Mỗi key dịch qua toàn bộ |
| Bộ nhớ | O(1) | | In-place |

Chính xác hơn: thời gian = O(n + d) với d là số **nghịch thế** (cặp sai thứ tự). Mảng có ít nghịch thế ⇒ gần tuyến tính.

## Tradeoff

- **Insertion ↔ Selection:** Insertion ít so sánh hơn khi dữ liệu gần sắp xếp, nhiều phép ghi hơn (O(n²) dịch vs O(n) hoán đổi). Selection thắng khi ghi đắt; Insertion thắng hầu hết trường hợp còn lại.
- **Insertion ↔ Bubble:** cùng O(n²), cùng stable/adaptive, nhưng Insertion làm ~1/3 số phép gán (dịch 1 gán vs hoán đổi 3 gán) và truy cập bộ nhớ tuần tự hơn ⇒ nhanh hơn 2–3 lần.
- **Insertion ↔ Merge/Quick:** O(n²) vs O(n log n), nhưng Insertion có hằng số cực nhỏ, không đệ quy, không cấp phát. Giao điểm thực tế khoảng n ≈ 16–32, nên các thư viện dùng Insertion cho đoạn nhỏ.
- **Online:** Insertion Sort xử lý được phần tử đến **từng cái một** mà vẫn giữ mảng sắp xếp – Merge/Quick cần toàn bộ dữ liệu.
- **Binary Insertion Sort:** dùng binary search tìm vị trí chèn ⇒ O(n log n) so sánh, nhưng vẫn O(n²) dịch; có lợi khi so sánh đắt (so sánh chuỗi dài, gọi hàm comparator).

## Lợi / Hại

**Lợi**
- Nhanh nhất thực tế với n nhỏ hoặc dữ liệu gần sắp xếp.
- Stable, in-place, adaptive, online.
- Code ngắn, không đệ quy, dễ chứng minh.

**Hại**
- O(n²) worst/average – vô dụng với n lớn ngẫu nhiên.
- Trên mảng, mỗi lần chèn tốn O(n) dịch; linked list chèn O(1) nhưng tìm vị trí O(n).

## Use case thực tế

- **Bên trong mọi thư viện sort:** đoạn con < 16–32 phần tử trong introsort (C++), TimSort (Python, Java object, V8), pdqsort (Rust, Go).
- **Dữ liệu đến dần theo thời gian:** chèn sự kiện vào danh sách sắp xếp theo timestamp (timer list nhỏ, scheduler).
- **Gần sắp xếp sau cập nhật nhỏ:** bảng xếp hạng game sau mỗi trận, danh sách giá sau vài giao dịch.
- **Shell Sort:** Insertion Sort với bước nhảy giảm dần – từng là lựa chọn cho hệ thống nhúng thiếu stack cho đệ quy.

## Lỗi thường gặp

1. Dùng `a[j] >= key` ⇒ mất stable.
2. Quên `j >= 0` trong điều kiện while ⇒ truy cập `a[-1]` (undefined trong JS, không báo lỗi nhưng so sánh `undefined > key` là false nên "tình cờ" đúng – đừng dựa vào đó).
3. Hoán đổi `a[j]` ↔ `a[j+1]` trong vòng while thay vì dịch ⇒ đúng kết quả nhưng gấp 3 phép gán.
4. Bắt đầu `i` từ 0 (thừa một lượt vô nghĩa).
5. Ghi `a[j] = key` thay vì `a[j+1] = key` sau vòng while.

## Biến thể

- **Binary Insertion Sort:** tìm vị trí bằng binary search.
- **Shell Sort:** Insertion Sort trên các dãy cách nhau `gap`, giảm gap dần; O(n^1.3) thực tế.
- **Insertion Sort trên linked list (LeetCode 147):** không dịch, chỉ nối lại con trỏ.
- **TimSort:** tìm các "run" đã sắp xếp sẵn, dùng Insertion để kéo dài run ngắn, rồi merge.
- **Library Sort (gapped insertion):** để trống chỗ giữa các phần tử để chèn O(log n) kỳ vọng.
