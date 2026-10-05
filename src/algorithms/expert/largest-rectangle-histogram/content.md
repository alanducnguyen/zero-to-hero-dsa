## Bài toán

Cho histogram gồm `n` cột rộng 1, chiều cao `heights[i]`. Tìm diện tích hình chữ nhật lớn nhất nằm gọn trong histogram.

`[2,1,5,6,2,3]` → `10` (cột 5 và 6, cao 5, rộng 2).

LeetCode 84 (Hard) là bài **đại diện cho Monotonic Stack** – kỹ thuật giải cả họ bài "tìm phần tử lớn hơn/nhỏ hơn **gần nhất** bên trái/phải" trong O(n). Google và Amazon dùng nó để phân biệt ứng viên Senior; Maximal Rectangle (85) và Trapping Rain Water (42) đều quy về nó.

## Ý tưởng / Trực giác

**Quan sát 1:** hình chữ nhật lớn nhất luôn có chiều cao bằng chiều cao của **một cột nào đó** (nếu không, có thể tăng chiều cao mà không mất gì). Vậy với mỗi cột `i`, hãy tính hình chữ nhật cao `heights[i]` **mở rộng tối đa** sang hai bên: tới cột thấp hơn gần nhất bên trái `L` và bên phải `R`. Diện tích = `heights[i] × (R − L − 1)`.

**Quan sát 2:** tìm `L`, `R` cho mọi `i` ngây thơ là O(n²). **Monotonic stack** làm điều đó trong O(n): duyệt trái sang phải, giữ stack các chỉ số có chiều cao **tăng dần**. Khi gặp cột `i` thấp hơn đỉnh stack, cột đỉnh "biết" biên phải của nó là `i`, và biên trái là phần tử ngay dưới nó trong stack (thấp hơn nó – do tính đơn điệu). Pop và tính diện tích ngay.

Trực giác: stack là danh sách các cột "còn hy vọng mở rộng sang phải". Một cột thấp hơn xuất hiện ⇒ mọi cột cao hơn nó trong stack hết hy vọng ⇒ chốt sổ.

## Thuật toán từng bước

1. `stack = []`, `best = 0`.
2. Với `i` từ `0` đến `n` (cột ảo `h = 0` tại `i = n`):
   - Khi stack không rỗng và `heights[top] > h`: pop `top`; `left = stack rỗng ? -1 : stack đỉnh mới`; `width = i − left − 1`; `best = max(best, heights[top] × width)`.
   - Push `i`.
3. Trả `best`.

Tab **Debug**: cột cyan đang trong stack (luôn tăng dần), cột đỏ vừa pop, vùng vàng là hình chữ nhật vừa tính. Thử preset "Giảm dần" – mỗi cột mới pop ngay cột trước; và "Tăng dần" – không pop gì cho tới cột ảo cuối.

## Chứng minh đúng

**Bất biến stack:** chiều cao các cột trong stack tăng ngặt từ đáy lên (với `>` trong điều kiện pop, cột bằng nhau được giữ – vẫn cho kết quả đúng, xem Lỗi thường gặp).

**Khi pop cột `t` tại bước `i`:**
- Biên phải: `heights[i] < heights[t]`, và mọi cột giữa `t` và `i` đã bị pop trước đó bởi một cột ≤ chúng... cụ thể, mọi cột `j ∈ (t, i)` đều `≥ heights[t]` (nếu có cột thấp hơn, `t` đã bị pop sớm hơn). Vậy `i` là cột thấp hơn gần nhất bên phải.
- Biên trái: phần tử dưới `t` trong stack là `left`, có `heights[left] < heights[t]` (tăng ngặt) và mọi cột trong `(left, t)` đã bị pop bởi cột ≤ chúng khi chúng... mọi cột trong `(left, t)` có chiều cao `≥ heights[t]` (chúng bị pop bởi `t` hoặc bởi cột cao hơn `t` trước đó). Vậy `left` là cột thấp hơn gần nhất bên trái.

⇒ `width = i − left − 1` là độ rộng tối đa của hình chữ nhật cao `heights[t]`. Mọi cột đều được pop đúng một lần (cột ảo đảm bảo) ⇒ xét đủ mọi ứng viên theo Quan sát 1 ⇒ `best` đúng.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n) | Mỗi chỉ số push 1 lần, pop tối đa 1 lần ⇒ ≤ 2n thao tác |
| Bộ nhớ | O(n) | Stack xấu nhất chứa n chỉ số (mảng tăng dần) |

Phân tích "amortized": vòng `while` trông như O(n) mỗi lần, nhưng tổng số pop ≤ tổng số push = n+1.

## Tradeoff

- **Một lượt (tính khi pop) ↔ Hai lượt (mảng `left[]`, `right[]`):** hai lượt dễ hiểu hơn, dùng lại được khi cần biên cho mục đích khác; một lượt ít code và bộ nhớ hơn.
- **Cột ảo ↔ Xả stack sau vòng lặp:** cột ảo `h = 0` làm code gọn, tránh viết lặp lại logic pop.
- **Stack ↔ Divide & Conquer / Segment tree:** chia để trị theo cột min O(n log n) (O(n²) xấu nhất); segment tree O(n log n). Stack là tối ưu và đơn giản nhất.
- **Chiều cao bằng nhau:** dùng `>` (giữ cột bằng nhau trong stack) hay `>=` (pop cột bằng nhau) đều cho `best` đúng, nhưng `left[]`/`right[]` khác nhau – quan trọng khi cần đếm số hình chữ nhật.

## Lợi / Hại

**Lợi**
- O(n) tối ưu cho bài Hard.
- Khung tổng quát: đổi điều kiện so sánh ⇒ giải Next Greater Element, Daily Temperatures, Stock Span, Trapping Rain Water, Sum of Subarray Minimums.

**Hại**
- Khó suy ra lần đầu; phải luyện để "nhìn thấy" pattern.
- Dễ sai biên (`−1`, `n`, `width` lệch 1), dễ sai hướng đơn điệu (tăng hay giảm).
- Không mở rộng trực tiếp cho dữ liệu động (chèn/xoá cột) – cần segment tree.

## Use case thực tế

- **Phân tích tài chính:** Stock Span (số ngày liên tiếp giá ≤ hôm nay), "ngày tiếp theo ấm hơn" (Daily Temperatures).
- **Xử lý ảnh / OCR:** Maximal Rectangle trên ảnh nhị phân (vùng trắng lớn nhất) = chạy bài này cho từng hàng.
- **Compiler / parser:** stack toán tử theo độ ưu tiên (biểu thức trung tố) là monotonic stack theo precedence.
- **Đồ hoạ:** skyline, visibility (những toà nhà nhìn thấy được từ một phía).
- **Tối ưu bộ nhớ / layout:** tìm khối trống lớn nhất trong bitmap cấp phát.
- **Database:** tính window function "giá trị trước đó nhỏ hơn gần nhất" trong O(n).

## Lỗi thường gặp

1. `width = i − left` (thiếu `−1`) hoặc `left` mặc định `0` thay vì `−1`.
2. Quên xả stack sau vòng lặp (không có cột ảo) ⇒ bỏ sót mảng tăng dần.
3. Lưu **giá trị** vào stack thay vì **chỉ số** ⇒ không tính được width.
4. Sai hướng đơn điệu: dùng stack giảm dần cho bài này.
5. Với `heights[i] = 0`, vẫn đúng nhưng hãy chắc chắn điều kiện `>` không rơi vào vòng lặp vô hạn (không, vì mỗi vòng pop 1 phần tử).

## Biến thể

- **Maximal Rectangle (85):** ma trận nhị phân, mỗi hàng tính histogram tích luỹ rồi chạy bài này ⇒ O(m·n).
- **Daily Temperatures (739) / Next Greater Element (496, 503):** stack giảm dần, pop khi gặp phần tử lớn hơn.
- **Trapping Rain Water (42):** stack giảm dần, khi pop tính nước đọng theo biên trái/phải.
- **Sum of Subarray Minimums (907):** `left[]`, `right[]` (chú ý `<` và `<=` để đếm không trùng).
- **Remove K Digits (402) / 132 Pattern (456):** monotonic stack cho chuỗi/mảng.
- **Sliding Window Maximum (239):** monotonic **deque**.
