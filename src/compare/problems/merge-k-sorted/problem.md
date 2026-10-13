## Đề bài

Cho `k` danh sách đã sắp xếp tăng dần (tổng cộng `N` phần tử). Trộn thành một danh sách sắp xếp.

```
lists = [[1,4,5], [1,3,4], [2,6]]  →  [1,1,2,3,4,4,5,6]
lists = []                         →  []
lists = [[]]                       →  []
```

## Ràng buộc

- `0 ≤ k ≤ 10⁴`, mỗi list ≤ 500 phần tử, `N ≤ 10⁴`.
- Đề gốc dùng linked list; ở đây dùng mảng để tập trung vào thuật toán. Với linked list, mọi cách đều giữ nguyên, chỉ thay "chỉ số" bằng "con trỏ node".

## Câu hỏi nên hỏi lại

- k lớn hay nhỏ so với N? (k = 2 thì không cần heap.)
- Danh sách có sẵn toàn bộ hay là luồng/iterator? (Luồng ⇒ heap.)
- Có được tạo node/mảng mới không, hay phải nối lại tại chỗ?
- Cần ổn định (giữ thứ tự list khi giá trị bằng nhau)?
