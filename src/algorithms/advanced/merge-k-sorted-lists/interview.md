## Cách trình bày trong phỏng vấn

1. Nêu baseline: gộp + sort O(N log N), trộn lần lượt O(N·k). Hỏi k và N để chọn cách.
2. Ý chính: min còn lại luôn là đầu một danh sách ⇒ heap k phần tử, O(N log k).
3. Code với tuple `(value, listIdx, pos)`; với linked list dùng node làm phần tử heap.
4. Nêu chia để trị như cách tương đương, không cần heap.
5. Liên hệ external sort / LSM compaction để cho thấy hiểu ứng dụng.

## Câu hỏi follow-up thường gặp

- **Vì sao O(N log k) chứ không O(N log N)?** Heap luôn ≤ k phần tử nên mỗi thao tác O(log k); có N lần pop/push.
- **Không có heap sẵn?** Chia để trị trộn cặp đôi: log k tầng, mỗi tầng O(N).
- **Bộ nhớ O(1)?** Trộn lần lượt O(N·k), hoặc chia để trị trên linked list (chỉ O(log k) stack).
- **Danh sách là iterator/luồng?** Heap giữ `(giá trị hiện tại, iterator)`; khi pop gọi `next()`.
- **Cần ổn định (giữ thứ tự danh sách khi bằng nhau)?** Tie-break theo `listIdx`.
- **k = 10⁶ danh sách?** Vẫn heap O(N log k); hoặc tournament tree để ít so sánh hơn.
- **Danh sách giảm dần?** Max-heap, hoặc đảo dấu.

## Checklist nhận diện pattern

- "k danh sách / luồng đã sắp xếp" ⇒ heap k phần tử.
- "Phần tử nhỏ thứ k trong ma trận có hàng và cột sắp xếp" ⇒ cùng kỹ thuật.
- "Khoảng nhỏ nhất chứa ít nhất một phần tử từ mỗi danh sách" ⇒ heap + max tracking.

## Bài luyện tập

- 21 Merge Two Sorted Lists → 23 Merge k Sorted Lists → 88 Merge Sorted Array.
- 378 Kth Smallest Element in a Sorted Matrix, 373 Find K Pairs with Smallest Sums.
- 632 Smallest Range Covering Elements from K Lists, 1046 Last Stone Weight (heap cơ bản).
