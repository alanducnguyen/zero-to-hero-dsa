## Kịch bản trình bày

1. **Quan sát** (1 phút): vẽ histogram, chỉ ra hình tối ưu có chiều cao bằng cột thấp nhất trong nó. Từ đó mỗi cột là một ứng viên chiều cao.
2. **Brute force** (30s): mọi cặp (i, j) với `minH` chạy, O(n²) – nói miệng, chỉ ra n = 10⁵ thì TLE.
3. **Đặt câu hỏi đúng** (1 phút): "với cột i làm chiều cao, hình kéo dài tới cột thấp hơn gần nhất hai phía" ⇒ next smaller element ⇒ monotonic stack.
4. **Code bản một lượt** (3 phút): stack tăng dần, pop khi `h[top] ≥ h[i]`, rộng = `i − stack.top − 1` (hoặc `i` nếu stack rỗng), cột ảo 0 ở cuối.
5. **Dry run** `[2,1,5,6,2,3]`: khi gặp 2 ở #4, pop 6 (6×1) rồi 5 (5×2 = 10) – đáp án.
6. **Nhắc phương án khác** (30s): chia để trị tại cột thấp nhất – đẹp nhưng O(n²) khi mảng sắp xếp.

## Follow-up thường gặp

- **Vì sao biên trái là phần tử dưới trong stack?** Mọi chỉ số nằm giữa hai phần tử liền kề trong stack đã bị pop vì cao hơn phần tử trên ⇒ hình cao h[top] phủ được chúng.
- **Vì sao O(n) dù có vòng while lồng?** Mỗi chỉ số được push một lần và pop tối đa một lần ⇒ tổng ≤ 2n thao tác (phân tích khấu hao).
- **Cột bằng nhau dùng > hay ≥?** Cả hai đều đúng cho bản một lượt; chỉ khác cột nào "đại diện" cho nhóm. Hãy chạy tay `[3,3,3]` để chứng minh.
- **Maximal Rectangle trong ma trận 0/1?** Tích luỹ chiều cao theo cột qua từng hàng, mỗi hàng gọi hàm này: O(rows × cols).
- **Bài cùng khuôn**: Trapping Rain Water (stack giảm dần), Sum of Subarray Minimums, Daily Temperatures, Online Stock Span.
- **Chia để trị có cứu được không?** Segment tree tìm min đoạn O(log n) ⇒ O(n log n) chắc chắn, nhưng stack vẫn tốt hơn.

## Lỗi thường gặp

- Quên cột ảo 0 ⇒ mảng tăng dần trả về 0 hoặc thiếu hình cuối.
- Tính rộng `i − top` thay vì `i − left − 1`.
- Push chiều cao thay vì chỉ số ⇒ mất thông tin chiều rộng.
