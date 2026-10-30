## Đề bài

Mảng `nums` gồm các số nguyên **phân biệt**, ban đầu tăng dần, rồi bị **xoay** tại một chỉ số `k` chưa biết: `[nums[k], …, nums[n−1], nums[0], …, nums[k−1]]`. Cho `target`, trả về chỉ số của `target` trong mảng, hoặc `−1` nếu không có. Yêu cầu **O(log n)**.

```
nums = [4, 5, 6, 7, 0, 1, 2], target = 0  →  4
nums = [4, 5, 6, 7, 0, 1, 2], target = 3  →  −1
nums = [1],                   target = 0  →  −1
```

Mảng xoay gồm **hai đoạn tăng dần** nối nhau; mọi phần tử của đoạn trái lớn hơn mọi phần tử của đoạn phải. Chỗ nối (giá trị nhỏ nhất) gọi là **pivot**.

## Ràng buộc

- `1 ≤ n ≤ 5000`, giá trị trong `[−10⁴, 10⁴]`, mọi giá trị phân biệt.
- Mảng có thể **không bị xoay** (k = 0) – trường hợp biên phải xử lý được.

> Trong trình Debug, nếu bạn nhập mảng không hợp lệ (trùng hoặc không sắp xếp), input được chuẩn hoá: khử trùng, sắp xếp, rồi xoay để giữ nguyên phần tử đầu tiên bạn nhập.

## Câu hỏi nên hỏi lại người phỏng vấn

- Phần tử có phân biệt không? (Có trùng ⇒ bài khác: LC 81, worst case O(n).)
- Có thể không xoay không? Mảng rỗng?
- Chỉ một truy vấn hay nhiều truy vấn trên cùng mảng? (Nhiều truy vấn ⇒ tìm pivot một lần rất đáng.)
