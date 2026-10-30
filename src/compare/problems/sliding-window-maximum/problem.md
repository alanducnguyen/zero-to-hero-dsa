## Đề bài

Cho mảng số nguyên `nums` và số nguyên `k`. Một cửa sổ kích thước `k` trượt từ trái sang phải, mỗi bước dịch đúng một ô. Trả về mảng gồm **giá trị lớn nhất** của từng cửa sổ (có `n − k + 1` cửa sổ).

```
nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3  →  [3, 3, 5, 5, 6, 7]

[1  3  -1] -3  5  3  6  7    → 3
 1 [3  -1  -3] 5  3  6  7    → 3
 1  3 [-1  -3  5] 3  6  7    → 5
 1  3  -1 [-3  5  3] 6  7    → 5
 1  3  -1  -3 [5  3  6] 7    → 6
 1  3  -1  -3  5 [3  6  7]   → 7
```

## Ràng buộc

- `1 ≤ n ≤ 10⁵`, `1 ≤ k ≤ n`, giá trị trong `[−10⁴, 10⁴]`.
- Với n = 10⁵ và k ≈ n/2, O(n·k) là ~2.5·10⁹ phép – bắt buộc phải nhanh hơn.

## Câu hỏi nên hỏi lại người phỏng vấn

- `k` có thể lớn hơn `n` hoặc bằng 0 không? (Ở đây giả sử `1 ≤ k ≤ n`.)
- Dữ liệu có phải dạng luồng (stream) không? Nếu có, chỉ được giữ O(k) bộ nhớ.
- Có cần thêm min cùng lúc, hay median của cửa sổ? (Median là bài khác hẳn – hai heap.)
