## Phân tích

**Sort** là câu trả lời 1 dòng và hoàn toàn chấp nhận được khi n nhỏ. Vấn đề: sắp xếp toàn bộ để lấy một vị trí – làm thừa O(n log n) công việc. Người phỏng vấn gần như chắc chắn hỏi "tốt hơn được không?".

**Min-heap kích thước k** chỉ giữ k ứng viên tốt nhất; mỗi phần tử tốn O(log k). Khi k nhỏ (top-10 trong 10⁶) đây gần như O(n). Ưu điểm lớn nhất: chạy được trên **luồng dữ liệu** vì không cần biết toàn bộ mảng, và không sửa input. Khi k ≈ n/2 (median) thì O(n log n) – không hơn sort.

**Quickselect** là tối ưu lý thuyết: O(n) trung bình, O(1) bộ nhớ phụ, không phụ thuộc k. Đổi lại: xáo trộn mảng, worst case O(n²) nếu pivot tệ (cần random pivot hoặc introselect), và không dùng được với luồng. Trong phỏng vấn, viết đúng partition dưới áp lực khó hơn heap.

## Xếp hạng

1. **Quickselect** – O(n) trung bình, O(1). Chọn khi có toàn bộ mảng, được sửa, k bất kỳ.
2. **Min-heap k** – O(n log k), O(k). Chọn khi k ≪ n, dữ liệu luồng, hoặc không được sửa mảng.
3. **Sort** – O(n log n), O(n). Chọn khi n nhỏ, cần code 1 dòng, hoặc cần cả thứ tự.

## Khi nào thứ hạng đổi

- k ≤ 10 và n = 10⁷ trên luồng ⇒ heap hạng 1, quickselect không khả thi.
- Cần worst case đảm bảo (hệ thống thời gian thực) ⇒ heap (O(n log k) chắc chắn) hoặc median of medians.
- Miền giá trị nhỏ (vd điểm 0–100) ⇒ counting sort O(n) đơn giản hơn cả ba.
