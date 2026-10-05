## Bài toán

Cho mảng `nums`, tìm độ dài **dãy con tăng ngặt dài nhất** (subsequence – không cần liên tiếp).

`[10,9,2,5,3,7,101,18]` → `4` (`[2,3,7,101]` hoặc `[2,5,7,18]`).

LIS (LeetCode 300) có lời giải DP O(n²) quen thuộc; câu hỏi follow-up "làm O(n log n)" là nơi Google và Microsoft phân loại ứng viên. Thuật toán patience sorting ngắn nhưng **phản trực giác**: mảng phụ `tails` không phải LIS, nhưng độ dài của nó thì đúng.

## Ý tưởng / Trực giác

**Trò chơi patience:** lật từng lá bài; đặt nó lên chồng **trái nhất** có lá trên cùng ≥ nó; nếu không có, tạo chồng mới bên phải. Số chồng = độ dài LIS.

Dịch sang mảng: `tails[len]` = phần tử cuối **nhỏ nhất** trong số mọi dãy tăng độ dài `len+1` đã thấy. Với mỗi `x`:
- Nếu `x` lớn hơn mọi tail ⇒ kéo dài: `tails.push(x)`.
- Ngược lại, thay tail đầu tiên ≥ `x` bằng `x`: dãy độ dài đó giờ kết thúc bằng số nhỏ hơn ⇒ **dễ nối thêm** về sau.

`tails` luôn tăng ngặt ⇒ tìm vị trí bằng **binary search** (lower bound) O(log n). Tại sao giữ tail nhỏ nhất là đủ? Vì với cùng độ dài, dãy kết thúc nhỏ hơn "thống trị" dãy kết thúc lớn hơn – mọi phần tử nối được vào dãy sau đều nối được vào dãy trước.

## Thuật toán từng bước

1. `tails = []`.
2. Với mỗi `x`: `pos = lowerBound(tails, x)`; nếu `pos == tails.length` push, ngược lại `tails[pos] = x`.
3. Trả `tails.length`.

Tab **Debug**: xem binary search trên `tails` (cyan là khoảng, vàng là mid), ô xanh là push, đỏ là thay. Preset "tails ≠ LIS thật" `[3,4,5,1,2]`: cuối cùng `tails = [1,2,5]` không phải dãy tăng thật, nhưng độ dài 3 đúng.

## Chứng minh đúng

**Bất biến:** sau khi xử lý `i` phần tử, với mọi `len`, `tails[len]` = min phần tử cuối của các dãy tăng ngặt độ dài `len+1` trong `nums[0..i)`; và `tails` tăng ngặt.

- **Tăng ngặt:** nếu `tails[len] ≥ tails[len+1]`, lấy dãy độ dài `len+2` kết thúc tại `tails[len+1]`, bỏ phần tử cuối được dãy độ dài `len+1` kết thúc bằng số `< tails[len+1] ≤ tails[len]`, mâu thuẫn với tính min.
- **Cập nhật:** `x` nối được sau dãy độ dài `len+1` ⇔ `tails[len] < x`. Dãy dài nhất `x` nối được có độ dài `pos` (với `pos` = lower bound, vì `tails[pos−1] < x ≤ tails[pos]`) ⇒ `x` tạo dãy độ dài `pos+1` với tail `x`. So với `tails[pos]` hiện tại (≥ x), `x` nhỏ hơn hoặc bằng ⇒ thay. Các `len ≠ pos` không đổi (len < pos: tail hiện tại < x nên vẫn min; len > pos: x không tạo được dãy dài hơn pos+1).
- **Kết quả:** độ dài `tails` = độ dài lớn nhất có dãy tăng ⇒ LIS.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n log n) | n lần binary search trên tails (≤ n) |
| Bộ nhớ | O(n) | tails (tối đa n) |
| DP O(n²) | O(n²) / O(n) | `dp[i] = 1 + max(dp[j])` với `j < i`, `nums[j] < nums[i]` |
| Dựng dãy thật | O(n log n) / O(n) | Thêm mảng `parent` và `indexAt[len]` |

## Tradeoff

- **O(n log n) ↔ DP O(n²):** DP O(n²) dễ hiểu, dễ mở rộng (đếm số LIS, LIS với trọng số, LIS có ràng buộc), dựng dãy đơn giản. Patience nhanh hơn nhưng mở rộng khó hơn (đếm số LIS O(n log n) cần Fenwick/segment tree).
- **Tăng ngặt ↔ Không giảm:** đổi `lowerBound` (`tails[mid] < x`) thành `upperBound` (`tails[mid] ≤ x`) để cho phép bằng nhau.
- **Dựng dãy:** `tails` không phải LIS; để in LIS, lưu `parent[i]` = chỉ số phần tử trước nó và `idx[len]` = chỉ số của tail độ dài len; lần ngược từ `idx[last]`.
- **Fenwick tree theo giá trị:** cách khác O(n log n) (nén giá trị, BIT lưu max dp) – tổng quát hơn cho biến thể đếm/trọng số.
- **Patience sorting đầy đủ:** nếu giữ cả chồng bài, có thể sắp xếp dữ liệu gần sắp xếp hiệu quả (dùng trong một số thuật toán merge).

## Lợi / Hại

**Lợi**
- O(n log n), code 15 dòng.
- Khung cho bài 2D (Russian Doll Envelopes): sắp xếp theo chiều 1 tăng, chiều 2 giảm, LIS trên chiều 2.
- Online theo nghĩa độ dài LIS tiền tố luôn có sẵn.

**Hại**
- `tails` gây hiểu nhầm; cần thêm bookkeeping để in dãy.
- Biến thể đếm/trọng số cần cấu trúc khác.

## Use case thực tế

- **Diff / version control:** thuật toán diff "patience diff" (Bram Cohen, dùng trong Git với `--diff-algorithm=patience`, Mercurial) dựa trên LIS của các dòng duy nhất.
- **Tin sinh học:** chaining các đoạn khớp (anchor) trong alignment là LIS có trọng số.
- **Lập lịch / tối ưu:** chọn nhiều nhất các job có cả thời gian và ưu tiên tăng; xếp hộp lồng nhau (Russian doll).
- **Mạng:** phát hiện gói đến sai thứ tự (độ "lệch thứ tự" = n − LIS).
- **Thống kê:** kiểm định xu hướng, độ dài run tăng trong dữ liệu ngẫu nhiên (định lý Erdős–Szekeres, phân phối Tracy–Widom).
- **Đồ hoạ / nhận dạng:** khớp điểm đặc trưng giữ thứ tự.

## Lỗi thường gặp

1. Tin rằng `tails` là LIS và in nó ra.
2. Dùng upper bound khi đề yêu cầu tăng ngặt ⇒ đếm phần tử bằng nhau.
3. Binary search sai biên (`hi = tails.length` phải là nửa mở).
4. Với bài 2D, sắp xếp chiều 2 tăng dần ⇒ lồng hai phong bì cùng chiều rộng – sai; phải giảm dần.
5. Dùng DP O(n²) cho n = 10⁵ ⇒ TLE.
6. Quên trường hợp mảng rỗng (trả 0).

## Biến thể

- **In LIS thật:** `parent` + `idx[len]`.
- **Longest non-decreasing:** upper bound.
- **Số lượng LIS (673):** DP O(n²) với `count[i]`, hoặc O(n log n) với segment tree theo giá trị lưu (len, count).
- **Russian Doll Envelopes (354):** sắp xếp (w tăng, h giảm) rồi LIS trên h.
- **Longest Valid Obstacle Course (1964):** LIS không giảm tại mỗi vị trí = pos+1.
- **Minimum deletions để sắp xếp:** n − LIS.
- **LIS với trọng số:** Fenwick tree theo giá trị.
- **LDS / bitonic:** LIS từ trái và từ phải.
