## Đề bài

Cho gốc `root` của một **cây nhị phân tìm kiếm** (BST) và số nguyên `k`. Trả về giá trị **nhỏ thứ k** (1-based) trong cây.

```
       5
      / \
     3   6
    / \
   2   4
  /
 1
k = 3  →  3        (thứ tự tăng dần: 1, 2, 3, 4, 5, 6)
k = 1  →  1
```

Trong trang này cây được dựng bằng cách **chèn lần lượt** các giá trị trong `values` vào BST rỗng (giá trị trùng bị bỏ qua). Nếu `k` vượt quá số node, các lời giải trả về `-1`.

## Ràng buộc

- Số node `n` trong `[1, 10⁴]`, `1 ≤ k ≤ n`, giá trị trong `[0, 10⁴]`.
- Cây **không** được đảm bảo cân bằng: chiều cao `h` có thể bằng `n` (chèn dãy tăng dần).

## Câu hỏi nên hỏi lại người phỏng vấn

- Cây có cân bằng không? (Quyết định độ sâu đệ quy có an toàn.)
- Chỉ hỏi một lần hay hỏi **nhiều lần** trong khi cây bị chèn/xoá liên tục? (Follow-up chính thức của LeetCode.)
- Có giá trị trùng không, nếu có thì đếm thế nào?
- k có luôn hợp lệ không, nếu không thì trả gì?
