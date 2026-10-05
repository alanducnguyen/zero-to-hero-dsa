## Cách trình bày trong phỏng vấn

1. Ví dụ xếp bài trên tay – 1 câu.
2. Viết code với **dịch** (không hoán đổi), điều kiện `a[j] > key` (ngặt).
3. Nêu: O(n²) worst, O(n) best, O(n + nghịch thế) chính xác; stable, in-place, adaptive, online.
4. Nói ngay câu "ăn điểm": "Vì hằng số nhỏ, các thư viện chuẩn dùng Insertion Sort cho đoạn < 16–32 phần tử bên trong Quick/Merge/Tim Sort."

## Câu hỏi follow-up thường gặp

- **Tại sao thực tế nhanh hơn Bubble và Selection?** Ít phép gán (dịch 1 gán), truy cập tuần tự, dừng sớm từng lượt khi gặp phần tử nhỏ hơn.
- **Tại sao stable?** Chỉ dịch phần tử lớn hơn **ngặt**; phần tử bằng không bị vượt qua.
- **Dùng binary search để tìm vị trí chèn thì có O(n log n) không?** So sánh O(n log n) nhưng dịch vẫn O(n²); tổng O(n²). Lợi khi comparator đắt.
- **Độ phức tạp theo số nghịch thế?** O(n + d). Mảng có d = O(n) nghịch thế ⇒ O(n).
- **Sắp xếp linked list bằng Insertion Sort?** Duyệt từng node, tìm vị trí trong danh sách kết quả từ đầu, nối lại. O(n²), O(1) bộ nhớ (LeetCode 147).
- **Khi nào dùng Insertion thay vì Merge/Quick?** n nhỏ, dữ liệu gần sắp xếp, cần online, hoặc không được đệ quy/cấp phát.
- **Shell Sort là gì?** Insertion Sort với gap giảm dần; các phần tử xa nhau được đưa về gần đúng chỗ sớm.
- **TimSort dùng Insertion ở đâu?** Kéo dài run ngắn (< minrun ≈ 32) bằng binary insertion sort trước khi merge.

## Checklist nhận diện pattern

- "Mảng gần như đã sắp xếp" / "chỉ vài phần tử sai chỗ" ⇒ Insertion Sort O(n + d).
- "Dữ liệu đến liên tục, luôn cần trạng thái sắp xếp" ⇒ Insertion (hoặc BST/heap nếu lớn).
- "n ≤ 20" trong ràng buộc đề ⇒ Insertion Sort đủ, đừng quá tay.

## Bài luyện tập liên quan

- 147 Insertion Sort List, 912 Sort an Array, 1051 Height Checker.
- 148 Sort List (Merge Sort, để so sánh), 75 Sort Colors.
