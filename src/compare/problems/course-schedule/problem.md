## Đề bài

Có `numCourses` môn học đánh số `0..numCourses − 1`. Mảng `prerequisites` gồm các cặp `[a, b]` nghĩa là **muốn học `a` thì phải học `b` trước**. Hỏi có thể học hết tất cả các môn không? Trả về `true`/`false`.

Trong trang này mỗi điều kiện được nhập dạng chuỗi `"b->a"` (học b trước a), tức đúng chiều mũi tên của cạnh trong đồ thị.

```
numCourses = 2, prerequisites = [[1,0]]         →  true   (học 0 rồi 1)
numCourses = 2, prerequisites = [[1,0],[0,1]]   →  false  (0 cần 1, 1 cần 0)
```

Trả về boolean (thay vì một thứ tự học) để mọi lời giải có cùng một đáp án – thứ tự topo hợp lệ có thể có nhiều.

## Ràng buộc

- `1 ≤ numCourses ≤ 2000`, `0 ≤ prerequisites.length ≤ 5000`.
- Mọi cặp `[a, b]` là khác nhau; có thể có `a = b` (tự vòng) trong biến thể.

## Câu hỏi nên hỏi lại người phỏng vấn

- Có cạnh trùng hay tự vòng (`[a, a]`) không?
- Chỉ cần true/false hay phải in ra một thứ tự học (Course Schedule II)?
- Đồ thị có thể không liên thông không? (Có – phải duyệt từ mọi đỉnh.)
- V, E lớn tới đâu? Nếu chuỗi phụ thuộc dài 10⁵, DFS đệ quy có nguy cơ tràn stack.

## Mô hình hoá

Môn = đỉnh, điều kiện = cạnh có hướng `b → a`. Học được hết ⇔ có thứ tự topo ⇔ đồ thị **không có chu trình** (là DAG). Vậy bài toán thực chất là *phát hiện chu trình trong đồ thị có hướng*.
