## Đề bài

Thiết kế stack hỗ trợ bốn thao tác, **mỗi thao tác O(1)**:

- `push(x)` – đẩy `x` lên đỉnh.
- `pop()` – bỏ phần tử ở đỉnh.
- `top()` – xem phần tử ở đỉnh.
- `getMin()` – trả **phần tử nhỏ nhất** hiện có trong stack.

Ở trang này input là danh sách thao tác (`"push x"`, `"pop"`, `"top"`, `"getMin"`); mỗi lời giải trả về mảng kết quả: `null` cho `push`, giá trị cho `pop`/`top`/`getMin`, và `null` nếu gọi trên stack rỗng (LeetCode bảo đảm không xảy ra, ta xử lý cho an toàn).

```
push -2, push 0, push -3, getMin, pop, top, getMin
→ [null, null, null, -3, -3, 0, -2]
```

Cái khó: sau `pop`, min có thể **đổi** về một giá trị cũ – ta phải "nhớ" min của mọi trạng thái trước đó mà không quét lại stack.

## Ràng buộc

- Giá trị trong `[−2³¹, 2³¹ − 1]`, tối đa `3·10⁴` lời gọi.
- `pop`, `top`, `getMin` luôn được gọi trên stack không rỗng.

## Câu hỏi nên hỏi lại người phỏng vấn

- Có giá trị trùng không? (Quyết định dùng `≤` hay `<` khi lưu min.)
- Bộ nhớ có bị giới hạn chặt không – có cần O(1) bộ nhớ phụ?
- Kiểu số là gì? (Cách lưu độ lệch có thể tràn `int`.)
