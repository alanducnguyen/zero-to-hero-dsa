## Kịch bản trình bày

1. **Công thức** (1 phút): vẽ ví dụ, nêu nước tại i = min(maxTrái, maxPhải) − h[i]. Đây là điều quan trọng nhất; nếu đúng, mọi cách sau chỉ là tối ưu.
2. **Brute force** (20s): O(n²), chỉ nói miệng.
3. **Prefix/suffix** (1.5 phút): hai mảng, ba lượt, O(n)/O(n). Code nếu người phỏng vấn muốn thấy một bản chạy được sớm.
4. **Two pointers** (2 phút): "Bỏ mảng phụ: di chuyển con trỏ ở bên thấp hơn, vì bên kia chắc chắn có tường cao hơn." Code 15 dòng.
5. **Nhắc stack** (30s): "Cách khác tính theo lớp ngang bằng monotonic stack, hữu ích khi dữ liệu online."

## Follow-up thường gặp

- **Vì sao di chuyển con trỏ thấp hơn là đủ?** Nếu h[L] < h[R] thì maxRight[L] ≥ h[R] > h[L] ≥ … và leftMax ≤ rightMax (bất biến), nên min(maxLeft, maxRight) tại L = leftMax.
- **Stack: tính lớp nước thế nào?** Khi pop đáy b với tường trái l và tường phải i: nước += (i − l − 1) × (min(h[l], h[i]) − h[b]).
- **2D?** Min-heap chứa biên, pop ô thấp nhất, lan vào trong; nước = max(0, mức hiện tại − cao ô).
- **Cột rất nhiều, bộ nhớ giới hạn, dữ liệu stream?** Stack vẫn O(n) worst case (dãy giảm dần). Không có cách O(1) cho online thuần.
- **Liên hệ Container With Most Water?** Cùng hai con trỏ nhưng hàm mục tiêu là diện tích giữa hai cột, không phải tổng.
