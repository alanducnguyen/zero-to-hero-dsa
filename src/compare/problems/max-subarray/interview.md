## Kịch bản trình bày

1. **Làm rõ**: toàn âm? cần chỉ số? vòng tròn?
2. **Brute force** (20s): O(n²) với cộng dồn; O(n³) nếu tính tổng lại – nói để cho thấy biết tối ưu nhỏ.
3. **Kadane** (2 phút): "Gọi cur là đoạn tốt nhất kết thúc tại i. Hoặc kéo dài đoạn trước, hoặc bắt đầu lại tại i – chọn lớn hơn." Code, chạy tay ví dụ chuẩn. Nhấn khởi tạo `nums[0]`.
4. **Nếu hỏi cách khác**: prefix sum (cùng O(n), góc nhìn khác) và chia để trị (O(n log n), tách đoạn vắt qua giữa).
5. **Chốt**: Kadane cho câu hỏi gốc; chia để trị khi cần truy vấn đoạn hoặc song song.

## Follow-up thường gặp

- **Trả về chỉ số đoạn?** Lưu `start` khi bắt đầu lại và `(bs, be)` khi cập nhật best.
- **Toàn số âm?** Kadane với khởi tạo `nums[0]` vẫn đúng; khởi tạo 0 sẽ sai.
- **Max Product Subarray?** Giữ cả max và min vì nhân số âm đảo dấu.
- **Vòng tròn (918)?** max(Kadane, tổng − minSubarray); cẩn thận mảng toàn âm.
- **Truy vấn [l, r] nhiều lần?** Segment Tree với 4 giá trị mỗi nút, O(log n) mỗi truy vấn.
- **Đoạn độ dài ≥ k hoặc ≤ k?** Prefix sum + min prefix trong cửa sổ (deque cho ≤ k).
- **2D: ma trận con tổng lớn nhất?** Cố định cặp hàng, nén cột, Kadane: O(r²·c).
