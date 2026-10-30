## Đề bài

Cho mảng `nums` gồm `n` số nguyên **phân biệt** nằm trong đoạn `[0, n]`. Vì có `n + 1` giá trị khả dĩ mà chỉ có `n` ô, đúng **một** số bị thiếu. Trả về số đó.

```
nums = [3, 0, 1]                    →  2
nums = [0, 1]                       →  2   (thiếu chính n)
nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]  →  8
```

## Ràng buộc

- `1 ≤ n ≤ 10⁴`, mọi số phân biệt, nằm trong `[0, n]`.
- **Follow-up:** làm được trong O(n) thời gian và O(1) bộ nhớ phụ không?

## Câu hỏi nên hỏi lại người phỏng vấn

- Có chắc các số phân biệt và đúng một số thiếu? (Nếu thiếu nhiều số → bài 448, dùng đánh dấu tại chỗ.)
- Có được sửa mảng input không? (Quyết định sort tại chỗ hay phải copy.)
- Ngôn ngữ dùng int cố định? (Ảnh hưởng tới cách tính tổng – tràn số.)

> Ô nhập liệu tự sửa input không hợp lệ (bỏ trùng, thay số ngoài `[0, n]`) để luôn đúng một số thiếu.
