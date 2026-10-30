## Đề bài

Cho mảng `height` độ dài n; tường thứ `i` là đoạn thẳng đứng từ `(i, 0)` tới `(i, height[i])`. Chọn **hai tường** cùng trục hoành tạo thành một bình chứa sao cho chứa được **nhiều nước nhất**. Trả về lượng nước lớn nhất. Không được nghiêng bình.

Lượng nước của cặp `(i, j)` với `i < j` là `min(height[i], height[j]) × (j − i)`: nước tràn qua tường thấp hơn, và bề rộng là khoảng cách giữa hai tường.

## Ví dụ

- `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]` ⇒ `49` (tường 1 và 8: `min(8, 7) × 7`).
- `height = [1, 1]` ⇒ `1`.
- `height = [4, 4, 4, 4]` ⇒ `12` (hai tường ngoài cùng).

## Ràng buộc

- `2 ≤ n ≤ 10⁵`
- `0 ≤ height[i] ≤ 10⁴`

## Gợi ý suy nghĩ

Diện tích là tích của **bề rộng** và **tường thấp hơn**. Khi thu hẹp bề rộng, điều kiện cần để diện tích tăng là gì? (Visualizer giới hạn n ≤ 16 để brute force không quá dài.)
