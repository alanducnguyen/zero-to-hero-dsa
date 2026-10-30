## Cách trình bày trong phỏng vấn

1. Viết công thức: `area(i, j) = min(h[i], h[j]) × (j − i)`. Nêu brute force O(n²) trong một câu.
2. Quan sát: bắt đầu từ container rộng nhất, mọi bước sau đều hẹp hơn ⇒ chỉ có thể thắng nhờ tường cao hơn.
3. Đưa ra quy tắc "dịch tường thấp hơn" **kèm chứng minh**: mọi cặp còn lại chứa tường thấp đều hẹp hơn và không cao hơn ⇒ không thể vượt diện tích vừa tính.
4. Code 10 dòng, chạy tay ví dụ `[1, 8, 6, 2, 5, 4, 8, 3, 7]` ⇒ 49.
5. Chốt: O(n) thời gian, O(1) bộ nhớ.

## Câu hỏi follow-up thường gặp

- **Khi hai tường bằng nhau, dịch bên nào?** Bên nào cũng đúng: mọi cặp mới có chiều cao ≤ `h` và hẹp hơn, nên không cặp nào chứa một trong hai tường đó có thể thắng.
- **Hình dung bằng ma trận?** Ma trận `n × n` các cặp `(i, j)`; mỗi bước xóa cả một hàng (hoặc cột) – đó là lý do chỉ cần `n − 1` bước.
- **Trả về chỉ số hai tường?** Lưu thêm `(left, right)` khi cập nhật `best`.
- **Khác gì Trapping Rain Water?** LC 42 tính tổng nước trên mọi cột, tường giữa có ý nghĩa; LC 11 bỏ qua tường giữa.
- **Có thể bỏ qua nhanh các tường không cao hơn tường vừa loại không?** Có – tối ưu hằng số: tiếp tục dịch khi `height[left] ≤ h` cũ, nhưng độ phức tạp vẫn O(n).

## Checklist nhận diện pattern

- Chọn **một cặp** `(i, j)` để tối đa/tối thiểu một hàm phụ thuộc vào `j − i` và giá trị hai đầu ⇒ thử hai con trỏ từ hai đầu.
- Có lập luận "phía này đã hết tiềm năng" ⇒ loại phía đó, dịch con trỏ.
- Nếu giá trị phụ thuộc vào **toàn bộ đoạn giữa** (min đoạn) ⇒ chuyển sang monotonic stack.

## Bài luyện tập liên quan

- LeetCode 11 – Container With Most Water.
- LeetCode 42 – Trapping Rain Water.
- LeetCode 167 – Two Sum II - Input Array Is Sorted.
- LeetCode 84 – Largest Rectangle in Histogram.
