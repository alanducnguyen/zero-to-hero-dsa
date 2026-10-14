## Bài toán

Cho mảng nhiệt độ `temps` theo ngày. Với mỗi ngày `i`, tìm số ngày phải chờ để gặp ngày **ấm hơn**; nếu không có, trả 0.

`[73,74,75,71,69,72,76,73]` → `[1,1,4,2,1,1,0,0]`.

Daily Temperatures (LeetCode 739) là dạng chuẩn của **Next Greater Element**, bài mẫu để học monotonic stack: cấu trúc trông đơn giản nhưng giải quyết cả họ bài "phần tử lớn hơn/nhỏ hơn gần nhất bên phải/trái".

## Ý tưởng / Trực giác

Brute force: với mỗi ngày quét sang phải tới khi gặp ngày ấm hơn, O(n²).

Quan sát: khi đứng ở ngày `i`, các ngày trước đó **chưa có câu trả lời** là những ngày đang "chờ". Nếu `temps[i]` lớn hơn một ngày đang chờ `j`, thì `i` chính là câu trả lời của `j` (ngày ấm hơn đầu tiên), và `j` không cần chờ nữa. Để kiểm tra nhanh, giữ các ngày chờ trong một **stack với nhiệt độ giảm dần** từ đáy lên đỉnh: nếu `temps[i]` > đỉnh thì pop và trả lời; lặp tới khi đỉnh ≥ `temps[i]` hoặc stack rỗng; rồi push `i`.

Tại sao stack giảm dần? Một ngày ở dưới đỉnh có nhiệt độ ≥ đỉnh (nếu nhỏ hơn thì đã bị pop khi đỉnh được push). Vì vậy khi `temps[i]` không vượt đỉnh thì cũng không vượt ngày nào bên dưới ⇒ dừng sớm là đúng.

## Thuật toán từng bước

1. `answer = [0]*n`, `stack = []` (chỉ số).
2. Với `i = 0..n−1`: khi stack không rỗng và `temps[i] > temps[stack.top]`: `j = pop()`, `answer[j] = i − j`. Sau đó `push(i)`.
3. Trả về `answer`; các chỉ số còn trong stack giữ 0.

Ở tab **Debug**, ô vàng là các ngày đang chờ trong stack, ô tím là ngày đang xét, ô xanh lá là ngày vừa được trả lời. Preset "Giảm dần" cho thấy stack chỉ tăng; "Tăng dần" cho thấy pop liên tục.

## Chứng minh đúng

- **Bất biến:** stack chứa chính xác các chỉ số `< i` chưa có ngày ấm hơn trong `[0, i)`, theo nhiệt độ không tăng từ đáy lên đỉnh.
- Khi xét `i`: mọi `j` bị pop thoả `temps[i] > temps[j]` và `j` chưa có ngày ấm hơn trong `[j+1, i)` (theo bất biến) ⇒ `i` là ngày ấm hơn đầu tiên ⇒ `answer[j] = i − j` đúng. Những `j` còn lại có `temps[j] ≥ temps[i]` nên vẫn chưa có đáp án ⇒ giữ trong stack. Push `i` giữ tính không tăng.
- Kết thúc, các chỉ số còn trong stack không có ngày ấm hơn ⇒ 0 đúng.

Mỗi chỉ số push một lần, pop tối đa một lần ⇒ tổng O(n) dù có vòng `while` lồng trong `for`.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ |
|---|---|---|
| Monotonic stack | O(n) | O(n) |
| Duyệt ngược + nhảy theo answer | O(n) amortized | O(1) phụ |
| Brute force | O(n²) | O(1) |

## Tradeoff

- Stack: một lượt xuôi, trực quan, chạy online (nhận từng ngày mới) – bản chất của Online Stock Span.
- Duyệt ngược với "nhảy" (`j = i+1; while temps[j] ≤ temps[i]: j += answer[j]`) tiết kiệm bộ nhớ, nhưng cần toàn bộ mảng trước.
- Khi chỉ cần "có ngày ấm hơn không" (không cần khoảng cách) có thể dùng suffix max O(n)/O(1).

## Lợi / Hại

**Lợi:** O(n) chắc chắn, khung dùng lại cho Next Greater/Smaller, Stock Span, Largest Rectangle, Trapping Rain Water (biến thể). **Hại:** cần nhận ra "đơn điệu" đúng chiều (giảm cho next greater, tăng cho next smaller); dễ sai dấu `>` / `≥` với phần tử bằng nhau.

## Use case thực tế

- Phân tích chuỗi thời gian: lần kế tiếp giá/nhiệt độ/tải vượt mức hiện tại (breakout), stock span.
- Lập lịch: với mỗi task, task kế tiếp có ưu tiên cao hơn.
- Xử lý ảnh/tín hiệu: khoảng cách tới đỉnh kế tiếp cao hơn.
- Compiler/parse: khớp dấu ngoặc, tính "phạm vi" phần tử lớn hơn gần nhất.

## Lỗi thường gặp

- Lưu **giá trị** thay vì **chỉ số** trong stack ⇒ không tính được khoảng cách.
- Dùng `≥` thay `>` khi đề yêu cầu "ấm hơn hẳn" (bằng nhau không tính).
- Quên push `i` sau vòng while.
- Nghĩ rằng vòng while lồng khiến O(n²) – không, amortized O(n).
- Với mảng vòng (Next Greater II) quên duyệt 2n.

## Biến thể

- **Next Greater Element I/II (496/503):** cùng stack; vòng tròn ⇒ duyệt `i` từ 0 tới 2n−1 với `i mod n`.
- **Next Smaller Element:** stack tăng dần.
- **Online Stock Span (901):** stack `(giá, span)`; span = 1 + tổng span bị pop.
- **Previous Greater:** duyệt xuôi, đáp án là đỉnh stack còn lại trước khi push.
- **Largest Rectangle in Histogram:** next/previous smaller cho mỗi cột.
