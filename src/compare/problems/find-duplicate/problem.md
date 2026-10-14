## Đề bài

Cho mảng `nums` gồm `n + 1` số nguyên, mỗi số trong `[1, n]`. Theo nguyên lý Dirichlet có ít nhất một số trùng; đề đảm bảo **chỉ có một** số trùng (có thể xuất hiện nhiều lần). Tìm số đó.

```
nums = [1, 3, 4, 2, 2]  →  2
nums = [3, 1, 3, 4, 2]  →  3
```

## Ràng buộc (đây là phần làm bài khó)

- **Không được sửa mảng** (chỉ đọc).
- **Chỉ dùng O(1) bộ nhớ phụ**.
- `1 ≤ n ≤ 10⁵`.

Hai ràng buộc này loại bỏ sort tại chỗ và HashSet – chúng chỉ là bước đệm. Đáp án mong đợi là nhị phân trên giá trị hoặc Floyd.

## Câu hỏi nên hỏi lại

- Có đúng chỉ một giá trị trùng? Xuất hiện bao nhiêu lần?
- Có được sửa mảng không? Giới hạn bộ nhớ?
- Giá trị có chắc trong [1, n]? (Floyd phụ thuộc điều này.)
