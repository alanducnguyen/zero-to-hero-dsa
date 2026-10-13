## Kịch bản trình bày

1. **Làm rõ** ràng buộc: sửa mảng được không? bộ nhớ? Chính hai câu này định hướng cả bài.
2. **Sort / HashSet** (30s): nêu và chỉ ra vi phạm ràng buộc nào.
3. **Nhị phân trên giá trị** (2 phút): "Đếm số phần tử ≤ mid. Nếu > mid, Dirichlet nói số trùng ở [1, mid]." O(n log n), O(1). Code được nếu người phỏng vấn muốn một đáp án hợp lệ sớm.
4. **Floyd** (3 phút): "Xem i → nums[i] là linked list. Hai chỉ số trỏ cùng giá trị ⇒ chu trình. Số trùng = điểm vào chu trình ⇒ dùng tortoise & hare." Code 10 dòng, nhắc giai đoạn 2 (đưa slow về 0).
5. **Chốt**: Floyd thoả mọi ràng buộc; nhị phân là phương án dự phòng.

## Follow-up thường gặp

- **Vì sao chắc chắn có chu trình?** n+1 node, mỗi node có đúng một cạnh ra tới [1, n], không node nào trỏ về 0 ⇒ đi từ 0 không bao giờ dừng ⇒ lặp.
- **Vì sao điểm vào chu trình là số trùng?** Node có ≥ 2 cạnh vào là node có giá trị xuất hiện ≥ 2 lần; điểm vào chu trình có cạnh vào từ ngoài chu trình và từ trong chu trình.
- **Giai đoạn 2 của Floyd?** Khoảng cách từ 0 tới điểm vào = khoảng cách từ điểm gặp tới điểm vào (mod độ dài chu trình).
- **Nhiều số trùng?** Floyd chỉ tìm một; HashSet hoặc đánh dấu âm nếu được sửa.
- **Được sửa mảng?** Duyệt, với mỗi x đặt nums[|x|] âm; gặp giá trị đã âm ⇒ đáp án. O(n)/O(1).
- **Dùng bit?** Với mỗi bit, so số phần tử có bit 1 với số lượng trong 1..n có bit 1; O(32n), O(1), không sửa – cách thứ 5 ít người biết.
