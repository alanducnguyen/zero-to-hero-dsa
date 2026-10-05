## Bài toán

Cho chuỗi `s`, tìm độ dài **substring** (chuỗi con liên tiếp) dài nhất không có ký tự lặp lại.

Ví dụ: `"abcabcbb"` → `3` (`"abc"`); `"pwwkew"` → `3` (`"wke"`, lưu ý `"pwke"` là subsequence, không phải substring).

Đây là bài LeetCode #3 – bài được hỏi nhiều nhất mọi thời đại trên LeetCode theo thống kê công ty, và là "bài mẫu" của pattern **Sliding Window**, pattern chiếm khoảng 15–20% câu hỏi về mảng/chuỗi ở Amazon và Meta.

## Ý tưởng / Trực giác

**Cách ngây thơ:** xét mọi cặp `(i, j)`, kiểm tra `s[i..j]` có lặp không ⇒ O(n³), hoặc O(n²) với set. Quá chậm.

**Quan sát then chốt:** nếu `s[left..right]` không lặp và ta thêm `s[right+1]`:
- Nếu `s[right+1]` chưa có trong cửa sổ ⇒ cửa sổ mới vẫn hợp lệ.
- Nếu nó **đã có** tại vị trí `p` (với `left ≤ p ≤ right`) ⇒ mọi cửa sổ bắt đầu từ `left..p` và chứa `right+1` đều lặp ⇒ `left` phải nhảy tới `p+1`.

Vì `left` và `right` **chỉ tăng, không bao giờ lùi**, tổng số bước di chuyển ≤ 2n ⇒ O(n). Đó là bản chất của sliding window: hai con trỏ tiến cùng chiều, mỗi phần tử vào cửa sổ một lần và ra một lần.

## Thuật toán từng bước

1. `lastIndex`: Map ký tự → vị trí xuất hiện **gần nhất**. `left = 0`, `best = 0`.
2. Với mỗi `right` từ `0` đến `n-1`:
   - `ch = s[right]`, `prev = lastIndex.get(ch)`.
   - Nếu `prev` tồn tại **và** `prev >= left` ⇒ `left = prev + 1`.
   - `lastIndex.set(ch, right)`.
   - `best = max(best, right - left + 1)`.
3. Trả `best`.

Mở tab **Debug** với preset `abba`: khi gặp `a` thứ hai (right = 3), `prev = 0` nhưng `left` đã là `2` ⇒ **không** được lùi `left` về 1. Điều kiện `prev >= left` là chi tiết mà 50% ứng viên viết sai.

## Chứng minh đúng

**Bất biến:** sau mỗi vòng lặp, `s[left..right]` không có ký tự lặp, và `left` là **nhỏ nhất** có tính chất đó với `right` hiện tại.

- **Khởi tạo:** cửa sổ rỗng – đúng.
- **Duy trì:** giả sử đúng với `right-1`. Thêm `s[right] = ch`. Nếu `ch` không có trong `[left, right-1]` (tức `prev < left` hoặc không tồn tại), cửa sổ `[left, right]` hợp lệ và `left` vẫn nhỏ nhất (vì `[left-1, right-1]` đã lặp). Nếu `ch` có tại `prev ≥ left`, `[left', right]` hợp lệ ⇔ `left' > prev` ⇒ `left = prev + 1` là nhỏ nhất.
- **Tính đủ:** với mỗi `right`, ta xét cửa sổ hợp lệ dài nhất kết thúc tại `right`. Substring tối ưu phải kết thúc ở một `right` nào đó ⇒ `best` chính xác.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n) | `right` chạy n bước; `left` tổng cộng tăng ≤ n; mỗi thao tác Map O(1) |
| Bộ nhớ | O(min(n, k)) | k = kích thước bảng chữ cái (26 chữ thường, 128 ASCII, ...) |

Nếu bảng chữ cái cố định (ASCII), dùng mảng `number[128]` thay Map ⇒ nhanh hơn 2–3 lần trong thực tế.

## Tradeoff

- **Map vị trí (nhảy left) ↔ Set + co từng bước:** phiên bản Set co `left` từng bước (xoá tới khi hết lặp) dễ hiểu hơn nhưng vẫn O(n). Phiên bản Map "nhảy" ít thao tác hơn nhưng cần điều kiện `prev >= left` dễ sai.
- **Bộ nhớ ↔ tổng quát:** mảng cố định 128/256 phần tử nhanh hơn Map nhưng giả định bảng chữ cái; Unicode (emoji, tiếng Việt có dấu tổ hợp) cần Map và duyệt bằng `for...of` (code point) thay vì index.
- **Trả độ dài ↔ trả substring:** lưu thêm `bestStart` khi cập nhật `best`.

## Lợi / Hại

**Lợi**
- O(n) một lần duyệt, O(1) bộ nhớ với bảng chữ cái cố định.
- Pattern tái sử dụng cho hàng chục bài "substring/subarray dài nhất/ngắn nhất thoả điều kiện".

**Hại**
- Chỉ áp dụng khi tính chất cửa sổ **đơn điệu**: mở rộng cửa sổ không làm điều kiện "tốt hơn". Với điều kiện không đơn điệu (vd. tổng = k với số âm) sliding window **sai**, phải dùng prefix sum + hashmap.
- Dễ sai off-by-one và điều kiện cập nhật `left`.

## Use case thực tế

- **Rate limiting (sliding window log):** đếm request trong N giây gần nhất.
- **Phát hiện bất thường trong stream:** cửa sổ trượt tính trung bình/độ lệch chuẩn của log/metrics.
- **Nén dữ liệu (LZ77):** tìm chuỗi lặp trong cửa sổ trượt phía trước.
- **Network TCP:** sliding window protocol kiểm soát luồng.
- **Phân tích DNA:** tìm đoạn gen không chứa nucleotide lặp / k-mer.

## Lỗi thường gặp

1. Thiếu điều kiện `prev >= left` ⇒ `left` lùi lại, cửa sổ chứa lặp (test `abba`).
2. Dùng `s.length` với chuỗi Unicode surrogate pairs ⇒ emoji bị tách đôi.
3. Cập nhật `best` trước khi điều chỉnh `left`.
4. Nhầm substring với subsequence.
5. Quên cập nhật `lastIndex` khi ký tự đã có (phải ghi đè bằng vị trí mới).

## Biến thể

- **Cửa sổ cố định k:** tổng/max của mọi subarray độ dài k (Sliding Window Maximum dùng deque).
- **Cửa sổ nhỏ nhất thoả điều kiện:** Minimum Window Substring (76) – mở rộng tới khi thoả, co tới khi không thoả.
- **Tối đa k ký tự khác nhau (340):** Map đếm tần suất, co khi `map.size > k`.
- **Thay thế tối đa k ký tự (424):** giữ `maxFreq`, cửa sổ hợp lệ khi `len - maxFreq ≤ k`.
- **Hai con trỏ ngược chiều:** Two Sum II, Container With Most Water – cùng họ nhưng không phải sliding window.
