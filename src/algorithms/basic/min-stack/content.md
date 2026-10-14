## Bài toán

Thiết kế stack hỗ trợ `push`, `pop`, `top` và `getMin` – **tất cả O(1)**.

LeetCode 155 là bài design đầu tiên nhiều người gặp (Amazon, Bloomberg). Nó dạy ý tưởng **cấu trúc phụ trợ**: lưu thêm thông tin tại mỗi mức để truy vấn không phải quét lại.

## Ý tưởng / Trực giác

Quét stack tìm min là O(n). Nhưng min của stack chỉ thay đổi khi push/pop – và khi pop, min "quay về" min của trạng thái trước. Vậy hãy **ghi nhớ min tại mỗi mức**: stack phụ `mins` với `mins[i] = min(data[0..i])`. Push: `mins.push(min(x, đỉnh mins))`. Pop: pop cả hai. `getMin` = đỉnh `mins`.

## Thuật toán từng bước

- `push(x)`: `data.push(x)`; `mins.push(min(x, mins.top ?? x))`.
- `pop()`: pop cả `data` và `mins`.
- `top()`: đỉnh `data`. `getMin()`: đỉnh `mins`.

Tab **Debug**: hai stack cạnh nhau; đỉnh `mins` luôn là min; preset "Min trùng lặp" cho thấy vì sao mỗi mức đều cần một entry.

## Chứng minh đúng

**Bất biến:** `mins.length === data.length` và `mins[i] = min(data[0..i])`. Push giữ bất biến vì `min(data[0..i]) = min(data[i], min(data[0..i−1]))`. Pop bỏ phần tử cuối cả hai ⇒ bất biến giữ cho phần còn lại. `getMin` trả `mins[top]` = min toàn stack.

## Độ phức tạp

| | Giá trị |
|---|---|
| push / pop / top / getMin | O(1) |
| Bộ nhớ | O(n) – gấp đôi stack thường |

## Tradeoff

- **Stack phụ đầy đủ ↔ Stack phụ chỉ push khi ≤ min:** tiết kiệm bộ nhớ khi dữ liệu tăng dần; pop phải so sánh đỉnh để biết có pop `mins` không; cần `≤` để xử lý trùng lặp.
- **Lưu cặp (x, min) trong một stack:** cùng bộ nhớ, ít code hơn.
- **O(1) bộ nhớ phụ (mẹo hiệu số):** lưu `x − min` và một biến `min`; khi `x < min` lưu giá trị âm làm dấu; khó đọc, dễ tràn số – chỉ nêu khi được hỏi.
- **Max Stack (716) với popMax O(log n):** cần cấu trúc khác (TreeMap + doubly linked list).

## Lợi / Hại

**Lợi:** O(1) mọi thao tác, bất biến đơn giản, mở rộng cho max/sum/count.
**Hại:** gấp đôi bộ nhớ; chỉ hỗ trợ min của toàn stack, không hỗ trợ xoá bất kỳ.

## Use case thực tế

- **Undo với trạng thái tổng hợp:** editor giữ "min/max/tổng" của lịch sử để hiển thị mà không tính lại.
- **Giám sát:** stack các khung thời gian lồng nhau với min latency tại mỗi mức (profiler).
- **Trình biên dịch / interpreter:** stack scope lưu kèm thông tin tổng hợp (độ sâu, số biến).
- **Trading:** sliding window min/max là mở rộng (max queue bằng hai min stack).

## Lỗi thường gặp

1. Chỉ push vào `mins` khi `x < min` (ngặt) ⇒ pop phần tử trùng min làm mất min.
2. Pop `data` mà quên pop `mins` ⇒ lệch mức.
3. Quét `data` trong `getMin` ⇒ O(n).
4. Stack rỗng gọi `getMin` không xử lý.

## Biến thể

- **Max Stack (716):** popMax – TreeMap + danh sách liên kết.
- **Max Queue:** hai min/max stack ⇒ queue với max O(1) amortized.
- **Stack với sum/avg O(1):** lưu prefix sum tại mỗi mức.
- **Maximum Frequency Stack (895):** Map tần suất + stack theo tần suất.
