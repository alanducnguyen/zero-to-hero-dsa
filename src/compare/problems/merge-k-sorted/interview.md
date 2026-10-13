## Kịch bản trình bày

1. **Làm rõ**: k và N; linked list hay mảng; luồng hay tĩnh.
2. **Gộp + sort** (20s): O(N log N), nói để có baseline.
3. **Trộn lần lượt** (30s): chỉ ra O(N·k) do chép lại – người phỏng vấn thích khi bạn tự phát hiện điều này.
4. **Heap** (2 phút): "Min còn lại luôn là đầu của một list ⇒ heap k phần tử." Code với tuple (giá trị, list, vị trí).
5. **Chia để trị** (1 phút): "Cùng O(N log k), không cần heap, tái dùng mergeTwo."
6. **Chốt**: heap khi k lớn/luồng; chia để trị khi có sẵn mergeTwo và dữ liệu tĩnh.

## Follow-up thường gặp

- **Vì sao trộn lần lượt là O(N·k)?** Lần trộn thứ i duyệt i·N/k phần tử ⇒ tổng ≈ N·k/2.
- **Vì sao chia để trị là O(N log k)?** log k tầng, mỗi tầng chép mỗi phần tử đúng một lần.
- **Linked list, O(1) bộ nhớ?** Chia để trị nối node tại chỗ; heap vẫn cần O(k).
- **Các list là iterator vô hạn?** Heap với (giá trị hiện tại, iterator); gọi next() khi pop.
- **Ổn định?** Tie-break theo chỉ số list trong comparator của heap; mergeTwo dùng `<=`.
- **k = 10⁶ nguồn trên đĩa?** Tournament (loser) tree: ít so sánh hơn heap, dùng trong external sort.
- **Kth smallest trong hợp của k list?** Heap, pop k lần: O(k log k) – không cần trộn hết.
