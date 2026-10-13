## Kịch bản trình bày

1. **HashMap** (30s): "Đếm tần suất O(n)/O(n). Đúng nhưng đề gợi ý O(1) bộ nhớ."
2. **Sort** (30s): "Sắp xếp rồi lấy giữa: dải dài hơn n/2 phải phủ vị trí n/2. O(n log n), O(1)."
3. **Boyer-Moore** (2 phút): hình ảnh "bỏ phiếu triệt tiêu": giữ ứng viên và bộ đếm; khác thì −1; về 0 thì đổi ứng viên. "Đa số có nhiều phiếu hơn tất cả phần tử khác cộng lại nên sống sót."
4. Code 6 dòng, chạy tay `[2,2,1,1,1,2,2]`.
5. **Chốt**: nói rõ giả định; nếu không chắc, thêm lượt xác minh.

## Follow-up thường gặp

- **Chứng minh Boyer-Moore?** Chia mảng tại các điểm count = 0; trong mỗi đoạn đóng, ứng viên chiếm đúng một nửa ⇒ không phần tử nào quá nửa. Nếu đa số M không phải ứng viên cuối thì M ≤ n/2 toàn mảng, mâu thuẫn.
- **Không đảm bảo tồn tại?** Lượt 2 đếm ứng viên; ≤ n/2 ⇒ trả "không có".
- **Phần tử > n/3?** Tối đa 2 ứng viên; 2 bộ đếm; xác minh cuối.
- **Luồng dữ liệu?** Boyer-Moore chỉ cần 2 biến – hoàn hảo cho streaming.
- **Dùng chia để trị?** Đa số của mảng là đa số của ít nhất một nửa; O(n log n), hiếm khi đáng.
- **Bit manipulation?** Với mỗi bit đếm số 1; bit thuộc đáp án nếu > n/2. O(32n), O(1), không cần giả định về chứng minh khó.
