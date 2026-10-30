## Cách trình bày trong phỏng vấn

1. Làm rõ đề: chỉ đi phải/xuống, ô xuất phát hoặc đích có thể là vật cản, giới hạn kết quả (có cần modulo/BigInt?).
2. Nêu đệ quy theo bước cuối: `f(r,c) = f(r−1,c) + f(r,c−1)`, chỉ ra bài toán con trùng lặp ⇒ DP.
3. Định nghĩa `dp[r][c]`, cơ sở `dp[0][0] = 1`, vật cản = 0, thứ tự duyệt theo hàng.
4. Viết bảng 2D, chạy tay với lưới 3×3 có vật cản giữa ⇒ 2; nêu O(m·n) thời gian, bộ nhớ.
5. Chủ động tối ưu xuống mảng 1D O(n), và nhắc công thức `C(m+n−2, m−1)` khi không có vật cản.

## Câu hỏi follow-up thường gặp

- **Giảm bộ nhớ?** Mảng lăn 1D: `row[c] = vật cản ? 0 : row[c] + row[c−1]`; có thể dùng chính `grid` làm dp nếu được phép sửa input.
- **Không có vật cản, nhanh hơn O(m·n)?** `C(m+n−2, min(m,n)−1)` tính bằng nhân/chia xen kẽ trong O(min(m, n)).
- **In ra một đường đi / tất cả đường đi?** Truy vết ngược từ đích theo ô có dp > 0; liệt kê tất cả thì phải backtracking (số lượng có thể mũ).
- **Được đi 4 hướng?** Không còn là DAG ⇒ DP không áp dụng; đếm đường đơn cần backtracking (Unique Paths III).
- **Mỗi ô có chi phí, tìm đường rẻ nhất?** Minimum Path Sum: thay tổng bằng `min`.

## Checklist nhận diện pattern

- Lưới, di chuyển **đơn điệu** (chỉ phải/xuống) ⇒ trạng thái tạo DAG, DP theo thứ tự hàng/cột.
- "Đếm số cách" ⇒ quy tắc cộng trên các bước cuối rời nhau; "tối ưu" ⇒ min/max.
- Mỗi hàng chỉ phụ thuộc hàng trước ⇒ có thể nén về 1D.
- Không ràng buộc gì thêm ⇒ thử nhìn ra công thức tổ hợp.

## Bài luyện tập liên quan

- LeetCode 62 – Unique Paths.
- LeetCode 63 – Unique Paths II.
- LeetCode 64 – Minimum Path Sum.
- LeetCode 120 – Triangle.
- LeetCode 174 – Dungeon Game.
- LeetCode 980 – Unique Paths III.
