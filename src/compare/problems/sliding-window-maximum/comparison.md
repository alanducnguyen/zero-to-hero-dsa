## Bảng tradeoff

| Lời giải | Thời gian | Bộ nhớ | Ý tưởng then chốt | Điểm yếu |
|---|---|---|---|---|
| Brute force | O(n·k) | O(1) phụ | Quét lại cả cửa sổ | Vứt bỏ k−1 phần tử chung giữa hai cửa sổ liền nhau |
| Max-heap + lazy removal | O(n log n) | O(n) | Đỉnh heap là max; phần tử cũ chỉ xoá khi nổi lên đỉnh | Heap phình tới n phần tử, hằng số lớn |
| Monotonic deque | O(n) | O(k) | Phần tử bị "đè" bởi số lớn hơn đến sau thì không bao giờ là max | Khó nghĩ ra, dễ sai điều kiện `<` / `<=` |

## Phân tích

**Brute force** đúng hiển nhiên nhưng lãng phí: hai cửa sổ liền nhau chung k−1 phần tử, vậy mà mỗi cửa sổ lại so sánh từ đầu. Khi k nhỏ (vd k ≤ 3) nó thực ra rất nhanh vì vòng trong ngắn và cache-friendly.

**Max-heap** giải quyết câu hỏi "max hiện tại là gì" trong O(1) và "thêm phần tử" trong O(log n). Vấn đề là **xoá** phần tử rời cửa sổ: heap nhị phân không hỗ trợ xoá phần tử bất kỳ nhanh. Mẹo **lazy removal**: lưu kèm chỉ số, cứ để phần tử cũ nằm đó, chỉ khi nó lên đỉnh (tức là nó đang cản trở câu trả lời) mới pop. Mỗi phần tử push một lần, pop tối đa một lần ⇒ O(n log n). Nhược điểm: với mảng tăng dần, không gì bị pop, heap chứa cả n phần tử. Biến thể dùng TreeMap/multiset (C++ `multiset`, Java `TreeMap`) cho phép xoá đúng phần tử ⇒ O(n log k), O(k).

**Monotonic deque** đi từ quan sát: nếu `j < i` và `nums[j] ≤ nums[i]` thì `nums[j]` rời cửa sổ *trước* `nums[i]` và không lớn hơn ⇒ nó **không bao giờ** là max của bất kỳ cửa sổ nào còn lại. Bỏ ngay. Các phần tử còn lại trong deque vì thế giảm dần, đầu deque là max. Mỗi chỉ số vào deque một lần và ra tối đa một lần ⇒ **O(n) amortized**, độc lập với k. Lưu ý trong JS, `Array.shift()` là O(k) – dùng con trỏ `head` (như code) hoặc deque vòng thật sự.

## Xếp hạng

1. **Monotonic deque** – O(n)/O(k). Đáp án mong đợi ở Amazon/Google.
2. **Max-heap + lazy removal** – O(n log n)/O(n). Dễ nghĩ hơn, đủ qua nếu không nghĩ ra deque; nêu được TreeMap O(n log k) là điểm cộng.
3. **Brute force** – O(n·k)/O(1). Chỉ để mở đầu.

## Khi nào thứ hạng đổi

- **k rất nhỏ** (k ≤ ~8): brute force có thể nhanh hơn thực tế nhờ hằng số nhỏ, không cấp phát.
- **Cần cả max lẫn min, hoặc truy vấn thứ hạng bất kỳ (k-th largest trong cửa sổ)**: TreeMap/multiset hoặc order-statistic tree thắng – deque chỉ trả lời được max (hoặc min).
- **Median của cửa sổ** (LC 480): deque vô dụng, phải dùng hai heap + lazy removal – kỹ thuật lazy removal ở lời giải 2 tái sử dụng nguyên vẹn.
- **Truy vấn max trên đoạn bất kỳ (không trượt đều)**: Sparse Table O(1)/truy vấn hoặc Segment Tree.
- **Kích thước cửa sổ thay đổi theo điều kiện** (LC 1438, LC 862): monotonic deque vẫn là công cụ chính, kết hợp với two pointers.
